# Backend — Bone Fracture Detection

Node.js/Express backend service that handles user authentication (signup/login), accepts X‑ray image uploads, forwards them to the AI inference API, and returns predictions.

## Features
- User signup & login with JWT authentication
- Secure password hashing (bcrypt)
- Image upload forwarding to AI service
- Input validation (email, username, password)
- MongoDB integration

## Prerequisites
- Node.js (14+)
- npm
- MongoDB (local or cloud Atlas)

## Project Structure
backend/
├── Models/
│   ├── User.js          # User schema
│   └── db.js            # MongoDB connection
├── Controllers/
│   └── AuthController.js # Signup & login logic
├── Routes/
│   └── AuthRouter.js    # Auth endpoints
├── Middlewares/
│   └── AuthValidation.js # Input validation (Joi)
├── app.js               # Express server
├── package.json
├── .env
└── README.md

## Environment Variables
Create a `.env` file in the project root:
```
MONGO_CONN=mongodb+srv://<user>:<password>@cluster.mongodb.net/bonedb
JWT_SECRET=your-strong-secret-key-here
AI_API_URL=http://127.0.0.1:5000/predict
PORT=8000
```

## Quickstart
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env` with MongoDB connection and JWT secret.
3. Start the server:
   ```bash
   npm start
   ```
   Server runs at http://127.0.0.1:8000

## API Endpoints

### Auth Signup
**POST** `/auth/signup`
- Body (JSON):
  ```json
  {
    "email": "user@example.com",
    "username": "john_doe",
    "password": "securepass123"
  }
  ```
- Response (201):
  ```json
  {
    "message": "User Registered Successfully...",
    "success": true,
    "username": "john_doe",
    "email": "user@example.com"
  }
  ```
- Errors: 400 (validation), 409 (user exists), 500 (server error)

### Auth Login
**POST** `/auth/login`
- Body (JSON):
  ```json
  {
    "username": "john_doe",
    "password": "securepass123"
  }
  ```
- Response (200):
  ```json
  {
    "message": "Login Success...",
    "success": true,
    "jwtToken": "eyJhbGc...",
    "username": "john_doe",
    "email": "user@example.com"
  }
  ```
- Errors: 403 (user not found or wrong password), 500 (server error)

### Predict Fracture
**POST** `/predict`
- Form-data: `file` (X-ray image)
- Backend forwards to AI API and returns prediction
- Response:
  ```json
  {
    "prediction": "Fractured",
    "confidence": 0.91
  }
  ```

## Example Requests

Signup:
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"email":"a@b.com","username":"user","password":"pass1234"}' \
  http://127.0.0.1:8000/auth/signup
```

Login:
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"username":"user","password":"pass1234"}' \
  http://127.0.0.1:8000/auth/login
```

Predict (with JWT token if required):
```bash
curl -X POST -F "file=@xray.jpg" \
  -H "Authorization: Bearer <jwtToken>" \
  http://127.0.0.1:8000/predict
```

## Validation Rules
- **Email**: Must be valid email format (required)
- **Username**: 1-100 characters (required)
- **Password**: 4-100 characters (required)

Invalid requests return 400 with detailed error messages per field.

## Integration with AI Module
1. Ensure AI service is running at `http://127.0.0.1:5000` (or configured `AI_API_URL`).
2. Backend `/predict` endpoint forwards uploaded images to `AI_API_URL/predict`.
3. AI service returns `{ "prediction": "...", "confidence": ... }`.
4. Backend relays response to client.

## Troubleshooting
- **MongoDB connection error**: Verify `MONGO_CONN` and network access (whitelist IP in MongoDB Atlas).
- **Authentication failed**: Check `JWT_SECRET` is set and tokens are valid.
- **AI forwarding error**: Ensure AI service is running and `AI_API_URL` is correct.
- **Validation errors**: Review Joi schema in `AuthValidation.js` for field requirements.

## Improvements & Next Steps
- Add request rate limiting (express-rate-limit).
- Add logging and monitoring (morgan, winston).
- Add unit and integration tests (Jest, Supertest).
- Secure secrets with environment manager or vault.
- Dockerize the service.
- Add CORS configuration for frontend integration.
- Add refresh token mechanism for JWT.

## Author
Sourav Sharma — B.Tech, Computer Science Engineering
