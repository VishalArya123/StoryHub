import React, { useState, useEffect } from 'react';
import StoryCard from './StoryCard';
import Sidebar from './Sidebar';

const ExploreStories = () => {
  const [stories, setStories] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStories();
  }, [selectedGenre]);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://storyhub.freewebhostmost.com/public_html/get-stories.php?genre=${selectedGenre}`);
      const data = await response.json();
      
      if (data.success) {
        setStories(data.stories.map(story => ({
          ...story,
          description: story.description?.replace(/\n/g, ' ').trim() || 'No description available'
        })));
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch stories');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar selectedGenre={selectedGenre} onGenreSelect={setSelectedGenre} />
          <main className="flex-1">
            <h1 className="text-3xl font-bold mb-8">Explore Stories</h1>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-pulse">Loading stories...</div>
              </div>
            ) : error ? (
              <div className="text-red-600 text-center py-8 rounded bg-red-50 p-4">
                <p className="font-medium">{error}</p>
              </div>
            ) : stories.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No stories found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map(story => (
                  <StoryCard 
                    key={story.id} 
                    story={story} 
                    onUpdate={fetchStories}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ExploreStories;
