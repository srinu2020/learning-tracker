# 📘 Learning Tracker – Peer Learning App

A minimal full stack web application that allows users to join learning groups and track their goals.

## 🛠️ Tech Stack

- **Frontend:** React (Vite), TailwindCSS, React Router, Context API
- **Backend:** Node.js, Express, MongoDB, JWT Auth
- **Deployment:** Render (Client + Server)

---

## 🚀 Live URLs

- **Frontend:** [https://learning-tracker-client.onrender.com](https://learning-tracker-client.onrender.com)  
- **Backend:** [https://learning-tracker-backend-t2b2.onrender.com](https://learning-tracker-backend-t2b2.onrender.com)

---

## 📦 Folder Structure

```
learning-tracker/
├── client/       → React frontend (Vite)
├── server/       → Node.js backend (Express + MongoDB)
└── README.md
```

---

## 🧑‍💻 Features

- ✅ Mock/JWT Login
- ✅ Join or View Learning Groups
- ✅ Add and Track Learning Goals (progress, title, deadline)
- ✅ Protected Routes using Auth Context
- ✅ Fully responsive design using TailwindCSS

---

## 🧪 Local Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/learning-tracker.git
cd learning-tracker
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=8080
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/learning-tracker
JWT_SECRET=your_jwt_secret_key
```

Start the backend:
```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

Make sure to update the API base URL in frontend API calls:
```js
// example
const API_BASE = 'http://localhost:8080' // or your deployed backend
```

---

## 📄 API Endpoints (Brief)

| Method | Endpoint                    | Description             |
|--------|-----------------------------|-------------------------|
| POST   | `/api/auth/login`           | Login user              |
| POST   | `/api/groups/join`          | Join a group            |
| GET    | `/api/groups/view`          | View groups             |
| POST   | `/api/goals/add`            | Add goal                |
| GET    | `/api/goals/view`           | View goals              |

---

## 🔐 Authentication

- Auth is handled using simple JWT token-based system.
- Tokens are stored in `localStorage` and passed in headers for protected routes.

---

## 📱 UI Screenshots

> _(You can insert screenshots here using markdown or upload them if required in PDF)_

---

## 🧑‍🏫 Author

**Srinivas**  
InUnity FullStack Facilitator Assessment – 2025  
GitHub: [@srinu2020](https://github.com/srinu2020)
