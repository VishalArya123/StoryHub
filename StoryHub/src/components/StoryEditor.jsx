import React from 'react';

const StoryEditor = ({ content, onChange }) => {
  return (
    <div className="w-full bg-white rounded-lg border">
      <textarea
        className="w-full p-4 min-h-[calc(100vh-400px)] focus:outline-none border-none resize-none"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your story here..."
      />
    </div>
  );
};

export default StoryEditor;