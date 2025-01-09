import React, { useState, useEffect } from 'react';
import StoryCard from './StoryCard';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const LikedStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchLikedStories();
  }, [user, navigate]);

  const fetchLikedStories = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://storyhub.freewebhostmost.com/get-liked-stories.php', {
        credentials: 'include' // Include credentials in the request
      });
      const data = await response.json();
      
      if (data.success) {
        setStories(data.stories);
      } else {
        console.error('Failed to fetch liked stories:', data.error);
        setError(data.error || 'Failed to fetch liked stories');
      }
    } catch (err) {
      console.error('Error fetching liked stories:', err);
      setError('Failed to load liked stories');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Liked Stories</h1>
        {stories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">You haven't liked any stories yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map(story => (
              <StoryCard 
                key={story.id} 
                story={story} 
                onUpdate={fetchLikedStories}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedStories;

