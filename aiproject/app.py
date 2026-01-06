from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import os

app = Flask(__name__)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # Optional: Max 10MB upload

model = tf.keras.models.load_model("my_keras_model.keras")

def preprocess_image(image_path):
    image = Image.open(image_path).convert("RGB")
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    return np.expand_dims(image, axis=0)

@app.route('/')
def home():
    return "Welcome to the AI-powered Bone Fracture Detection API!"

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    file_path = "./temp.jpg"
    file.save(file_path)

    try:
        image = preprocess_image(file_path)
        prediction = model.predict(image)
        score = float(prediction[0][0])
        result = "Not Fractured" if score >= 0.5 else "Fractured"
        confidence = score if result == "Not Fractured" else 1.0 - score

        return jsonify({"prediction": result, "confidence": confidence})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

if __name__ == '__main__':
    app.run(debug=True)
