# 📖 StoryHub - A Story Publishing Platform

**StoryHub** is an interactive and user-friendly platform designed for readers and writers. It provides a seamless experience for publishing, reading, and discovering stories across various genres. Writers can create and manage their stories, while readers can explore, like, and engage with stories based on their interests.

---

## 🚀 Features

### 🌟 Core Features
- **User Authentication** – Secure login and signup with session-based authentication.
- **Story Management** – Create, edit, save drafts, and publish stories effortlessly.
- **Story Liking System** – Support your favorite stories with a like feature.
- **Genre Categorization** – Browse and filter stories by genre.
- **Draft Management** – Save and edit drafts before publishing.
- **Responsive Design** – Optimized for both desktop and mobile devices.
- **Error Handling** – Proper validation and error messages for a smooth user experience.

### 🛠 Backend API Features
- **Secure Authentication** – Password hashing for user login and signup.
- **Story CRUD Operations** – Create, read, update, and delete stories.
- **Draft Management** – Save and modify drafts before publishing.
- **Genre Filtering** – Fetch stories based on genre preferences.
- **CORS Support** – Ensures smooth communication between frontend and backend.

---

## 📌 Pages Overview

### 🏠 Home Page
The home page provides an engaging entry point with:
- A **hero section** introducing StoryHub.
- A **featured stories** grid for showcasing top content.
- A categorized **genre list** for easy navigation.

### 🔍 Explore Stories
- Browse stories based on genre preferences.
- Data is fetched from the backend API.
- Uses **StoryCard** components for an engaging preview experience.
- Apply filters to discover new stories easily.

### ✍ Write Story
- A **rich text editor** for drafting and publishing stories.
- Features include **draft saving, character count tracking,** and **one-click publishing**.
- Writers can revise and manage their drafts seamlessly.

### 🔗 Navbar
- **Mobile-friendly navigation** for a seamless experience.
- **User authentication status handling** (logged in/out state).
- **Profile dropdown menu** for managing user settings and account details.

### 📱 Footer
- Includes **quick links**, **social media icons**, and **genre shortcuts**.
- Displays **copyright information**.

### 🖼 StoryCard
- A **reusable component** for displaying story previews.
- Includes **title, description, author, and like functionality**.
- Truncated descriptions offer a **quick snippet** without overwhelming the reader.

### 🔐 Login & Signup
- Secure **user authentication system**.
- Includes **form validation, error handling,** and **post-login redirection**.

---

## 📦 Tech Stack

### Frontend:
- **React** (with Vite for fast builds)
- **Tailwind CSS** (for responsive styling)

### Backend:
- **PHP** (with MySQL & PDO for database interactions)
- **Session-based authentication** (secure password hashing)

---

## 📄 API Endpoints

### Authentication:
- `/login.php` – User login
- `/signup.php` – User registration
- `/logout.php` – User logout
- `/check-auth.php` – Verify authentication status

### Stories:
- `/get-stories.php` – Fetch all stories
- `/get-story.php` – Fetch a single story
- `/getFeaturedStories.php` – Fetch featured stories
- `/publishStory.php` – Publish a story
- `/like-story.php` – Like a story
- `/update-likes.php` – Update like count

### Drafts:
- `/getDrafts.php` – Fetch all drafts
- `/getDraft.php` – Fetch a single draft
- `/saveDraft.php` – Save a draft
- `/deleteDraft.php` – Delete a draft

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
 git clone https://github.com/your-repo/storyhub.git
```

### 2️⃣ Set Up Your Development Environment
- Ensure you have **PHP, MySQL, and Node.js** installed.

### 3️⃣ Install Dependencies
#### Frontend:
```sh
cd frontend
npm install
```
#### Backend:
- Set up your **MySQL database** using the provided SQL file.
- Configure database credentials in your PHP backend.

### 4️⃣ Run the Application
#### Start the Backend:
```sh
php -S localhost:8000 -t backend
```
#### Start the Frontend:
```sh
cd frontend
npm run dev
```
Your application will be available at `http://localhost:5173`.

---

## 📜 License
This project is licensed under the **MIT License**. See the `LICENSE` file for details.

Happy Writing & Reading! 🚀📖
