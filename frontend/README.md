# Frontend — Bone Fracture Detection

React-based frontend application for the Bone Fracture Detection system. Users can sign up, log in, upload X‑ray images, and receive AI-powered fracture predictions in real time.

## Features
- User authentication (signup & login with JWT)
- Secure image upload
- Real-time fracture prediction with confidence score
- Responsive design
- Error handling and validation feedback

## Tech Stack
- React (18+)
- Axios (HTTP client)
- React Router (navigation)
- CSS / Tailwind CSS (styling)
- localStorage (token storage)

## Prerequisites
- Node.js (14+)
- npm
- Backend service running at http://127.0.0.1:8000
- AI service running at http://127.0.0.1:5000

## Project Structure
frontend/
├── src/
│   ├── components/
│   │   ├── Signup.jsx       # Signup form & registration
│   │   ├── Login.jsx        # Login form & authentication
│   │   ├── Upload.jsx       # Image upload & prediction
│   │   ├── Navbar.jsx       # Navigation bar
│   │   └── PrivateRoute.jsx # Protected routes
│   ├── utils/
│   │   └── api.js           # Axios instance with base URL & interceptors
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx              # Main app component & routing
│   ├── App.css
│   └── index.js
├── public/
│   └── index.html
├── package.json
├── .env
└── README.md

## Environment Variables
Create a `.env` file in the project root:
```
REACT_APP_BACKEND_URL=http://127.0.0.1:8000
REACT_APP_AI_API_URL=http://127.0.0.1:5000
```

## Quickstart
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env` with backend and AI API URLs.
3. Start development server:
   ```bash
   npm start
   ```
   App runs at http://localhost:3000

## Key Components

### Signup (src/components/Signup.jsx)
- Form fields: email, username, password
- Validation: email format, password min 4 chars
- POST to `backend/auth/signup`
- On success: redirect to login
- Error handling: display validation errors

### Login (src/components/Login.jsx)
- Form fields: username, password
- POST to `backend/auth/login`
- On success: store JWT token in localStorage, redirect to dashboard
- Error handling: display login errors

### Upload & Predict (src/components/Upload.jsx)
- File input for X-ray image
- POST to `backend/predict` with FormData
- Display prediction result: { prediction, confidence }
- Error handling: invalid file, network errors

### PrivateRoute (src/components/PrivateRoute.jsx)
- Protects routes that require authentication
- Redirects to login if no JWT token found

## API Integration

### Axios Setup (src/utils/api.js)
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

## Example Flows

### Signup Flow
1. User fills signup form (email, username, password)
2. Frontend validates input
3. POST to `http://127.0.0.1:8000/auth/signup`
4. Backend hashes password, saves user
5. Redirect to login page

### Login Flow
1. User enters username & password
2. POST to `http://127.0.0.1:8000/auth/login`
3. Backend returns JWT token
4. Frontend stores token in localStorage
5. Redirect to dashboard

### Predict Flow
1. User selects X-ray image from file input
2. POST FormData to `http://127.0.0.1:8000/predict`
3. Backend forwards image to AI service
4. AI returns `{ prediction, confidence }`
5. Frontend displays result to user

## Troubleshooting
- **"Cannot GET /"**: Ensure dev server is running (`npm start`).
- **API connection errors**: Verify backend is running at `REACT_APP_BACKEND_URL`.
- **Login fails**: Check backend auth service and JWT_SECRET.
- **Upload fails**: Ensure file is valid image and backend has `/predict` endpoint.
- **CORS errors**: Add CORS middleware to backend (express-cors).

## Improvements & Next Steps
- Add image preview before upload
- Add prediction history & analytics
- Implement password reset flow
- Add dark mode toggle
- Add loading spinners and animations
- Unit & integration tests (Jest, React Testing Library)
- PWA support for offline functionality
- Mobile app version (React Native)

## Deployment
- Build for production:
  ```bash
  npm run build
  ```
- Deploy to Vercel, Netlify, or GitHub Pages
- Update `.env` with production backend & AI API URLs
- Ensure CORS is configured on backend for production domain

## Author
Sourav Sharma — B.Tech, Computer Science Engineering
