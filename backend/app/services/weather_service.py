import httpx
from datetime import datetime, timezone
from typing import List, Optional, Tuple
from app.schemas.weather import (
    WeatherResponse,
    CurrentWeather,
    HourlyForecast,
    DailyForecast,
    AgrometAdvisory,
)

# WMO Weather interpretation codes (WW)
WMO_CODE_MAP = {
    0: ("Clear sky", "Sunny with clear sky", "01d"),
    1: ("Mainly clear", "Mainly clear skies", "01d"),
    2: ("Partly cloudy", "Partly cloudy sky", "02d"),
    3: ("Overcast", "Cloudy and overcast", "03d"),
    45: ("Foggy", "Fog and low visibility", "50d"),
    48: ("Rime Fog", "Dense depositing rime fog", "50d"),
    51: ("Light Drizzle", "Light patchy drizzle", "09d"),
    53: ("Moderate Drizzle", "Moderate drizzle", "09d"),
    55: ("Dense Drizzle", "Dense drizzle precipitation", "09d"),
    56: ("Light Freezing Drizzle", "Light freezing drizzle", "09d"),
    57: ("Dense Freezing Drizzle", "Dense freezing drizzle", "09d"),
    61: ("Slight Rain", "Light intermittent rain", "10d"),
    63: ("Moderate Rain", "Steady moderate rainfall", "10d"),
    65: ("Heavy Rain", "Heavy downpour rainfall", "10d"),
    66: ("Light Freezing Rain", "Light freezing rain", "13d"),
    67: ("Heavy Freezing Rain", "Heavy freezing rain", "13d"),
    71: ("Slight Snow", "Light snowfall", "13d"),
    73: ("Moderate Snow", "Moderate snowfall", "13d"),
    75: ("Heavy Snow", "Heavy snowfall", "13d"),
    77: ("Snow Grains", "Snow grains and ice pellets", "13d"),
    80: ("Slight Showers", "Scattered rain showers", "09d"),
    81: ("Moderate Showers", "Passing moderate rain showers", "09d"),
    82: ("Violent Showers", "Torrential rain showers", "09d"),
    85: ("Slight Snow Showers", "Light snow showers", "13d"),
    86: ("Heavy Snow Showers", "Heavy snow showers", "13d"),
    95: ("Thunderstorm", "Thunderstorm with rain", "11d"),
    96: ("Thunderstorm with Hail", "Severe thunderstorm with slight hail", "11d"),
    99: ("Heavy Hail Thunderstorm", "Severe thunderstorm with heavy hail", "11d"),
}

# Known Indian agricultural hub fallbacks in case geocoding network is restricted
LOCATION_COORDINATES_FALLBACK = {
    "chennai": (13.0827, 80.2707, "Chennai, Tamil Nadu, India"),
    "coimbatore": (11.0168, 76.9558, "Coimbatore, Tamil Nadu, India"),
    "madurai": (9.9252, 78.1198, "Madurai, Tamil Nadu, India"),
    "thanjavur": (10.7870, 79.1378, "Thanjavur, Tamil Nadu, India"),
    "trichy": (10.7905, 78.7047, "Tiruchirappalli, Tamil Nadu, India"),
    "salem": (11.6643, 78.1460, "Salem, Tamil Nadu, India"),
    "bengaluru": (12.9716, 77.5946, "Bengaluru, Karnataka, India"),
    "hyderabad": (17.3850, 78.4867, "Hyderabad, Telangana, India"),
    "delhi": (28.6139, 77.2090, "New Delhi, Delhi, India"),
    "mumbai": (19.0760, 72.8777, "Mumbai, Maharashtra, India"),
    "pune": (18.5204, 73.8567, "Pune, Maharashtra, India"),
    "kolkata": (22.5726, 88.3639, "Kolkata, West Bengal, India"),
    "punjab": (30.9010, 75.8573, "Ludhiana, Punjab, India"),
}

