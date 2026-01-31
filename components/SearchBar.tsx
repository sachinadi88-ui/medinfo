
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mt-8">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter medicine name (e.g., Paracetamol, Metformin...)"
          disabled={isLoading}
          className="w-full h-16 pl-6 pr-32 bg-white border border-brand-mid/30 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-mid focus:border-transparent transition-all text-lg placeholder-slate-400 disabled:bg-brand-cream/50"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-3 top-3 bottom-3 px-6 bg-brand-deep text-white font-semibold rounded-xl hover:bg-brand-mid disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          )}
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
