from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
import re
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)



model = joblib.load("phishing_detector.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")


def preprocess_text(text):
    text = text.lower() 
    text = re.sub(r'\W+', ' ', text) 
    return text

@app.post("/predict")
def predict_phishing(email: dict):
    if "text" not in email:
        raise HTTPException(status_code=400, detail="Invalid request: missing 'text' field")

    
    processed_email = preprocess_text(email["text"])
    vectorized_email = vectorizer.transform([processed_email])

    
    prediction = model.predict(vectorized_email)[0]

    return {"status": "phishing" if prediction == 1 else "not phishing"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)