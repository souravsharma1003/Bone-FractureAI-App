# Bone Fracture Detection — AI Module

A lightweight AI module for detecting bone fractures from X‑ray images. It provides model training, evaluation, and a small Flask REST API for inference.

## Overview
- Problem: Binary image classification — Fractured vs Not Fractured  
- Input size: 224 × 224 × 3  
- Model: Custom CNN with sigmoid output (binary classification)  
- Loss: Binary crossentropy, Optimizer: Adam

## Project structure
ai/
├── app.py                # Flask API for inference  
├── model.py              # Training & evaluation script  
├── my_keras_model.h5     # Trained model file (saved during training)  
├── requirements.txt  
└── README.md

## Dataset layout
dataset/
├── train/
│   ├── Fractured/
│   └── Not Fractured/
├── test/
│   ├── Fractured/
│   └── Not Fractured/
└── val/
    ├── Fractured/
    └── Not Fractured/

## Quickstart
1. Create and activate a virtual env:
   ```bash
   python -m venv venv
   venv\Scripts\activate (Windows) or source venv/bin/activate (macOS/Linux)
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Train:
   ```bash
   python model.py
   ```
   - The best model will be saved as `my_keras_model.h5`.
4. Run API:
   ```bash
   python app.py
   ```
   - Server runs at http://127.0.0.1:5000

## API
- GET / -> Health check (returns welcome message)
- POST /predict -> Predict on an uploaded X-ray image
  - Form field: `file` (image)
  - Example:
    ```bash
    curl -X POST -F "file=@xray.jpg" http://127.0.0.1:5000/predict
    ```

Example response:
```json
{
  "prediction": "Fractured",
  "confidence": 0.91
}
```

## Prediction logic
- Images are resized to 224×224 and normalized to [0,1].
- Model outputs a probability `p` in [0,1].
- Decision rule:
  - `p ≥ 0.5` → Fractured
  - `p < 0.5` → Not Fractured

## Evaluation & Metrics
Commonly reported: Accuracy, AUC, Sensitivity, Confusion Matrix, Classification Report. Training includes early stopping and model checkpointing.

## Notes & Improvements
- Consider multi-class fracture classification, model size optimizations, Dockerization, and cloud deployment for production.

## Author
Sourav Sharma — B.Tech, Computer Science Engineering