# DekNek - Smart AI Task Manager 🚀

A modern, production-ready full-stack web application designed to help users organize their workflow, prioritize what matters, and utilize AI for smart task suggestions.

## 🌟 Features
- **User Authentication:** Secure JWT-based signup and login flow with encrypted passwords.
- **Task Management:** Full CRUD capabilities for tracking tasks with Priority and Status markers.
- **AI Task Suggestions:** Integrated with Google Gemini to suggest actionable next steps based on user context.
- **Beautiful UI/UX:** Built with modern glassmorphism design, clean typography, and Framer Motion micro-animations.
- **Responsive Design:** Seamless experience across desktop and mobile devices.

## 🛠️ Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Redux Toolkit, Framer Motion, React Router v6.
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcrypt.
- **AI Integration:** Google Gemini API.

## 🚀 Setup Instructions

### 1. Database Setup
Ensure you have a MongoDB instance running locally (`mongodb://127.0.0.1:27017/deknek`) or create a free MongoDB Atlas cluster. Update the `MONGO_URI` in the server's `.env` file accordingly.

### 2. Backend Configuration
1. Navigate to the server folder: `cd code/server`
2. Install dependencies: `npm install`
3. Configure the `.env` file with your `GEMINI_API_KEY`.
4. Start the backend: `npm run dev`

### 3. Frontend Configuration
1. Navigate to the client folder: `cd code/client`
2. Install dependencies: `npm install`
3. Start the Vite dev server: `npm run dev`

## 📸 Screenshots
*(Add your screenshots here!)*
- **Landing Page:** Showcases the animated hero section.
- **Dashboard:** Displays the kanban-style task list and AI suggestion module.

## 🤝 Best Practices Followed
- Centralized Error Handling Middleware
- API Payload Validation
- Secure JWT HTTP header interceptors
- Redux AsyncThunks for optimal data fetching
- Clean architectural separation of concerns (MVC pattern)
