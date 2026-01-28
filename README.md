# 🎵 Antakshari 2025

Antakshari 2025 is a modern, full-stack web application designed to manage and organize songs for an Antakshari game. It was specifically created to ace the CIIPPUS 2026 Antakshari Competition at Jadavpur University. This platform allows users to add songs, shuffle them for rounds, and employs an admin-controlled locking mechanism to ensure fair play.

## ✨ Features

### 🔐 Authentication
*   **User Registration & Login**: Secure signup and login functionality using JWT authentication.
*   **Role-Based Access**: Specialized features for Admin (controlled via email).

### 🎧 Song Management
*   **Add Songs**:
    *   Upload song files (MP3).
    *   Add details like Title, Artist, and Language (Hindi, Bengali, English, etc.).
    *   Automatic file handling with Cloudinary storage.
*   **Song Library**:
    *   View all added songs in a dedicated library page.
    *   Filter and search capabilities (implicit in design).
    *   Delete songs from the library.

### 🎲 Game Logic (Home Page)
*   **Smart Shuffle**: Randomly selects songs for the current round.
*   **Language Grouping**: Automatically categorizes selected songs by language for easy viewing.
*   **Admin Controls**:
    *   **Lock/Unlock Shuffle**: Admin can lock the shuffle feature to prevent accidental changes during a round.
    *   **Visual Indicators**: Clear UI cues for Locked/Unlocked state.

### 💻 Technical Highlights
*   **Responsive Design**: Built with Tailwind CSS for a seamless experience on all devices.
*   **Modern UI**: Glassmorphism effects, gradient text, and smooth animations.
*   **Optimistic UI Updates**: Instant feedback on actions like locking/unlocking.

---

## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

### Backend
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

### Utilities & Packages
*   **State Management**: React Context API
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **HTTP Client**: Axios
*   **File Uploads**: Multer
*   **Auth**: JSON Web Tokens (JWT), Bcrypt.js

