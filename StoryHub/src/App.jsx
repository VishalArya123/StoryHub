import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import ExploreStories from './components/ExploreStories';
import StoryPage from './components/StoryPage';
import WriteStory from './components/WriteStory'
import LikedStories from './components/LikedStories'
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/explore" element={<ProtectedRoute><ExploreStories /></ProtectedRoute>} />
          <Route path="/write" element={<ProtectedRoute><WriteStory /></ProtectedRoute>} />
          <Route path="/story/:id" element={<ProtectedRoute><StoryPage /></ProtectedRoute>} />
          <Route path="/liked-stories" element={<ProtectedRoute><LikedStories /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App

