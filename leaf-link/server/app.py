from flask import Flask
from routes.vqa import vqa_bp  # blueprint for VQA routes

app = Flask(__name__)
app.register_blueprint(vqa_bp)

if __name__ == "__main__":
    # For Cloud Run, make sure the host is 0.0.0.0 and the port is 8080
    app.run(debug=True, host="0.0.0.0", port=8080)