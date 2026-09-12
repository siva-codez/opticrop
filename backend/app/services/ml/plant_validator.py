import io
import logging
from typing import Tuple, Dict, Any
from PIL import Image
import numpy as np

logger = logging.getLogger(__name__)

class PlantValidator:
    """
    Validates whether an uploaded image contains a legitimate agricultural crop leaf or plant.
    Rejects non-plant images such as humans, faces, animals, vehicles, indoor rooms,
    synthetic graphics, or non-botanical objects.
    """

    @classmethod
    def validate_crop_image(cls, image_data: bytes | Image.Image) -> Tuple[bool, str, Dict[str, Any]]:
        """
        Analyzes the image color spectrum, botanical pigmentation (chlorophyll green,
        chlorotic yellowing, necrotic leaf lesions, rust pustules), and non-plant distractors
        (human skin tones, cyan/blue walls, synthetic background colors).

        Returns:
            (is_valid, error_message, metadata)
        """
        try:
            if isinstance(image_data, bytes):
                img = Image.open(io.BytesIO(image_data))
            elif isinstance(image_data, Image.Image):
                img = image_data
            else:
                return False, "Unsupported image format.", {}

            img_rgb = img.convert("RGB").resize((224, 224))
            arr = np.array(img_rgb, dtype=np.float32)
        except Exception as e:
            logger.error(f"Image parsing error during plant validation: {e}")
            return False, "Invalid or unreadable image file.", {}

        r = arr[:, :, 0]
        g = arr[:, :, 1]
        b = arr[:, :, 2]

        v = np.maximum(np.maximum(r, g), b)
        min_rgb = np.minimum(np.minimum(r, g), b)
        delta = v - min_rgb

        # Saturation [0, 1]
        s = np.zeros_like(v)
        nonzero_v = v > 0
        s[nonzero_v] = delta[nonzero_v] / v[nonzero_v]

        # Hue in degrees [0, 360)
        h = np.zeros_like(v)
        nz_delta = delta > 0

        # R is max
        r_max = (v == r) & nz_delta
        h[r_max] = (60.0 * ((g[r_max] - b[r_max]) / delta[r_max])) % 360.0

        # G is max
        g_max = (v == g) & nz_delta
        h[g_max] = (60.0 * ((b[g_max] - r[g_max]) / delta[g_max]) + 120.0) % 360.0

        # B is max
        b_max = (v == b) & nz_delta
        h[b_max] = (60.0 * ((r[b_max] - g[b_max]) / delta[b_max]) + 240.0) % 360.0

        v_norm = v / 255.0

        total_pixels = 224.0 * 224.0

        # ── 1. Botanical & Foliar Signatures ──
        # Green foliage & chlorophyll
        green_foliage = (h >= 50.0) & (h <= 165.0) & (s >= 0.14) & (v_norm >= 0.12) & (g >= b * 0.95)

        # Chlorotic yellowing / yellow rust / mosaic virus symptoms
        chlorotic_yellow = (h >= 34.0) & (h < 50.0) & (s >= 0.18) & (v_norm >= 0.20) & (r > b) & (g > b)

        # Diseased necrotic lesion / brown spot / early blight / common rust
        diseased_brown = (
            (h >= 10.0) & (h < 34.0) &
            (s >= 0.16) & (v_norm >= 0.10) & (v_norm <= 0.85) &
            (r > b + 10) & (g > b * 0.85)
        )

        # Deep necrotic / dark foliar decay
        dark_necrosis = (v_norm < 0.18) & (v_norm >= 0.04) & (s >= 0.12)

        plant_mask = green_foliage | chlorotic_yellow | diseased_brown | dark_necrosis
        plant_pixel_count = np.sum(plant_mask)
        plant_ratio = float(plant_pixel_count / total_pixels)

        green_ratio = float(np.sum(green_foliage) / total_pixels)
        yellow_ratio = float(np.sum(chlorotic_yellow) / total_pixels)
        brown_ratio = float(np.sum(diseased_brown) / total_pixels)

        # ── 2. Non-Plant & Artificial Distractor Signatures ──
        # Blue / Cyan walls, sky, or synthetic clothing (Hue 175-265)
        blue_cyan = (h >= 175.0) & (h <= 265.0) & (s >= 0.20) & (v_norm >= 0.18)
        blue_cyan_ratio = float(np.sum(blue_cyan) / total_pixels)

        # Magenta / Violet / Pink artificial items (Hue 280-350)
        magenta_pink = (h >= 280.0) & (h <= 350.0) & (s >= 0.22) & (v_norm >= 0.20)
        magenta_ratio = float(np.sum(magenta_pink) / total_pixels)

        # Human skin profile (Portraits, selfies, faces, hands)
        human_skin = (
            (h >= 0.0) & (h <= 28.0) &
            (s >= 0.18) & (s <= 0.68) &
            (v_norm >= 0.35) & (v_norm <= 0.95) &
            (r > g) & (g > b) &
            ((r - g) >= 12) & ((r - g) <= 80) &
            ((g - b) >= 4) & ((g - b) <= 60)
        )
        skin_ratio = float(np.sum(human_skin) / total_pixels)

        metadata = {
            "plant_ratio": round(plant_ratio, 4),
            "green_ratio": round(green_ratio, 4),
            "yellow_ratio": round(yellow_ratio, 4),
            "brown_ratio": round(brown_ratio, 4),
            "blue_cyan_ratio": round(blue_cyan_ratio, 4),
            "skin_ratio": round(skin_ratio, 4),
            "magenta_ratio": round(magenta_ratio, 4),
        }

        logger.info(f"Plant validation metrics: {metadata}")

        # ── 3. Rejection Guardrail Rules ──
        # Rule A: Extreme non-plant background (e.g., blue/cyan wall or room with human/object)
        if blue_cyan_ratio > 0.35 and plant_ratio < 0.25:
            return (
                False,
                "No crop plant or leaf detected. The uploaded photo appears to contain a background wall or non-plant object. Please upload a clear, focused photo of a crop leaf or plant.",
                metadata
            )

        # Rule B: Human portraits / selfies (high skin tone with insufficient foliage)
        if skin_ratio > 0.18 and green_ratio < 0.10:
            return (
                False,
                "No crop plant or leaf detected. The image appears to contain a person or non-agricultural subject. OptiCrop AI only analyzes crop leaves (e.g., Rice, Wheat, Corn, Potato, Tomato).",
                metadata
            )

        # Rule C: Synthetic pink/magenta/neon objects
        if magenta_ratio > 0.30 and plant_ratio < 0.20:
            return (
                False,
                "No crop plant or leaf detected. The uploaded image contains non-plant colors. Please upload a genuine photo of a crop leaf.",
                metadata
            )

        # Rule D: Overall insufficient foliar / plant tissue coverage (< 14% plant pixels)
        if plant_ratio < 0.14:
            return (
                False,
                "No plant or crop leaf detected in the image. Please upload a clear, well-lit photo of an agricultural crop leaf for disease diagnosis.",
                metadata
            )

        # Rule E: No identifiable chlorophyll or crop pathology spectrum (< 10% active green, yellow chlorosis, or brown lesion)
        if (green_ratio + yellow_ratio + brown_ratio) < 0.10:
            return (
                False,
                "Unable to identify plant or leaf tissue. Please ensure the crop leaf is clearly visible and in focus.",
                metadata
            )

        return True, "", metadata
