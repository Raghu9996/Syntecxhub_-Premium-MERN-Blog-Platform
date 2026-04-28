# 📝 BlogSpace - Advanced Full-Stack MERN Blog Platform

BlogSpace is a modern, production-ready blogging platform built using the MERN stack. It provides a premium user experience with a sleek dark-mode UI, smooth animations, and robust backend architecture. This project is designed to be a high-performance, scalable solution for content creators.

---

## 🚀 Live Demo

🔗 [Add your deployed link here (e.g., Render/Vercel)]

---

## 📸 Screenshots

*(Add your professional screenshots here: Dashboard, Profile, and Blog Read Page)*

---

## ✨ Features

### 🔐 Advanced Authentication
- **JWT-based Signup & Login:** Secure token-based session management.
- **Secure Hashing:** Password protection using industry-standard `bcrypt`.
- **Protected Routes:** Unauthorized users cannot access dashboards or profile settings.

### 📝 Content Management (CRUD)
- **Full CRUD:** Create, Read, Update, and Delete blogs with a smooth UI.
- **Tag-based Categorization:** Organise content with searchable tags.
- **Access Control:** Only authors can edit or delete their own posts.

### 🔍 Search & Filtering
- **Tag Search:** Find specific topics instantly.
- **Smart Sorting:** Toggle between "Newest" and "Oldest" posts.
- **Optimized Performance:** Backend-level filtering for fast responses.

### 👤 Premium User Profile
- **Customization:** Update name and professional bio.
- **High-Limit Uploads:** Profile picture uploads supported up to **10MB**.
- **Dynamic Avatars:** Automatically generates stylish letter-avatars if no image is uploaded.

### 🎨 State-of-the-Art UI/UX
- **Glassmorphism Design:** Modern translucent UI with blur effects.
- **Dynamic Animations:** Powered by **Framer Motion** for a fluid feel.
- **Responsiveness:** Fully optimized for Mobile, Tablet, and Desktop screens.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Framer Motion (Animations)
- Axios (API Communication)
- React Router DOM (Navigation)
- Vanilla CSS (Custom Premium Styles)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (NoSQL Database)
- JSON Web Token (Authentication)
- Multer (Advanced File Handling)

---

## 📁 Project Structure

```text
BlogSpace/
├── backend/        # Node/Express API, Models, Routes, Middleware
├── frontend/       # React App, Components, Pages, Styling
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Task-2
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5009
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
NODE_ENV=development
```
Run backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## 📡 API Overview

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT |
| GET | `/api/blogs` | Fetch all blogs (with filter/sort) |
| POST | `/api/blogs` | Create a new blog (Auth Required) |
| PUT | `/api/blogs/:id` | Update a blog (Author Only) |
| DELETE | `/api/blogs/:id` | Delete a blog (Author Only) |
| POST | `/api/profile/upload` | Upload Profile Pic (Auth Required) |

---

## 💼 Use Case
- **Blogging Platform:** A perfect base for a professional blog or news site.
- **Freelance Portfolio:** Demonstrates proficiency in MERN stack, Auth, and UI design.
- **SaaS Starter:** Can be extended into a multi-user content platform.

---

## 🚀 Future Improvements
- [ ] Real-time comments and nested replies.
- [ ] Like and Bookmark system for saved reads.
- [ ] Admin Dashboard for content moderation.
- [ ] Cloud Storage integration (Cloudinary/AWS S3).

---

## 👨‍💻 Author
**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

---

## ⭐ Show your support
If you like this project, give it a star ⭐!
