import pandas as pd
import numpy as np
import os
from termcolor import colored
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib



nltk.download('stopwords')
nltk.download('punkt')


def preprocess_text(text):
    text = text.lower() 
    text = re.sub(r'\W+', ' ', text)

def load_dataset(file_path):
  """Load dataset based on file extension using Pandas."""
  file_extension = file_path.split('.')[-1].lower()

  if file_extension == 'csv':
    return pd.read_csv(file_path)
  elif file_extension in ['xls', 'xlsx']:
    return pd.read_excel(file_path)
  elif file_extension == 'json':
    return pd.read_json(file_path)
  elif file_extension == 'parquet':
    return pd.read_parquet(file_path)
  elif file_extension == 'html':
    return pd.read_html(file_path)[0]
  elif file_extension == 'feather':
    return pd.read_feather(file_path)
  else:
    raise ValueError(f"Unsupported file format: {file_extension}")



print()
email_dataset_path = input("|> Please enter the path to your email phising dataset: ").strip() or os.path.join( os.path.dirname(__file__), "data", "phishing_email.csv" )

print()
print("|> Dataset full path: ", colored(email_dataset_path, 'green' )  )
print("------------------------")
print()

dataframe = load_dataset(email_dataset_path)

print()
print("|> Dataset description: " )
print("------------------------")
print()
print(colored(dataframe, 'grey' ) )
print()

print()
print("|> Text conversion into numerical data.......... " ,end='')
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(dataframe["text_combined"]) 
y = dataframe["label"].values

joblib.dump(vectorizer, "tfidf_vectorizer.pkl")

print("[Done!]")

print()
print("|> Dataset splitting.......... " ,end='')

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print("[Done!]")

print()
print("|> Model trainning.......... " ,end='')

model = LogisticRegression()
model.fit(X_train, y_train)
print("[Done!]")


y_pred = model.predict(X_test)


print()
print("Accuracy:", colored( accuracy_score(y_test, y_pred), "green" ))


joblib.dump(model, 'phishing_detector.pkl')

print()
print("|> End!")
print()