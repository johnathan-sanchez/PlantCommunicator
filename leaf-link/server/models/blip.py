from transformers import BlipProcessor, BlipForQuestionAnswering
from PIL import Image
import torch
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

huggingface_token = os.getenv("HUGGINGFACE_TOKEN")

if not huggingface_token:
    raise ValueError("Hugging Face token is missing. Please set the HUGGINGFACE_TOKEN environment variable.")

# Load model and processor (Fix: use 'use_auth_token' instead of 'token')
processor = BlipProcessor.from_pretrained("Salesforce/blip-vqa-base", token=huggingface_token)
model = BlipForQuestionAnswering.from_pretrained("Salesforce/blip-vqa-base", token=huggingface_token)

# Plant health questions
plant_health_questions = {
    "Overwatering": [
        "Are there any white fuzzy spots?",
        "Are there any yellow, brown, or black spots on the leaves?",
    ],
    "Underwatering": [
        "Are the leaves wilting?",
        "Are the leaves crispy?",
        "Are the leaves dropping off?",
    ],
    "Low_light": [
        "Are the leaves yellow?",
    ],
    "High_light": [
        "Are the leaves sunburned?",
        "Are there any brown edges on the leaves?",
    ],
    "Nutrient_deficiency": [
        "Are the leaves turning brown?",
        "Are there any spots or patches on the leaves?",
        "Are the leaves curling?",
    ],
    "pest_damage": [
        "Are there any small insects visible on the plant?",
        "Are there any white, web-like substances on the plant?",
        "Do the leaves have tiny dots or specks?"
    ],
    "root_bound": [
        "Are the roots growing out of the pot?",
        "Is the plant pot too small for the plant?",
    ],
}

def analyze_plant_health(image_path):
    image = Image.open(image_path).convert("RGB")
    detected_issues = []
    
    for questionCategory, questions in plant_health_questions.items():
        for question in questions:
            inputs = processor(image, question, return_tensors="pt")
            output = model.generate(**inputs)
            answer = processor.decode(output[0], skip_special_tokens=True)
            
            if answer.lower() == "yes":  # Fix: Ensure comparison is case insensitive
                detected_issues.append(f"{questionCategory}: {question}")
    
    return detected_issues


