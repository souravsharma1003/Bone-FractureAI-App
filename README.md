# Bone Fracture Detection System

A full-stack AI-powered application for detecting bone fractures from X-ray images. The system combines a deep learning model, a Node.js/Express backend, and a React frontend to provide real-time predictions with user authentication.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (React)                     │
│  - User Authentication (Signup/Login)                   │
│  - Image Upload Interface                               │
│  - Real-time Prediction Display                         │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/HTTPS
┌────────────────────▼────────────────────────────────────┐
│              Backend (Node.js/Express)                   │
│  - User Management & JWT Authentication                 │
│  - MongoDB Integration                                  │
│  - Image Forwarding to AI Service                       │
│  - Prediction API Gateway                               │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP
┌────────────────────▼────────────────────────────────────┐
│          AI Module (Python/Flask/Keras)                  │
│  - Binary Classification Model (Fractured/Not Fractured)│
│  - Image Preprocessing                                  │
│  - Real-time Inference                                  │
└─────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
mini-project/
├── aiproject/              # AI inference service (Python/Flask)
│   ├── app.py              # Flask API server
│   ├── model.py            # Model training & evaluation
│   ├── my_keras_model.keras# Trained Keras model
│   ├── package.json        # Deployment config
│   ├── vercel.json         # Vercel deployment
│   ├── README.md           # AI module documentation
│   └── dataset/            # Training/validation/test data
│       ├── train/
│       ├── val/
│       └── test/
│
├── backend/                # Node.js/Express API server
│   ├── index.js            # Main server file
│   ├── Controllers/        # Business logic
│   ├── Models/             # MongoDB schemas
│   ├── Routes/             # API endpoints
│   ├── Middlewares/        # Validation & auth
│   ├── package.json
│   ├── vercel.json         # Vercel deployment
│   ├── README.md           # Backend documentation
│   └── .env                # Environment variables
│
├── frontend/               # React Vite application
│   ├── src/
│   │   ├── Components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── package.json
│   ├── vercel.json         # Vercel deployment
│   ├── index.html
│   ├── README.md           # Frontend documentation
│   └── .env                # Environment variables
│
└── README.md               # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 18+** - UI framework
- **Vite** - Build tool & dev server
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **CSS/SCSS** - Styling

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Joi** - Data validation

### AI Module
- **Python 3.8+** - Programming language
- **Flask** - Web framework
- **TensorFlow/Keras** - Deep learning
- **NumPy/OpenCV** - Image processing
- **Scikit-learn** - Metrics & utilities

## 📋 Prerequisites

### System Requirements
- Node.js (14+)
- Python (3.8+)
- npm or yarn
- MongoDB (local or MongoDB Atlas cloud)
- Git (optional)

### Environment Setup
- Windows: Use Command Prompt or PowerShell
- macOS/Linux: Use Terminal

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd mini-project
```

### 2. Setup AI Module (Python/Flask)

```bash
cd aiproject

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Train the model (optional - pre-trained model included)
python model.py

# Start AI server
python app.py
```
AI service runs at: `http://127.0.0.1:5000`

### 3. Setup Backend (Node.js/Express)

```bash
cd ../backend

# Install dependencies
npm install

# Create .env file with required variables
cat > .env << EOF
MONGO_CONN=mongodb+srv://<user>:<password>@cluster.mongodb.net/bonedb
JWT_SECRET=your-strong-secret-key-here
AI_API_URL=http://127.0.0.1:5000/predict
PORT=8000
EOF

# Start backend server
npm start
# or for development with auto-reload:
npm run dev
```
Backend service runs at: `http://127.0.0.1:8000`

### 4. Setup Frontend (React/Vite)

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_BACKEND_URL=http://127.0.0.1:8000
VITE_AI_API_URL=http://127.0.0.1:5000
EOF

# Start development server
npm run dev
```
Frontend application runs at: `http://localhost:5173`

## 📡 API Endpoints

### AI Service (Flask)
- **GET** `/` - Health check
- **POST** `/predict` - Predict fracture on uploaded image

### Backend Service (Express)

#### Authentication
- **POST** `/auth/signup` - User registration
- **POST** `/auth/login` - User login

#### Prediction
- **POST** `/predict` - Forward image to AI service and return prediction

### Frontend Routes
- `/` - Home page
- `/signup` - Registration page
- `/login` - Login page
- `/dashboard` - User dashboard (protected)

## 🔄 Data Flow

### Prediction Flow

1. **User uploads image** on Frontend
2. **Frontend sends FormData** to Backend `/predict` endpoint
3. **Backend receives file** and forwards to AI service `/predict`
4. **AI service preprocesses** image (resize to 224×224, normalize)
5. **Model inference** produces probability [0,1]
6. **Decision logic**: p ≥ 0.5 → Fractured, p < 0.5 → Not Fractured
7. **Backend returns** prediction to Frontend
8. **Frontend displays** result to user

