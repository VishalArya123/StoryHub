import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const StoryCard = ({ story, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleLike = async () => {
    if (!user) {
      alert('Please log in to like stories');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('https://vishal-arya.rf.gd/like-story.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ story_id: story.id }),
        credentials: 'include' // Add this line to include credentials
      });
      const data = await response.json();
      if (data.success) {
        onUpdate();
      } else {
        console.error('Failed to like story:', data.error);
        alert(data.error || 'Failed to like story');
      }
    } catch (error) {
      console.error('Failed to like story:', error);
      alert('An error occurred while liking the story');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
        <p className="text-gray-600 mb-2">By {story.author}</p>
        <p className="text-gray-600 mb-4">
          {story.description.substring(0, 150)}...
        </p>
        <div className="flex justify-between items-center">
          <span className="text-rose-600 font-medium">{story.genre}</span>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              disabled={loading}
              className="flex items-center space-x-1 text-gray-500 hover:text-rose-600 transition-colors"
            >
              <Heart className={`h-5 w-5 ${loading ? 'animate-pulse' : ''}`} />
              <span>{story.likes}</span>
            </button>
            <Link
              to={`/story/${story.id}`}
              className="text-rose-600 hover:text-rose-700 font-medium"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;

