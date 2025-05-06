import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <div className="flex items-center">
      {/* Desktop and Tablet view */}
      <form
        onSubmit={handleSearch}
        className="hidden sm:flex items-center space-x-2 border border-gray-300 rounded-full p-1 sm:p-2 w-full sm:w-auto"
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="outline-none border-none w-full sm:w-auto"
        />
        <button type="submit" className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.6em"
            height="1.6em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
            ></path>
          </svg>
        </button>
      </form>

      {/* Mobile View: toggle input on icon click */}
      <form
        onSubmit={handleSearch}
        className="sm:hidden flex items-center space-x-2"
      >
        {showInput ? (
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none border border-gray-300 rounded-full p-1 px-3 text-black w-full transition-all"
          />
        ) : (
          <button
            type="button"
            onClick={() => setShowInput(true)}
            className="cursor-pointer bg-gray-200 p-1 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.6em"
              height="1.6em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
              ></path>
            </svg>
          </button>
        )}
      </form>
    </div>
  );
};

export default Search;
