from flask import Flask, request, jsonify
from flask_cors import CORS
from model import generate_caption
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/caption", methods=["POST"])
def caption():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]
    path = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(path)

    caption = generate_caption(path)
    return jsonify({"caption": caption})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
