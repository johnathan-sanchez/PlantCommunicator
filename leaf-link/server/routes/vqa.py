from flask import Blueprint, request, jsonify
from models.blip import analyze_plant_health

vqa_bp = Blueprint("vqa", __name__)

@vqa_bp.route("/answer", methods=["POST"])
def answer():
    print("Received /answer request")
    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400
    image_file = request.files["image"]
    try:
        # Analyze the plant health using the function from blip.py
        answer = analyze_plant_health(image_file)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(answer=answer)
