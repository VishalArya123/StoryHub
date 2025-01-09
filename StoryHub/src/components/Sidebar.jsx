import React from 'react';

const Sidebar = ({ selectedGenre, onGenreSelect }) => {
  const genres = [
    { id: 'all', name: 'All Stories' },
    { id: 'suspense', name: 'Suspense' },
    { id: 'thriller', name: 'Thriller' },
    { id: 'poem', name: 'Poem' },
    { id: 'fantasy', name: 'Fantasy' },
    { id: 'other', name: 'Other' }
  ];

  return (
    <aside className="w-full md:w-64 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Genres</h2>
      <nav className="space-y-2">
        {genres.map(genre => (
          <button
            key={genre.id}
            onClick={() => onGenreSelect(genre.id)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedGenre === genre.id
                ? 'bg-rose-600 text-white'
                : 'hover:bg-rose-50 text-gray-700'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;