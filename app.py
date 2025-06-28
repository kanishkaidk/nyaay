from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello, Nyaay!"}

import os, re, json
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import whisper, joblib, pandas as pd, openai

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔁 Load Whisper, ML models & data
whisper_model = whisper.load_model("base")
bias = joblib.load("models/bias_pipeline.pkl")
legal = joblib.load("models/legal_pipeline.pkl")
urgency = joblib.load("models/urgency_pipeline.pkl")
lawyers = pd.read_csv("data/lawyers.csv")
ngos = pd.read_csv("data/ngos.csv")
openai.api_key = OPENAI_API_KEY

def classify_gpt(query):
    prompt = f"You are an AI trained in Indian legal categories...\n\nUser input:\n\"{query}\""
    resp = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[{"role":"user","content":prompt}],
        temperature=0.2
    )
    text = resp["choices"][0]["message"]["content"]
    cleaned = re.sub(r"^```(?:json)?|```$", "", text, flags=re.MULTILINE).strip()
    return json.loads(cleaned)

def generate_advice(query, li, bias_t, urg):
    prompt = f"You are a multilingual legal assistant...\nIssue: {query}\nLegal: {li}\nBias: {bias_t}\nUrgency: {urg}\n"
    resp = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[
            {"role":"system","content":"You are a multilingual legal advisor…"},
            {"role":"user","content": prompt}
        ],
        temperature=0.6
    )
    return resp["choices"][0]["message"]["content"]

@app.post("/chat/")
async def chat_endpoint(
    query: str = Form(None),
    file: UploadFile = File(None)
):
    # 👂 ASR if voice uploaded
    if file:
        audio_bytes = await file.read()
        tmp = "temp_audio." + file.filename.split(".")[-1]
        open(tmp, "wb").write(audio_bytes)
        result = whisper_model.transcribe(tmp)
        query = result["text"]
    
    clean = re.sub(r"[^a-zA-Z0-9\s]", "", query.lower())
    b = bias.predict([clean])[0]
    l = legal.predict([clean])[0]
    u = urgency.predict([clean])[0]
    
    # GPT classification & advice
    g = classify_gpt(query)
    advice = generate_advice(query, g["legal_issue"], g["bias"], g["urgency"])
    
    # Lawyer/NGO recommendations
    def rec(df):
        return df[df["legal_issues"].str.contains(l, na=False)].sort_values(["rating","success_rate" if "success_rate" in df.columns else "popularity"], ascending=False).head(5).to_dict(orient="records")
    
    return {
        "query": query,
        "bias": b, "legal_issue": l, "urgency": u,
        "gpt_class": g, "advice": advice,
        "lawyers": rec(lawyers),
        "ngos": rec(ngos),
    }

@app.get("/")
async def root():
    return {"status":"OK"}