### Authentication Flow

1. **User enters credentials** in signup/login form
2. **Frontend validates** input
3. **Backend receives** request, validates with Joi
4. **Password handling**: Hashed with bcrypt on signup, compared on login
5. **JWT token generated** on successful login
6. **Token stored** in localStorage on client
7. **Token sent** in Authorization header for protected requests

## 🔐 Environment Variables

### Backend (.env)
```env
MONGO_CONN=mongodb+srv://username:password@cluster.mongodb.net/bonedb
JWT_SECRET=your-super-secret-jwt-key
AI_API_URL=http://127.0.0.1:5000/predict
PORT=8000
```

### Frontend (.env)
```env
VITE_BACKEND_URL=http://127.0.0.1:8000
VITE_AI_API_URL=http://127.0.0.1:5000
```

### AI Module
No .env required (uses hardcoded paths)

## 🧪 Testing the Application

### Test User Registration
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"test1234"}' \
  http://127.0.0.1:8000/auth/signup
```

### Test User Login
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test1234"}' \
  http://127.0.0.1:8000/auth/login
```

### Test Prediction
```bash
curl -X POST -F "file=@path/to/xray.jpg" \
  http://127.0.0.1:8000/predict
```

## 📱 Usage Scenarios

### Scenario 1: New User Registration
1. Navigate to Frontend (http://localhost:5173)
2. Click "Signup"
3. Fill in email, username, password
4. Click "Register"
5. Redirected to login page

### Scenario 2: User Login & Prediction
1. Enter credentials on login page
2. Click "Login"
3. Redirected to dashboard
4. Upload X-ray image
5. View prediction result with confidence score

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **MongoDB connection error** | Verify MONGO_CONN and IP whitelist in MongoDB Atlas |
| **AI service not responding** | Ensure `python app.py` is running in aiproject/ |
| **CORS errors on Frontend** | Add CORS middleware to backend Express app |
| **JWT token invalid** | Check JWT_SECRET is same across sessions |
| **Image upload fails** | Verify file is valid image format (jpg, png) |
| **Port already in use** | Change PORT in .env or kill process using port |

## 📚 Component Documentation

For detailed information about each component, see:

- **AI Module**: [aiproject/README.md](aiproject/README.md)
- **Backend**: [backend/README.md](backend/README.md)
- **Frontend**: [frontend/README.md](frontend/README.md)

## 🚀 Deployment

### Deploy on Vercel (Recommended)

Each module includes a `vercel.json` configuration file.

#### Frontend Deployment
```bash
cd frontend
vercel deploy
```

#### Backend Deployment
```bash
cd backend
vercel deploy
```

#### AI Module Deployment
```bash
cd aiproject
vercel deploy
```

### Deploy on Heroku

```bash
# Backend
cd backend
heroku create your-app-name
heroku config:set MONGO_CONN=<your-mongodb-url>
heroku config:set JWT_SECRET=<your-secret>
git push heroku main

# Frontend
cd ../frontend
vercel deploy  # or netlify
```

### Deploy on Docker

Create `Dockerfile` for each service and use `docker-compose` to orchestrate.

## 🎯 Key Features

✅ **Binary Image Classification** - Fractured vs Not Fractured  
✅ **Real-time Inference** - <100ms prediction time  
✅ **User Authentication** - Secure signup/login with JWT  
✅ **Password Security** - Bcrypt hashing  
✅ **Responsive UI** - Mobile-friendly design  
✅ **Input Validation** - Server-side validation with Joi  
✅ **Error Handling** - Comprehensive error messages  
✅ **Scalable Architecture** - Microservices approach  

## 🔮 Future Improvements

- [ ] Multi-class fracture classification (location-based)
- [ ] Model optimization for edge deployment
- [ ] Image preprocessing pipeline improvements
- [ ] Real-time confidence tracking & analytics
- [ ] User prediction history & dashboard
- [ ] Batch prediction support
- [ ] API rate limiting & request logging
- [ ] Unit & integration tests (Jest, Supertest, Pytest)
- [ ] Docker containerization
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Load balancing & caching
- [ ] Mobile app (React Native)
- [ ] PWA support
- [ ] Dark mode UI

## 📞 Support & Contact

For issues, questions, or contributions:
1. Check individual module READMEs
2. Review troubleshooting section
3. Check Git issues (if using GitHub)
4. Contact: sourav.sharma@example.com

## 📄 License

This project is part of a B.Tech Computer Science Engineering capstone project.

## 👨‍💻 Author

**Sourav Sharma**  
B.Tech, Computer Science Engineering  
Bone Fracture Detection AI System

---

## 🎓 Learning Resources

- **Keras Documentation**: https://keras.io
- **Express.js Guide**: https://expressjs.com
- **React Documentation**: https://react.dev
- **MongoDB University**: https://university.mongodb.com
- **JWT Introduction**: https://jwt.io/introduction

---

