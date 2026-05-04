<<<<<<< HEAD
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
=======
# DekNek Smart AI Task Manager 🚀
> Elevate your productivity with AI-driven task intelligence and a seamless SaaS-grade experience.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://your-demo-link.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

DekNek is a high-performance, full-stack task management application engineered for modern workflows. It leverages the power of **Google Gemini AI** to provide smart task recommendations, coupled with an advanced frontend architecture that ensures lightning-fast interactions and extreme reliability.
>>>>>>> develop

---

## 📸 Screenshots

<<<<<<< HEAD
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
=======
| Dashboard | AI Suggestions | Task Intelligence |
| :---: | :---: | :---: |
| ![Dashboard Placeholder](https://via.placeholder.com/800x450?text=Premium+Dashboard+UI) | ![AI Suggestions Placeholder](https://via.placeholder.com/800x450?text=AI+Generated+Tasks) | ![Task Detail Placeholder](https://via.placeholder.com/800x450?text=Deadline+Intelligence) |

---

## ✨ Features (SaaS-Grade)

- **🤖 Google Gemini AI Integration**: One-click intelligent task generation based on your current workload and planning context.
- **⚡ Optimistic UI Updates**: Status toggles and deletions happen in milliseconds—the UI updates instantly while the server syncs in the background.
- **⚠️ Deadline Intelligence**: Automatic real-time monitoring. Overdue tasks pulse red, while "Due Soon" tasks highlight in orange to ensure nothing slips through the cracks.
- **🔍 Advanced Real-time Search**: Debounced search input (300ms) with multi-facet filtering (Priority, Status, Date).
- **📂 Persistent State Management**: Your view preferences, search queries, and filters are preserved across sessions via `localStorage`.
- **🚀 Infinite Scroll Pagination**: High-performance list rendering using `Intersection Observer` for a smooth, lag-free scrolling experience.
- **🔔 Resilient Notifications**: Global toast system for successes and an intrusive, auto-dismissing Modal for critical Network Errors.

---

## 🛠️ Advanced Engineering Highlights

- **Normalized Redux Architecture**: State managed via `byId` and `allIds` patterns for $O(1)$ lookup performance and simplified data updates.
- **Computation Optimization**: Heavy usage of `useMemo` for derived states and `React.memo` for component stabilization, preventing unnecessary re-renders.
- **Global Error Interceptors**: Axios interceptors handle authentication headers and global error catching, providing a unified "Network Guard" for the app.
- **Resilient Logic**: Implemented `AbortController` patterns for rapid-fire filtering and custom event-driven communication for global UI components.
- **Accessibility (A11y)**: Focus-ring management for keyboard navigation, high-contrast semantic indicators, and comprehensive ARIA labels.

---

## 🏗️ Tech Stack

### Frontend
- **Core**: React 18 (Vite)
- **State**: Redux Toolkit (RTK)
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js / Express
- **Database**: MongoDB (Mongoose)
- **AI Service**: Google Generative AI (Gemini 2.5 Flash)
- **Auth**: JWT (JSON Web Tokens) & BcryptJS

---

## 📂 Project Structure

```text
code/
├── client/                # React application (Frontend)
│   ├── src/
│   │   ├── app/           # Redux Store configuration
│   │   ├── features/      # Redux Slices (Auth, Tasks)
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page-level components
│   │   ├── services/      # API & Axios configuration
│   │   └── hooks/         # Custom React hooks (useDebounce, etc.)
├── server/                # Express application (Backend)
│   ├── src/
│   │   ├── controllers/   # Business logic
│   │   ├── models/        # Database schemas
│   │   ├── routes/        # API Endpoints
│   │   └── middleware/    # Auth & Error handlers
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/deknek-ai-tasks.git
cd deknek-ai-tasks
```

### 2. Backend Setup
```bash
cd code/server
npm install
```
Create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_super_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```
Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🏃 Running the App

### Start Backend
```bash
cd code/server
npm run dev
```

### Start Frontend
```bash
cd code/client
npm run dev
```

---

## ☁️ Deployment

- **Frontend**: Highly optimized for **Vercel** or **Netlify**.
- **Backend**: Ready for **Render**, **Railway**, or **Heroku**.
- **Database**: Use **MongoDB Atlas** for a production-ready cloud database.

---

## 👨‍💻 Author

**Your Name**
- [LinkedIn](https://linkedin.com/in/yourprofile)
- [GitHub](https://github.com/yourusername)
- [Portfolio](https://yourportfolio.com)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
>>>>>>> develop
