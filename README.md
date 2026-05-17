# TaskIQ 🚀

> Smart AI-powered task management for modern productivity.

TaskIQ is a full-stack, AI-powered task management application designed to help users organize, prioritize, and complete tasks efficiently. Built with a modern React + Redux architecture and a scalable Node.js backend, TaskIQ delivers a seamless SaaS-like experience.

Powered by Google Gemini AI, TaskIQ provides intelligent task suggestions while leveraging advanced frontend techniques like optimistic UI updates, infinite scrolling, and debounced search for lightning-fast performance. With built-in deadline intelligence, real-time feedback, and accessibility-focused design, TaskIQ reflects production-grade engineering and UX standards.

---

## 🌐 Live Demo

👉 **[TaskIQ 🚀](smart-ai-task-manager-dun.vercel.app)**

---

## 📸 Screenshots

| Dashboard | AI Suggestions | Task Intelligence |
| :---: | :---: | :---: |
| ![Dashboard](./assets/screenshots/dashboard.png) | ![AI Suggestions](./assets/screenshots/ai_suggestions.png) | ![Task Intelligence](./assets/screenshots/task_intelligence.png) |

---

## ✨ Features (SaaS-Grade)

* 🤖 **Google Gemini AI Integration**: Intelligent task recommendations based on your workflow.
* ⚡ **Optimistic UI Updates**: Instant UI feedback for status changes and deletions.
* ⚠️ **Deadline Intelligence**: Overdue tasks pulse red, “Due Soon” tasks highlight in orange.
* 🔍 **Advanced Real-time Search**: Debounced search (300ms) with filtering (Priority, Status).
* 📂 **Persistent State**: Filters and preferences stored in LocalStorage.
* 🚀 **Infinite Scroll**: Smooth rendering using Intersection Observer.
* 🔔 **Resilient Notifications**: Toast notifications + network error handling.

---

## 🧠 Why This Project Stands Out

* AI-powered task planning using Google Gemini
* Production-level frontend architecture (Redux normalization, memoization)
* Advanced UX patterns (debounce, infinite scroll, optimistic UI)
* Robust error handling with Axios interceptors

---

## 🛠️ Advanced Engineering Highlights

* **Normalized Redux Architecture** (`byId`, `allIds`)
* **Performance Optimization** (`useMemo`, `React.memo`)
* **Global Axios Interceptors** for centralized error handling
* **AbortController** for request cancellation
* **Accessibility (A11y)** with ARIA labels & focus states

---

## 🏗️ Tech Stack

### Frontend

* React 18 (Vite)
* Redux Toolkit
* Tailwind CSS
* Framer Motion
* Lucide React
* React Hot Toast

### Backend

* Node.js / Express
* MongoDB (Mongoose)
* Google Gemini API
* JWT Authentication

---

## 📂 Project Structure

```text
code/
├── client/
│   ├── src/
│   │   ├── app/
│   │   ├── features/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── hooks/
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
```

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/Sunil0987654321/Smart-AI-Task-Manager.git
cd Smart-AI-Task-Manager
```

---

### 2. Backend Setup

```bash
cd code/server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_gemini_api_key
```

---

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

## ▶️ Run the App

### Backend

```bash
cd code/server
npm run dev
```

### Frontend

```bash
cd code/client
npm run dev
```

---

## ☁️ Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 💡 Future Enhancements

* 🧑‍🤝‍🧑 **Team collaboration features**
* 📅 **Calendar integration**
* 📈 **Advanced analytics**
* 📱 **Mobile app version**

---

## 👨‍💻 Author

**Sunil Patturi**

* [GitHub](https://github.com/Sunil0987654321)
* [LinkedIn](https://www.linkedin.com/in/sunil-kumar-patturi-13118828a/)

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