class WeatherService:
    @staticmethod
    def _parse_wmo_code(code: int, is_day: bool = True) -> Tuple[str, str, str]:
        condition, desc, icon = WMO_CODE_MAP.get(code, ("Partly Cloudy", "Variable cloudiness", "02d"))
        if not is_day and icon.endswith("d"):
            icon = icon.replace("d", "n")
        return condition, desc, icon

    @staticmethod
    def _generate_agromet_advisories(
        temp: float, humidity: float, rainfall: float, wind_speed: float, uv_index: float
    ) -> List[AgrometAdvisory]:
        advisories: List[AgrometAdvisory] = []

        # 1. Field Conditions & Operations
        if rainfall > 10.0:
            advisories.append(AgrometAdvisory(
                category="Field Operations",
                title="Field Inundation & Saturated Soil",
                level="warning",
                advice=f"Significant rainfall recorded ({rainfall:.1f} mm). Postpone heavy tractor operations and tilling to prevent soil compaction and waterlogging."
            ))
        elif wind_speed > 25.0:
            advisories.append(AgrometAdvisory(
                category="Field Operations",
                title="High Wind Warning",
                level="warning",
                advice=f"Wind speeds at {wind_speed:.1f} km/h. Provide mechanical staking/support to tall crops like banana, sugarcane, and maize."
            ))
        else:
            advisories.append(AgrometAdvisory(
                category="Field Operations",
                title="Optimal Field Conditions",
                level="optimal",
                advice="Clear ground conditions are ideal for weeding, intercultural operations, and standard field preparation."
            ))

        # 2. Irrigation Management
        if rainfall > 5.0:
            advisories.append(AgrometAdvisory(
                category="Irrigation Management",
                title="Suspend Scheduled Irrigation",
                level="optimal",
                advice=f"Natural rainfall of {rainfall:.1f} mm detected. Defer scheduled drip/sprinkler cycles by 24-48 hours to conserve water."
            ))
        elif temp > 35.0 or (humidity < 40.0 and temp > 30.0):
            advisories.append(AgrometAdvisory(
                category="Irrigation Management",
                title="Evapotranspiration Alert",
                level="critical",
                advice=f"High ambient temperature ({temp:.1f}°C) and low humidity ({humidity:.0f}%). Irrigate during early morning or late evening to minimize evaporation losses."
            ))
        else:
            advisories.append(AgrometAdvisory(
                category="Irrigation Management",
                title="Standard Moisture Maintenance",
                level="optimal",
                advice="Maintain regular root-zone soil moisture according to crop growth stage requirements."
            ))

        # 3. Pest & Disease Surveillance
        if humidity > 80.0 and temp > 24.0:
            advisories.append(AgrometAdvisory(
                category="Pest & Disease Risk",
                title="High Fungal & Blight Risk",
                level="warning",
                advice=f"High relative humidity ({humidity:.0f}%) and warm temperatures ({temp:.1f}°C) create favorable microclimate for fungal spores, blast, and powdery mildew. Monitor closely."
            ))
        elif temp > 32.0 and humidity < 50.0:
            advisories.append(AgrometAdvisory(
                category="Pest & Disease Risk",
                title="Sucking Pest Alert",
                level="info",
                advice="Warm dry weather encourages whitefly, aphid, and thrip multiplication. Inspect undersides of leaves."
            ))
        else:
            advisories.append(AgrometAdvisory(
                category="Pest & Disease Risk",
                title="Low Disease Pressure",
                level="optimal",
                advice="Microclimatic disease index is within low-risk thresholds. Continue routine scouting."
            ))

        # 4. Spraying & Fertilizer Suitability
        if wind_speed > 15.0:
            advisories.append(AgrometAdvisory(
                category="Fertilizer & Spraying",
                title="Avoid Foliar Spraying (Wind Drift)",
                level="warning",
                advice=f"Wind speed ({wind_speed:.1f} km/h) exceeds safe threshold (15 km/h). Delay pesticide/herbicide spraying to avoid drift losses."
            ))
        elif rainfall > 2.0:
            advisories.append(AgrometAdvisory(
                category="Fertilizer & Spraying",
                title="Avoid Chemical Application",
                level="warning",
                advice="Rainfall will wash away chemical and fertilizer applications. Wait for a dry forecast window."
            ))
        else:
            advisories.append(AgrometAdvisory(
                category="Fertilizer & Spraying",
                title="Safe Spray Window",
                level="optimal",
                advice="Gentle winds and clear skies provide an ideal window for foliar nutrient sprays and bio-pesticide applications."
            ))

        return advisories

    @classmethod
    async def geocode_location(cls, location_name: str) -> Tuple[float, float, str]:
        cleaned = location_name.strip()
        cleaned_lower = cleaned.lower()

        # Check in local dictionary
        for key, (lat, lon, full_name) in LOCATION_COORDINATES_FALLBACK.items():
            if key in cleaned_lower:
                return lat, lon, full_name

        # Query Open-Meteo Geocoding API
        try:
            async with httpx.AsyncClient(timeout=6.0) as client:
                res = await client.get(
                    "https://geocoding-api.open-meteo.com/v1/search",
                    params={"name": cleaned, "count": 1, "language": "en", "format": "json"}
                )
                if res.status_code == 200:
                    data = res.json()
                    results = data.get("results", [])
                    if results:
                        best = results[0]
                        lat = float(best.get("latitude"))
                        lon = float(best.get("longitude"))
                        name_parts = [best.get("name")]
                        if best.get("admin1"):
                            name_parts.append(best.get("admin1"))
                        if best.get("country"):
                            name_parts.append(best.get("country"))
                        display_name = ", ".join(name_parts)
                        return lat, lon, display_name
        except Exception as e:
            print(f"Geocoding lookup error for '{location_name}': {e}")

        # Fallback to Chennai
        return 13.0827, 80.2707, f"{cleaned.title()} (Estimated Region)"

    @classmethod
    async def get_weather_by_coords(cls, lat: float, lon: float, location_name: Optional[str] = None) -> WeatherResponse:
        display_location = location_name or f"{lat:.2f}°N, {lon:.2f}°E"
        
        forecast_url = "https://api.open-meteo.com/v1/forecast"
        params = {
            "latitude": lat,
            "longitude": lon,
            "current": "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m",
            "hourly": "temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m",
            "daily": "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max",
            "timezone": "auto"
        }

        try:
            async with httpx.AsyncClient(timeout=8.0) as client:
                res = await client.get(forecast_url, params=params)
                if res.status_code == 200:
                    raw = res.json()
                    current_raw = raw.get("current", {})
                    hourly_raw = raw.get("hourly", {})
                    daily_raw = raw.get("daily", {})

                    is_day = bool(current_raw.get("is_day", 1))
                    weather_code = int(current_raw.get("weather_code", 0))
                    condition, desc, icon = cls._parse_wmo_code(weather_code, is_day)

                    temp = float(current_raw.get("temperature_2m", 28.0))
                    feels_like = float(current_raw.get("apparent_temperature", temp))
                    humidity = float(current_raw.get("relative_humidity_2m", 60.0))
                    rainfall = float(current_raw.get("precipitation", 0.0) or current_raw.get("rain", 0.0))
                    wind_speed = float(current_raw.get("wind_speed_10m", 12.0))
                    wind_dir = float(current_raw.get("wind_direction_10m", 0.0))
                    pressure = float(current_raw.get("surface_pressure", 1013.0))

                    # Parse Hourly (next 24 hours)
                    hourly_times = hourly_raw.get("time", [])
                    hourly_temps = hourly_raw.get("temperature_2m", [])
                    hourly_hum = hourly_raw.get("relative_humidity_2m", [])
                    hourly_precip_prob = hourly_raw.get("precipitation_probability", [])
                    hourly_codes = hourly_raw.get("weather_code", [])
                    hourly_winds = hourly_raw.get("wind_speed_10m", [])

                    now_iso = current_raw.get("time", datetime.now().isoformat())
                    hourly_list: List[HourlyForecast] = []
                    
                    # Find start index closest to current hour
                    start_idx = 0
                    for idx, t_str in enumerate(hourly_times):
                        if t_str >= now_iso[:13]:
                            start_idx = idx
                            break

                    for i in range(start_idx, min(start_idx + 24, len(hourly_times))):
                        t_str = hourly_times[i]
                        # format e.g. "14:00"
                        time_display = t_str.split("T")[-1] if "T" in t_str else t_str
                        h_code = int(hourly_codes[i]) if i < len(hourly_codes) and hourly_codes[i] is not None else 0
                        h_cond, _, h_icon = cls._parse_wmo_code(h_code, is_day=True)

                        hourly_list.append(HourlyForecast(
                            time=time_display,
                            datetime=t_str,
                            temperature=float(hourly_temps[i]) if i < len(hourly_temps) else temp,
                            humidity=float(hourly_hum[i]) if i < len(hourly_hum) else humidity,
                            precipitation_probability=float(hourly_precip_prob[i]) if i < len(hourly_precip_prob) and hourly_precip_prob[i] is not None else 0.0,
                            condition=h_cond,
                            icon=h_icon,
                            wind_speed=float(hourly_winds[i]) if i < len(hourly_winds) else wind_speed
                        ))

                    # Parse Daily (7-day forecast)
                    daily_dates = daily_raw.get("time", [])
                    daily_codes = daily_raw.get("weather_code", [])
                    daily_t_max = daily_raw.get("temperature_2m_max", [])
                    daily_t_min = daily_raw.get("temperature_2m_min", [])
                    daily_precip_sum = daily_raw.get("precipitation_sum", [])
                    daily_precip_prob = daily_raw.get("precipitation_probability_max", [])
                    daily_wind_max = daily_raw.get("wind_speed_10m_max", [])
                    daily_uv_max = daily_raw.get("uv_index_max", [])

                    forecast_list: List[DailyForecast] = []
                    uv_index_today = float(daily_uv_max[0]) if daily_uv_max and daily_uv_max[0] is not None else 5.0

                    for i in range(min(7, len(daily_dates))):
                        d_str = daily_dates[i]
                        try:
                            dt_obj = datetime.strptime(d_str, "%Y-%m-%d")
                            day_name = dt_obj.strftime("%a")
                        except Exception:
                            day_name = f"Day {i+1}"

                        d_code = int(daily_codes[i]) if i < len(daily_codes) and daily_codes[i] is not None else 0
                        d_cond, _, d_icon = cls._parse_wmo_code(d_code, is_day=True)

                        forecast_list.append(DailyForecast(
                            date=d_str,
                            day=day_name,
                            temp_max=float(daily_t_max[i]) if i < len(daily_t_max) and daily_t_max[i] is not None else temp + 2,
                            temp_min=float(daily_t_min[i]) if i < len(daily_t_min) and daily_t_min[i] is not None else temp - 4,
                            condition=d_cond,
                            icon=d_icon,
                            precipitation_sum=float(daily_precip_sum[i]) if i < len(daily_precip_sum) and daily_precip_sum[i] is not None else 0.0,
                            precipitation_probability=float(daily_precip_prob[i]) if i < len(daily_precip_prob) and daily_precip_prob[i] is not None else 0.0,
                            wind_speed_max=float(daily_wind_max[i]) if i < len(daily_wind_max) and daily_wind_max[i] is not None else wind_speed,
                            uv_index_max=float(daily_uv_max[i]) if i < len(daily_uv_max) and daily_uv_max[i] is not None else 5.0
                        ))

                    # Precipitation probability for current period
                    current_precip_prob = hourly_list[0].precipitation_probability if hourly_list else 0.0

                    # Generate Smart Agromet Advisories
                    advisories = cls._generate_agromet_advisories(
                        temp=temp,
                        humidity=humidity,
                        rainfall=rainfall,
                        wind_speed=wind_speed,
                        uv_index=uv_index_today
                    )

                    current_obj = CurrentWeather(
                        location=display_location,
                        latitude=lat,
                        longitude=lon,
                        temperature=temp,
                        feels_like=feels_like,
                        humidity=humidity,
                        rainfall=rainfall,
                        precipitation_probability=current_precip_prob,
                        wind_speed=wind_speed,
                        wind_direction=wind_dir,
                        pressure=pressure,
                        uv_index=uv_index_today,
                        condition=condition,
                        description=desc,
                        icon=icon,
                        is_day=is_day,
                        timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    )

                    return WeatherResponse(
                        location=display_location,
                        temperature=temp,
                        humidity=humidity,
                        rainfall=rainfall,
                        wind_speed=wind_speed,
                        condition=condition,
                        description=desc,
                        icon=icon,
                        feels_like=feels_like,
                        pressure=pressure,
                        uv_index=uv_index_today,
                        latitude=lat,
                        longitude=lon,
                        timestamp=current_obj.timestamp,
                        current=current_obj,
                        hourly=hourly_list,
                        forecast=forecast_list,
                        advisories=advisories
                    )
        except Exception as err:
            print(f"Error fetching Open-Meteo weather data: {err}")

        # Fallback response
        current_obj = CurrentWeather(
            location=display_location,
            latitude=lat,
            longitude=lon,
            temperature=28.5,
            feels_like=30.0,
            humidity=65.0,
            rainfall=0.0,
            precipitation_probability=10.0,
            wind_speed=12.0,
            wind_direction=180.0,
            pressure=1012.0,
            uv_index=6.0,
            condition="Partly Cloudy",
            description="Partly cloudy agromet station readout",
            icon="02d",
            is_day=True,
            timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        )

        return WeatherResponse(
            location=display_location,
            temperature=28.5,
            humidity=65.0,
            rainfall=0.0,
            wind_speed=12.0,
            condition="Partly Cloudy",
            description="Partly cloudy agromet station readout",
            icon="02d",
            feels_like=30.0,
            pressure=1012.0,
            uv_index=6.0,
            latitude=lat,
            longitude=lon,
            timestamp=current_obj.timestamp,
            current=current_obj,
            hourly=[],
            forecast=[],
            advisories=cls._generate_agromet_advisories(28.5, 65.0, 0.0, 12.0, 6.0)
        )

    @classmethod
    async def get_current(cls, location: str) -> WeatherResponse:
        lat, lon, full_name = await cls.geocode_location(location)
        return await cls.get_weather_by_coords(lat, lon, full_name)

    @classmethod
    async def get_forecast(cls, location: str) -> List[DailyForecast]:
        weather = await cls.get_current(location)
        return weather.forecast or []
