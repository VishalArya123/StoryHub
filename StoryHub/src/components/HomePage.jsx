import React from 'react';
import { BookOpen, PenLine, Sparkles, Heart, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { genres } from './Genres';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-amber-50">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-rose-600 to-rose-500 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to StoryHub</h1>
          <p className="text-xl md:text-2xl mb-8">Where imagination comes to life! Read and share magical stories.</p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => navigate('/explore')}
              className="bg-amber-400 hover:bg-amber-500 text-rose-900 px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Start Reading
            </button>
            <button 
              onClick={() => navigate('/write')}
              className="bg-white hover:bg-gray-100 text-rose-600 px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Start Writing
            </button>
          </div>
        </div>
      </div>

      {/* Featured Stories Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-center space-x-2 mb-12">
          <Sparkles className="h-6 w-6 text-amber-600" />
          <h2 className="text-3xl font-bold text-gray-800">Featured Stories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Magical Adventure {item}</h3>
              <p className="text-gray-600 mb-4">Join us on an exciting journey through enchanted forests and magical kingdoms...</p>
              <div className="flex justify-between items-center">
                <span className="text-rose-600 font-medium">Fantasy</span>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-rose-600 transition-colors">
                  <Heart className="h-5 w-5" />
                  <span>123</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Genres Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Explore Our Genres</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {genres.map((genre, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg text-center cursor-pointer transition-all hover:scale-105"
                style={{
                  backgroundColor: genre.bgColor,
                  color: genre.textColor
                }}
              >
                <genre.icon className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold text-lg">{genre.name}</h3>
                <p className="text-sm mt-2">{genre.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Write Stories Section */}
      <section className="bg-rose-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Share Your Story</h2>
          <p className="text-xl text-gray-600 mb-8">Let your creativity flow and share your stories with our community</p>
          <button onClick={() => navigate('/write')} className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
            Start Writing Now
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Discover Stories</h3>
            <p className="text-gray-600">Explore countless stories across various genres, from fantasy to mystery.</p>
          </div>
          <div className="text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <PenLine className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Write & Share</h3>
            <p className="text-gray-600">Create your own stories and share them with readers worldwide.</p>
          </div>
          <div className="text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p className="text-gray-600">Like stories and connect with other writers and readers.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;