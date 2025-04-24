import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';

const StoryPage = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    fetchStory();
  }, [id]);

  const fetchStory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://vishal-arya.rf.gd/get-story.php?id=${id}`);
      const data = await response.json();
      
      if (data.success) {
        setStory(data.story);
      } else {
        setError(data.error || 'Failed to fetch story');
      }
    } catch (err) {
      setError('Failed to load story');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      setLiking(true);
      const response = await fetch('https://vishal-arya.rf.gd/update-likes.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${id}`,
      });
      const data = await response.json();
      if (data.success) {
        setStory(prev => ({
          ...prev,
          likes: data.likes
        }));
      }
    } catch (error) {
      console.error('Failed to like story:', error);
    } finally {
      setLiking(false);
    }
  };

  if (loading) {
    return (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
    );
  }

  if (error || !story) {
    return (
        <div className="container mx-auto px-4 py-8">
          <div className="text-red-600 text-center">{error || 'Story not found'}</div>
        </div>
    );
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
          
          <div className="flex items-center justify-between mb-6">
            <div className="text-gray-600">By {story.author}</div>
            <div className="flex items-center space-x-2">
              <span className="text-rose-600 font-medium">{story.genre}</span>
              <button
                onClick={handleLike}
                disabled={liking}
                className="flex items-center space-x-1 text-gray-500 hover:text-rose-600 transition-colors"
              >
                <Heart className={`h-5 w-5 ${liking ? 'animate-pulse' : ''}`} />
                <span>{story.likes}</span>
              </button>
            </div>
          </div>

          <div className="prose max-w-none">
            {story.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
  );
};

export default StoryPage;