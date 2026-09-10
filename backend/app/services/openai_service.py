import os
import re
import json
import logging
from typing import Optional, List, Dict, Any
from openai import AsyncOpenAI
from app.core.config import get_settings

logger = logging.getLogger(__name__)

# Map common language codes and names
LANGUAGE_MAP = {
    "en": "English",
    "english": "English",
    "hi": "Hindi (हिंदी)",
    "hindi": "Hindi (हिंदी)",
    "ta": "Tamil (தமிழ்)",
    "tamil": "Tamil (தமிழ்)",
    "te": "Telugu (తెలుగు)",
    "telugu": "Telugu (తెలుగు)",
    "ml": "Malayalam (മലയാളം)",
    "malayalam": "Malayalam (മലയാളം)",
}

NON_AGRI_REFUSALS = {
    "English": "I am OptiCrop AI, dedicated exclusively to agricultural and farming assistance. 🌱 Please ask me questions regarding crops, soil health, plant diseases, fertilizers, weather advisory, irrigation, or farming practices.",
    "Hindi (हिंदी)": "मैं ऑप्टिक्रॉप एआई (OptiCrop AI) हूँ, जो केवल कृषि और किसानी सहायता के लिए समर्पित है। 🌱 कृपया मुझसे फसलों, मिट्टी के स्वास्थ्य, पौधों की बीमारियों, उर्वरकों, मौसम सलाह या खेती के तरीकों से संबंधित प्रश्न पूछें।",
    "Tamil (தமிழ்)": "நான் ஆப்டிக்ராப் AI (OptiCrop AI), விவசாயம் மற்றும் பயிர் மேலாண்மைக்கான பிரத்யேக உதவியாளர். 🌱 தயவுசெய்து பயிர்கள், மண் வளம், பூச்சி நோய்கள், உர பரிந்துரைகள் அல்லது வானிலை ஆலோசனைகள் பற்றிய கேள்விகளை கேளுங்கள்.",
    "Telugu (తెలుగు)": "నేను ఆప్టిక్రాప్ AI (OptiCrop AI), వ్యవసాయం మరియు పంటల మార్గదర్శకత్వానికి మాత్రమే అంకితం చేయబడిన సహాయకుడిని. 🌱 దయచేసి పంటలు, నేల ఆరోగ్యం, తెగుళ్లు, ఎరువులు లేదా వ్యవసాయ పద్ధతులపై ప్రశ్నలు అడగండి.",
    "Malayalam (മലയാളം)": "ഞാൻ ഒപ്റ്റിക്രോപ്പ് AI (OptiCrop AI), കൃഷിയുമായി ബന്ധപ്പെട്ട കാര്യങ്ങൾക്ക് മാത്രമായുള്ള കാർഷിക സഹായിയാണ്. 🌱 ദയവായി വിളകൾ, മണ്ണിന്റെ ഗുണം, സസ്യ രോഗങ്ങൾ, വളപ്രയോഗം, കാലാവസ്ഥ എന്നിവയെക്കുറിച്ചുള്ള ചോദ്യങ്ങൾ ചോദിക്കുക.",
}

# General greetings that should receive a friendly agricultural welcome
GREETING_WORDS = {"hello", "hi", "hey", "namaste", "vanakkam", "namaskaram", "pranam", "greetings", "good morning", "good afternoon", "good evening"}

