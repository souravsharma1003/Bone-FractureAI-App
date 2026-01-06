import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState('');
  const [confidence, setConfidence] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:5000/predict';

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        setResult('Invalid file type. Please upload a JPG or PNG image.');
        setImagePreview(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setResult('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetectClick = async () => {
    if (!imagePreview) {
      setResult('Please upload an image.');
      return;
    }

    setLoading(true);
    setResult('');
    setConfidence('');

    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput && fileInput.files[0]) {
      formData.append('file', fileInput.files[0]);
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.prediction || 'Unknown result');
        setConfidence(`Confidence: ${(data.confidence*100).toFixed(2)}%`);
      } else {
        const errorData = await response.json();
        setResult(errorData.error || 'Error in prediction');
      }
    } catch (error) {
      setResult('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImagePreview(null);
    setResult('');
    setConfidence('');
  };

  return (
    <div>
      <div className="navbar">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>

      <div className="hero">
        <h1>Fracture Detection Portal</h1>
        <p>Upload your Bone X-Rays or CT Scans and get AI-powered Fracture Detection Results</p>
      </div>

      <div className="container main-content">
        <h2>Upload Your Scan</h2>
        <p>Supported formats: JPG, PNG</p>

        <div className="upload-section">
          <input
            className="inputs"
            type="file"
            onChange={handleFileChange}
            accept="image/jpeg, image/png"
            aria-label="Upload bone scan image"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="image-preview" />
          )}
          <button onClick={handleDetectClick} disabled={loading}>
            {loading ? <div className="loading-spinner"></div> : 'Detect Fracture'}
          </button>
          {imagePreview && (
            <button onClick={handleReset} className="reset-button">
              Reset
            </button>
          )}
        </div>

        {result && (
          <div
            className={`result-section ${
              result === 'Fractured' ? 'error' : 'success'
            }`}
          >
            <div className="result-title">{result}</div>
            {confidence && <div className='confidence-text'>{confidence}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
