import React, { useState, useEffect } from 'react';
import { Save, Send, Trash2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StoryEditor from './StoryEditor';

const WriteStory = () => {
  const navigate = useNavigate();
  const [story, setStory] = useState({
    title: '',
    content: '',
    genre: '',
    description: '',
    author: '' // Added author field to state
  });
  const [drafts, setDrafts] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [showDrafts, setShowDrafts] = useState(true);

  const genres = [
    'Fantasy', 'Science Fiction', 'Mystery', 'Romance', 
    'Adventure', 'Horror', 'Literary Fiction', 'Historical Fiction','other'
  ];

  useEffect(() => {
    fetchDrafts();
  }, []);

  useEffect(() => {
    const words = story.content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharCount(story.content.length);
  }, [story.content]);

  const fetchDrafts = async () => {
    try {
      const response = await fetch('http://localhost/StoryHub/StoryHub/Backend/getDrafts.php');
      const data = await response.json();
      if (data.success && data.drafts) {
        setDrafts(data.drafts);
      } else {
        console.error('Failed to fetch drafts:', data.error);
      }
    } catch (error) {
      console.error('Error fetching drafts:', error);
    }
  };

  const saveDraft = async () => {
    try {
      const response = await fetch('http://localhost/StoryHub/StoryHub/Backend/saveDraft.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(story),
      });
      const data = await response.json();
      if (data.success) {
        alert('Draft saved successfully!');
        fetchDrafts(); // Refresh drafts list after saving
      } else {
        alert(data.error || 'Failed to save draft');
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Error saving draft');
    }
  };

  const publishStory = async () => {
    // Check if required fields are filled
    if (!story.title.trim()) {
      alert('Please enter a title');
      return;
    }
    if (!story.author.trim()) {
      alert('Please enter the author name');
      return;
    }
    if (!story.genre) {
      alert('Please select a genre');
      return;
    }
    if (!story.content.trim()) {
      alert('Please write some content');
      return;
    }

    try {
      const response = await fetch('http://localhost/StoryHub/StoryHub/Backend/publishStory.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(story),
      });
      const data = await response.json();
      if (data.success) {
        alert('Story published successfully!');
        navigate(`/story/${data.storyId}`);
      } else {
        alert(data.error || 'Failed to publish story');
      }
    } catch (error) {
      console.error('Error publishing story:', error);
      alert('Error publishing story');
    }
  };

  const loadDraft = async (draftId) => {
    try {
      const response = await fetch(`http://localhost/StoryHub/StoryHub/Backend/getDraft.php?id=${draftId}`);
      const data = await response.json();
      setStory(data);
    } catch (error) {
      console.error('Error loading draft:', error);
    }
  };

  const deleteDraft = async (draftId) => {
    if (window.confirm('Are you sure you want to delete this draft?')) {
      try {
        const response = await fetch(`http://localhost/StoryHub/StoryHub/Backend/deleteDraft.php?id=${draftId}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          fetchDrafts();
        }
      } catch (error) {
        console.error('Error deleting draft:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Drafts Sidebar */}
      <div className={`bg-white w-64 border-r border-gray-200 p-4 ${showDrafts ? 'block' : 'hidden'} md:block`}>
        <h2 className="text-xl font-bold mb-4">Your Drafts</h2>
        <div className="space-y-3">
          {drafts.map((draft) => (
            <div 
              key={draft.id}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <div 
                className="flex items-center space-x-2 flex-1"
                onClick={() => loadDraft(draft.id)}
              >
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="truncate">{draft.title || 'Untitled'}</span>
              </div>
              <button
                onClick={() => deleteDraft(draft.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="max-w-4xl mx-auto w-full space-y-4">
            <input
              type="text"
              placeholder="Story Title"
              className="w-full text-3xl font-bold border-none focus:outline-none focus:ring-0"
              value={story.title}
              onChange={(e) => setStory({ ...story, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Author Name"
              className="w-full text-lg border rounded-lg px-3 py-2"
              value={story.author}
              onChange={(e) => setStory({ ...story, author: e.target.value })}
            />
            <div className="flex space-x-4">
              <select
                className="border rounded-lg px-3 py-2"
                value={story.genre}
                onChange={(e) => setStory({ ...story, genre: e.target.value })}
              >
                <option value="">Select Genre</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Short description (optional)"
              className="w-full h-20 border rounded-lg p-3 resize-none"
              value={story.description}
              onChange={(e) => setStory({ ...story, description: e.target.value })}
            />
          </div>
        </div>

        <div className="flex-1 p-4 bg-gray-50">
          <div className="max-w-4xl mx-auto w-full">
            <StoryEditor
              content={story.content}
              onChange={(newContent) => setStory({ ...story, content: newContent })}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto w-full flex justify-between items-center">
            <div className="text-md text-gray-500">
              {wordCount} words | {charCount} characters
            </div>
            <div className="space-x-4">
              <button
                onClick={saveDraft}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Draft</span>
              </button>
              <br />
              <button
                onClick={publishStory}
                className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Publish</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteStory;