class OpenAIService:
    @classmethod
    def _get_client_and_model(cls):
        """
        Resolves the LLM client and model with Groq priority.
        1. Groq Cloud API (fastest LPU inference)
        2. Hugging Face Router
        3. OpenAI direct API
        """
        settings = get_settings()

        # 1. Check Groq API Key
        groq_key = settings.GROQ_API_KEY or os.environ.get("GROQ_API_KEY") or ""
        if groq_key and not groq_key.startswith("gsk_your_") and len(groq_key) > 10:
            base_url = settings.GROQ_BASE_URL or "https://api.groq.com/openai/v1"
            model = settings.GROQ_MODEL or "qwen/qwen3.8-27b"
            client = AsyncOpenAI(
                api_key=groq_key,
                base_url=base_url,
                timeout=15.0
            )
            return client, model, "groq"

        # 2. Check Hugging Face Token
        hf_token = settings.HF_TOKEN or os.environ.get("HF_TOKEN") or ""
        if hf_token and not hf_token.startswith("hf_your_") and len(hf_token) > 5:
            base_url = settings.AI_BASE_URL or "https://router.huggingface.co/v1"
            model = settings.AI_MODEL or "Qwen/Qwen2.5-7B-Instruct:featherless-ai"
            client = AsyncOpenAI(
                api_key=hf_token,
                base_url=base_url,
                timeout=15.0
            )
            return client, model, "huggingface"

        # 3. Check OpenAI Direct Key
        openai_key = settings.OPENAI_API_KEY or os.environ.get("OPENAI_API_KEY") or ""
        if openai_key and not openai_key.startswith("sk-your-") and len(openai_key) > 10:
            model = settings.OPENAI_MODEL or "gpt-4o-mini"
            client = AsyncOpenAI(
                api_key=openai_key,
                timeout=15.0
            )
            return client, model, "openai"

        return None, None, None

    @classmethod
    def _is_non_agricultural(cls, message: str) -> bool:
        """
        Fast filter for questions that are clearly outside the agricultural domain.
        Returns True if the message is definitely non-agricultural.
        """
        msg = message.strip().lower()
        
        # Whitelist simple greetings
        if msg in GREETING_WORDS or any(msg.startswith(g) and len(msg.split()) <= 3 for g in GREETING_WORDS):
            return False

        non_agri_patterns = [
            r"\b(capital of|who is the president|who is the prime minister|king of|chief minister of|queen of)\b",
            r"\b(write a python|write code|javascript|html|css code|fix my bug|c\+\+|java code|sql query|react component)\b",
            r"\b(movie|hollywood|bollywood|actor|actress|celebrity|singer|song lyrics|box office|cinema)\b",
            r"\b(bitcoin|crypto|cryptocurrency|stock market|forex trading|ethereum|wall street|shares to buy)\b",
            r"\b(solve this math|algebra|calculus|pythagoras|integral|derivative|trigonometry)\b",
            r"\b(who won the match|cricket world cup|football score|fifa|ipl score|champions league|tennis match)\b",
            r"\b(write an essay about|write a poem about love|write a romance story|joke about dating)\b",
            r"\b(gaming|playstation|xbox|gta 6|pubg|fortnite|minecraft)\b",
            r"\b(car insurance|credit score|mortgage rate|personal loan)\b",
        ]
        for pattern in non_agri_patterns:
            if re.search(pattern, msg):
                return True
        return False

    @staticmethod
    async def chat(message: str, language: str = "en", history: Optional[List[Dict[str, str]]] = None) -> str:
        lang_key = language.strip().lower() if language else "en"
        lang_name = LANGUAGE_MAP.get(lang_key, "English")

        # 1. Strict domain pre-filter: Reject non-agricultural queries immediately
        if OpenAIService._is_non_agricultural(message):
            return NON_AGRI_REFUSALS.get(lang_name, NON_AGRI_REFUSALS["English"])

        client, model, provider = OpenAIService._get_client_and_model()

        # 2. Strict Domain & Language System Prompt for Groq / LLM
        system_prompt = f"""You are OptiCrop AI, an expert precision agricultural assistant and certified agronomist for farmers.

CRITICAL DOMAIN RESTRICTION:
- You ONLY answer questions related to agriculture, farming, crops, soil health, plant diseases & pathology, pest control, chemical & organic fertilizers, irrigation scheduling, livestock, harvesting, agricultural machinery, and weather advisory for farming.
- If the user's message is ANY topic outside agriculture or farming (e.g. general trivia, coding, politics, movies, sports, finance, romance, gaming, non-farming math), you MUST STRICTLY REFUSE and output ONLY this exact refusal in {lang_name}:
"{NON_AGRI_REFUSALS.get(lang_name, NON_AGRI_REFUSALS['English'])}"

LANGUAGE MANDATE:
- You MUST answer completely, accurately, and fluently in {lang_name}.
- Keep all advice highly practical, actionable, farmer-friendly, with specific dosages per acre/liter, timings, and safety measures."""

        messages = [{"role": "system", "content": system_prompt}]

        if history:
            for item in history[-6:]:  # last 3 conversation turns
                if isinstance(item, dict) and "role" in item and "content" in item:
                    messages.append({"role": item["role"], "content": item["content"]})

        messages.append({"role": "user", "content": message})

        # 3. Live LLM Call via Groq / LLM Provider
        if client and model:
            try:
                response = await client.chat.completions.create(
                    model=model,
                    messages=messages,
                    temperature=0.3,
                    max_tokens=700,
                )
                if response.choices and len(response.choices) > 0:
                    reply = response.choices[0].message.content
                    if reply and reply.strip():
                        return reply.strip()
            except Exception as e:
                logger.warning(f"Live Groq/AI completion failed: {e}. Utilizing expert agronomic fallback.")

        # 4. Expert Agronomic Multilingual Fallback
        lower_msg = message.lower()
        if "yellow" in lower_msg or "पीला" in lower_msg or "மஞ்சள்" in lower_msg:
            if "tamil" in lang_name.lower():
                return "இலைகள் மஞ்சள் நிறமாக மாறுவது (Chlorosis) பெரும்பாலும் நைட்ரஜன் அல்லது துத்தநாக குறைபாட்டால் ஏற்படுகிறது. கீழ்ப்பகுதி இலைகள் முதலில் மஞ்சளானால், ஏக்கருக்கு 25 கிலோ யூரியா அல்லது 19:19:19 தெளிக்கவும். வடிகால் வசதியை சரிபார்த்து வேர் அழுகலை தடுக்கவும்."
            elif "hindi" in lang_name.lower():
                return "पत्तियों का पीला पड़ना (क्लोरोसिस) आमतौर पर नाइट्रोजन या जिंक की कमी और जलभराव के कारण होता है। यदि निचली पत्तियां पहले पीली हो रही हैं, तो यूरिया या 19:19:19 का छिड़काव करें। खेत में उचित जल निकासी सुनिश्चित करें।"
            elif "telugu" in lang_name.lower():
                return "ఆకులు పసుపు రంగులోకి మారడం సాధారణంగా నత్రజని లేదా జింక్ లోపం వల్ల జరుగుతుంది. దిగువ ఆకులు ముందుగా పసుపు రంగులోకి మారితే, యూరియా లేదా 19:19:19 పిచికారీ చేయండి. సరైన నీటి పారుదల ఉండేలా చూసుకోండి."
            elif "malayalam" in lang_name.lower():
                return "ഇലകൾ മഞ്ഞനിറമാകുന്നത് പ്രധാനമായും നൈട്രജൻ അല്ലെങ്കിൽ സിങ്ക് അപര്യാപ്തത മൂലമാണ്. അടിഭാഗത്തെ ഇലകൾ ആദ്യം മഞ്ഞനിറമാവുകയാണെങ്കിൽ യൂറിയ അല്ലെങ്കിൽ 19:19:19 തളിക്കുക. നീർവാർച്ച ഉറപ്പാക്കുക."
            else:
                return "Yellowing of leaves (chlorosis) usually points to Nitrogen deficiency, iron/zinc deficiency, or waterlogged roots. If older lower leaves turn yellow first, apply Nitrogen top-dressing (Urea @ 25 kg/acre) or foliar 19:19:19 spray. Ensure field drainage to protect root respiration."

        elif "fertilizer" in lower_msg or "खाद" in lower_msg or "உரம்" in lower_msg or "ఎరువు" in lower_msg or "വളം" in lower_msg:
            if "tamil" in lang_name.lower():
                return "பயிர்களுக்கு உரத்தை 3 கட்டங்களாக இட வேண்டும்: விதைக்கும்போது 50% அடி உரம் (DAP + பொட்டாஷ்), 30 நாட்களுக்குப் பின் 25% யூரியா, பூக்கும் முன் 25% யூரியா. மழைக்கு முன் உரமிடுவதை தவிர்க்கவும்."
            elif "hindi" in lang_name.lower():
                return "उर्वरक को तीन भागों में विभाजित करें: बुवाई के समय 50% आधार खुराक (DAP + पोटाश), कल्ले फूटते समय 25% यूरिया और फूल आने से पहले 25% यूरिया। भारी बारिश से ठीक पहले यूरिया न डालें।"
            elif "telugu" in lang_name.lower():
                return "ఎరువులను 3 విడతలుగా వేయండి: విత్తే సమయంలో 50% ప్రాథమిక మోతాదు (DAP + పొటాష్), పిలకలు వచ్చే దశలో 25% యూరియా మరియు పూత పూసే ముందు 25% యూరియా. భారీ వర్షానికి ముందు నత్రజని వేయవద్దు."
            elif "malayalam" in lang_name.lower():
                return "വളപ്രയോഗം 3 ഘട്ടങ്ങളായി നൽകുക: വിതയ്ക്കുമ്പോൾ 50% അടിവളം (DAP + പൊട്ടാഷ്), വളർച്ചാ ഘട്ടത്തിൽ 25% യൂറിയ, പൂവിടുന്നതിന് മുൻപ് 25% യൂറിയ. കനത്ത മഴയ്ക്ക് തൊട്ടുമുമ്പ് വളം ഇടുന്നത് ഒഴിവാക്കുക."
            else:
                return "For optimal nutrient uptake, split fertilizer applications: apply 50% basal dose (DAP & MOP) at sowing, 25% Urea top-dressing at active tillering, and the final 25% before panicle/flowering. Avoid applying Nitrogen right before heavy rains."

        elif "spray" in lower_msg or "छिड़काव" in lower_msg or "தெளிப்பு" in lower_msg or "పిచికారీ" in lower_msg:
            if "tamil" in lang_name.lower():
                return "மருந்து தெளிப்பதற்கு உகந்த நேரம் காலை 7:00 மணி முதல் 10:00 மணி வரை ஆகும். காற்றின் வேகம் மணிக்கு 12 கி.மீ-க்கு குறைவாக இருக்க வேண்டும். மழை பெய்யும் வாய்ப்பு இருந்தால் தெளிக்க வேண்டாம்."
            elif "hindi" in lang_name.lower():
                return "छिड़काव के लिए सबसे अच्छा समय सुबह 7:00 से 10:00 बजे का है। हवा की गति 12 किमी/घंटा से कम होनी चाहिए और अगले 4 घंटों में बारिश की संभावना नहीं होनी चाहिए।"
            elif "telugu" in lang_name.lower():
                return "పిచికారీ చేయడానికి అనువైన సమయం ఉదయం 7:00 నుండి 10:00 వరకు. గాలి వేగం గంటకు 12 కి.మీ కంటే తక్కువగా ఉండాలి మరియు రాబోయే 4 గంటల్లో వర్ష సూచన ఉండకూడదు."
            elif "malayalam" in lang_name.lower():
                return "മരുന്ന് തളിക്കാൻ ഏറ്റവും അനുയോജ്യമായ സമയം രാവിലെ 7:00 മുതൽ 10:00 വരെയാണ്. കാറ്റിന്റെ വേഗത മണിക്കൂറിൽ 12 കി.മീയിൽ താഴെയായിരിക്കണം, മഴ സാധ്യത ഉണ്ടാകരുത്."
            else:
                return "Safe spraying conditions require wind speeds below 12 km/h, temperatures under 32°C, and no rain forecast for the next 4–6 hours. Early morning (7:00 AM – 10:00 AM) is the safest window."

        elif "crop" in lower_msg or "grow" in lower_msg or "फसल" in lower_msg or "பயிர்" in lower_msg or "పంట" in lower_msg or "വിള" in lower_msg:
            if "tamil" in lang_name.lower():
                return "உங்கள் மண்ணின் NPK மற்றும் pH அளவைப் பொறுத்து சிறந்த பயிரை தேர்வு செய்யலாம். காரீஃப் பருவத்தில் நெல், மக்காச்சோளம் நல்ல மகசூல் தரும். எங்கள் 'Crop Recommendation' கருவியில் உங்கள் மண் விவரங்களை உள்ளிட்டு துல்லியமான பரிந்துரை பெறலாம்."
            elif "hindi" in lang_name.lower():
                return "खरीफ मौसम में धान, मक्का और दालें उपयुक्त हैं। रबी में गेहूं, सरसों और चना सर्वोत्तम परिणाम देते हैं। अपनी मिट्टी के NPK और pH की सटीक जांच के लिए हमारे 'Crop Recommendation' टूल का उपयोग करें."
            elif "telugu" in lang_name.lower():
                return "మీ నేలలోని NPK మరియు pH స్థాయిల ఆధారంగా సరైన పంటను ఎంచుకోండి. ఖరీఫ్ సీజన్లో వరి, మొక్కజొన్న అనుకూలం; రబీలో గోధుమలు, పప్పుదినుసులు మంచి దిగుబడినిస్తాయి. మా 'Crop Recommendation' టూల్ ద్వారా ఖచ్చితమైన విశ్లేషణ పొందండి."
            elif "malayalam" in lang_name.lower():
                return "മണ്ണിലെ NPK അളവുകളും pH നിലയും അടിസ്ഥാനമാക്കി മികച്ച വിള തിരഞ്ഞെടുക്കാം. ഖാരിഫ് സീസണിൽ നെല്ല്, ചോളം എന്നിവയും, തുടർന്ന് പച്ചക്കറികളും മികച്ച വിളവ് നൽകുന്നു. ഞങ്ങളുടെ 'Crop Recommendation' ടൂൾ ഉപയോഗിച്ച് പരിശോധിക്കുക."
            else:
                return "Crop suitability depends on soil NPK levels, pH, and season. For Kharif, Paddy and Maize offer strong yields; for Rabi, Wheat, Mustard, and Pulses excel. Use our precision Crop Recommendation tool to calculate the exact match for your field!"

        # General greeting / agricultural response
        return f"Hello! I am OptiCrop AI. 🌾 Powered by Groq fast intelligence, I can help you with crop recommendation, leaf disease diagnosis, personalized fertilizer doses, pest management, and weather impact advisories in {lang_name}. What crop are you cultivating today?"

    @classmethod
    async def suggest_disease_solution(
        cls,
        disease: str,
        plant: str = "Rice / Paddy",
        severity: str = "Moderate",
        symptoms: Optional[List[str]] = None,
        language: str = "en"
    ) -> Dict[str, Any]:
        """
        AI Agronomist Engine: Generates tailored clinical solutions,
        organic remedies, and chemical controls for diagnosed leaf diseases via Groq.
        """
        client, model, provider = cls._get_client_and_model()
        lang_name = LANGUAGE_MAP.get(language.strip().lower(), "English")
        symptoms_str = ", ".join(symptoms) if symptoms else "Foliar lesion and discoloration symptoms"

        system_prompt = f"""You are OptiCrop AI Lead Agronomist and Certified Plant Pathology Expert.
Generate an expert, actionable disease treatment protocol in {lang_name}.
Output MUST be valid JSON matching this exact structure:
{{
  "ai_solution": "2-3 crisp sentences with immediate emergency field action plan and warnings.",
  "organic_remedies": [
    "Organic remedy 1 with preparation/dosage per liter",
    "Organic remedy 2 with application method",
    "Bio-control agent 3 with exact dosage per acre"
  ],
  "chemical_remedies": [
    "Chemical 1 (Brand/Active Ingredient %) @ exact dosage per liter and per acre",
    "Chemical 2 @ exact dosage per liter and per acre",
    "Bactericide / Fungicide combination for secondary spread"
  ]
}}"""

        user_prompt = f"""Generate clinical treatment for:
- Crop: {plant}
- Diagnosed Disease: {disease}
- Severity Level: {severity}
- Observed Symptoms: {symptoms_str}

Respond with valid JSON only."""

        if client and model:
            try:
                response = await client.chat.completions.create(
                    model=model,
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    temperature=0.2,
                    max_tokens=600,
                )
                if response.choices and len(response.choices) > 0:
                    raw_text = response.choices[0].message.content.strip()
                    # Strip markdown code fencing if present
                    if "```json" in raw_text:
                        raw_text = raw_text.split("```json")[1].split("```")[0].strip()
                    elif "```" in raw_text:
                        raw_text = raw_text.split("```")[1].split("```")[0].strip()

                    parsed = json.loads(raw_text)
                    if isinstance(parsed, dict) and "ai_solution" in parsed:
                        return {
                            "ai_solution": parsed.get("ai_solution", ""),
                            "organic_remedies": parsed.get("organic_remedies", []),
                            "chemical_remedies": parsed.get("chemical_remedies", [])
                        }
            except Exception as e:
                logger.warning(f"Live Groq disease recommendation JSON parsing failed: {e}. Checking text or fallback.")

        # Expert Agronomic Fallback Profiles
        d_lower = disease.lower()
        if "blast" in d_lower:
            return {
                "ai_solution": "🚨 **Immediate AI Action Plan**: Rice Blast spreads rapidly via airborne conidia under high humidity (>90%) and cloudy skies. Immediately halt all Nitrogen (Urea) top-dressing, as excess vegetative nitrogen accelerates blast spread. Spray Tricyclazole 75% WP @ 0.6 g/L or Azoxystrobin + Difenoconazole early morning when wind speed is under 10 km/h. Maintain 2–3 cm standing water in the plot to impede spore germination on leaf surfaces.",
                "organic_remedies": [
                    "Neem Oil 10,000 ppm @ 3 ml/L or NSKE 5% spray at the onset of initial spindle spots",
                    "Pseudomonas fluorescens 1% WP foliar spray @ 10 g/L (2 kg/acre) in 200 liters of water",
                    "Foliar spray of 10% cow urine + 5% vermiwash solution to enhance natural phytoalexin defense"
                ],
                "chemical_remedies": [
                    "Tricyclazole 75% WP (Beam) @ 0.6 g/L (120 g/acre in 200 L water) — highly systemic translaminar control",
                    "Isoprothiolane 40% EC @ 1.5 ml/L (300 ml/acre) — excellent curative and preventative blast action",
                    "Kasugamycin 3% SL @ 2 ml/L (400 ml/acre) — antibiotic-fungicide alternation to prevent resistance"
                ]
            }
        elif "bacterial" in d_lower or "blight" in d_lower:
            return {
                "ai_solution": "🚨 **Immediate AI Action Plan**: Bacterial Leaf Blight advances through water droplets and wounds along wavy leaf margins. Drain excess stagnant water from the affected field immediately to prevent bacterial motility between crop hills. Strictly stop urea application until new tillers emerge clean. Apply bactericide + copper foliar spray within 24 hours.",
                "organic_remedies": [
                    "Fresh cow dung slurry spray (20 kg cow dung in 200 L water, settled, filtered) to encourage antagonistic microflora",
                    "Foliar spray with Neem Seed Kernel Extract (NSKE 5%) to create a protective alkaloid barrier",
                    "Apply bleaching powder @ 2 kg/acre mixed into field irrigation water to suppress bacterial load"
                ],
                "chemical_remedies": [
                    "Copper Oxychloride 50% WP @ 2.5 g/L (500 g/acre) + Streptocycline 9:1 @ 6 g/acre (30-40 ppm)",
                    "Plantomycin (Streptomycin sulphate 9% + Tetracycline hydrochloride 1%) @ 1 g/L",
                    "Bismerthiazol 20% WP @ 2.5 g/L during active vegetative and tillering stages"
                ]
            }
        elif "brown" in d_lower or "spot" in d_lower:
            return {
                "ai_solution": "🚨 **Immediate AI Action Plan**: Brown Spot is an indicator of soil nutritional deficiency, especially Potassium, Zinc, or Silica. Apply Muriate of Potash (MOP) top-dressing @ 20–25 kg/acre along with foliar micronutrient spray. Treat existing fungal lesions with Mancozeb or Propiconazole to halt secondary conidial infection.",
                "organic_remedies": [
                    "Soil application of Trichoderma viride enriched farmyard manure (2.5 kg/acre)",
                    "Foliar spray of Seaweed Extract (Ascophyllum nodosum) @ 2 ml/L to alleviate metabolic stress",
                    "Apply Potassium Silicate foliar spray @ 2 g/L to strengthen epidermal leaf cell walls against fungal penetration"
                ],
                "chemical_remedies": [
                    "Mancozeb 75% WP @ 2.0 g/L (400 g/acre in 200 L water) — broad-spectrum contact protective barrier",
                    "Propiconazole 25% EC (Tilt) @ 1.0 ml/L (200 ml/acre) — systemic triazole curative action",
                    "Carbendazim 12% + Mancozeb 63% WP (Saaf) @ 1.5 g/L (300 g/acre)"
                ]
            }
        elif "tungro" in d_lower:
            return {
                "ai_solution": "🚨 **Immediate AI Action Plan**: Tungro is a dual-viral disease transmitted by the Green Leafhopper (Nephotettix virescens). Because viruses cannot be cured once inside the plant, emergency action focuses on eradicating the leafhopper vector and roguing out severely infected hills to stop spread across the field.",
                "organic_remedies": [
                    "Install yellow sticky traps (10 traps/acre) and light traps at 1 meter above canopy to catch hoppers",
                    "Neem Oil (10,000 ppm) @ 3 ml/L + soap solution as an oviposition deterrent and insect repellent",
                    "Spray Beauveria bassiana entomopathogenic fungus @ 5 g/L in high humidity conditions"
                ],
                "chemical_remedies": [
                    "Thiamethoxam 25% WG @ 0.2 g/L (40 g/acre in 200 L water) — quick systemic knockdown of leafhoppers",
                    "Imidacloprid 17.8% SL @ 0.3 ml/L (60 ml/acre) for extended systemic protection",
                    "Dinotefuran 20% SG @ 0.4 g/L (80 g/acre) for rapid feeding cessation of homopteran pests"
                ]
            }
        else:
            return {
                "ai_solution": f"🚨 **Immediate AI Action Plan**: For {disease} in {plant}, inspect leaf undersides for active fungal sporulation or insect vector feeding. Remove severely blighted leaves. Maintain balanced plant nutrition (avoid excessive nitrogen), improve aeration, and apply a targeted protective bio-control or systemic spray.",
                "organic_remedies": [
                    "Neem Seed Kernel Extract (NSKE 5%) or cold-pressed Neem Oil @ 3 ml/L",
                    "Trichoderma viride bio-fungicide @ 2.5 kg/acre in moist organic compost",
                    "Pseudomonas fluorescens @ 10 g/L foliar spray"
                ],
                "chemical_remedies": [
                    "Mancozeb 75% WP @ 2.0 g/L (400 g/acre) for broad protective foliar coverage",
                    "Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1.0 ml/L for comprehensive curative systemic control",
                    "Copper Hydroxide 53.8% DF @ 1.5 g/L for contact bacterial and fungal defense"
                ]
            }
