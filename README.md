📖 StoryHub - A Story Publishing Platform
StoryHub is an interactive and user-friendly platform designed for readers and writers. It provides a seamless experience for publishing, reading, and discovering stories across various genres. Writers can create and manage their stories, while readers can explore, like, and read stories based on their interests.

🏠 Home Page
The Home Page serves as the entry point to StoryHub. It includes a hero section that introduces the platform, a grid of featured stories, and a categorized list of genres for easy navigation. The page is styled using Tailwind CSS, with gradients and responsive design to enhance the user experience.

🔍 Explore Stories
The Explore Stories page allows readers to browse stories by different genres. The page fetches story data from the backend API and uses StoryCard components to display each story's preview. Filters enable users to select stories from their favorite genres, making it easy to discover new content.

✍️ Write Story
Write Story provides a rich text editor where writers can draft their stories. The editor includes features such as draft saving, character count tracking, and a publishing button. Writers can manage their drafts, revise them, and publish them when they’re ready.

🔗 Navbar
The Navbar provides a responsive navigation system. It includes:

A mobile-friendly menu for seamless navigation across devices
User authentication status handling (logged in or out)
A profile dropdown menu for managing user settings and accessing personal information
📱 Footer
The Footer contains helpful links and social media icons, along with quick links for easy access to genres and other sections of the platform. It also includes copyright information.

🖼️ StoryCard
The StoryCard is a reusable component for displaying story previews. Each card includes:

Story title, description, and author
Like functionality to allow users to support stories they enjoy
Truncated descriptions to show a snippet of the story without overwhelming the reader
🔐 Login & Signup
The Login and Signup pages allow users to create accounts, log in, and manage their authentication status. These pages handle form validation, error messages, and redirection after successful authentication.

🌟 Key Features
Authentication System: Secure login and signup with session-based management.
Draft Management: Write and save drafts before publishing.
Story Liking System: Show support for stories by liking them.
Genre Categorization: Browse stories based on specific genres.
Responsive Design: Optimized for both desktop and mobile devices.
Error Handling: Proper error messages for a smooth user experience.
🛠️ Backend API Features
The backend is built using PHP and communicates with a MySQL database. Key features include:

Authentication: User signup, login, and logout with secure password hashing.
Story Management: CRUD operations for stories, including features like publishing and liking.
Draft Management: Save and edit story drafts before publishing.
Genre Filtering: Filter stories based on genre preferences.
CORS Support: Allows cross-origin requests to ensure frontend-backend communication.
📦 Technologies Used
Frontend: React, Vite, Tailwind CSS
Backend: PHP, MySQL, PDO
Authentication: Session-based authentication with password hashing
Styling: Tailwind CSS with a responsive, mobile-first approach
🚀 Getting Started
Clone the repository.
Set up your local development environment.
Install dependencies for both frontend and backend.
Configure your MySQL database with the provided SQL files.
Run the backend and frontend locally.
📄 API Endpoints
Authentication: /login.php, /signup.php, /logout.php, /check-auth.php
Stories: /get-stories.php, /get-story.php, /getFeaturedStories.php, /publishStory.php, /like-story.php, /update-likes.php
Drafts: /getDrafts.php, /getDraft.php, /saveDraft.php, /deleteDraft.php
📱 Screenshots
Here are a few highlights of the platform's features:


The Hero Section on the Home Page


A Preview of a Story Card

🛠️ Contributing
We welcome contributions! Please fork the repository, make your changes, and submit a pull request.

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

