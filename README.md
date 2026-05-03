# 🚀 Smart AI Task Manager

🔗 **Live Demo: Coming soon
🔗 **Backend API: Coming soon

---

## 🧠 Overview

Smart AI Task Manager is a modern, full-stack web application designed to help users manage tasks efficiently with the power of AI. It provides a clean SaaS-style interface, secure authentication, and intelligent task suggestions.

---

## 🌟 Features

* 🔐 Secure User Authentication (JWT-based login/signup)
* 🧠 AI-Powered Task Suggestions & Summaries
* 📊 Interactive Dashboard with Analytics
* ✅ Create, Update, Delete Tasks
* ⏰ Task Priorities & Deadlines
* 🔍 Search & Filter Tasks
* 🌙 Dark/Light Mode Toggle
* 📱 Fully Responsive Design

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* Tailwind CSS
* Framer Motion

### Backend

* Node.js
* Express.js
* JWT Authentication
* RESTful APIs

### Database

* MongoDB (Mongoose)

### AI Integration

* OpenAI API

---

## 🏗️ Architecture

* Follows MVC (Model-View-Controller) pattern
* Scalable and modular folder structure
* Separation of frontend and backend

---

## 📂 Project Structure

```
client/        # React frontend
server/        # Node.js backend
models/        # Database schemas
routes/        # API routes
controllers/   # Business logic
```

---

## 🔐 Authentication Flow

* User signup with encrypted passwords (bcrypt)
* Secure login using JWT tokens
* Protected routes with middleware
* Persistent login sessions

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sunil0987654321/Smart-AI-Task-Manager.git
cd Smart-AI-Task-Manager
```

### 2️⃣ Install Dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 3️⃣ Environment Variables

Create a `.env` file inside `/server`:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_api_key
```

### 4️⃣ Run the Application

```bash
# Run backend
cd server
npm run dev

# Run frontend
cd client
npm start
```

---

## 🚀 Deployment

* Frontend: Vercel / Netlify
* Backend: Render / Railway
* Database: MongoDB Atlas

---

## 📸 Screenshots

(Add your UI screenshots here — dashboard, login page, AI feature, etc.)

---

## 💡 Future Enhancements

* 🧑‍🤝‍🧑 Team collaboration features
* 📅 Calendar integration
* 📈 Advanced analytics
* 📱 Mobile app version

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request.

---

## 📜 License

This project is licensed under the MIT License.

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
