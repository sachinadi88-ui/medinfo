
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-brand-mid/20 py-6 sticky top-0 z-50 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-deep rounded-lg flex items-center justify-center text-white shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-brand-deep tracking-tight">MedInfo Assistant</h1>
          <p className="text-sm text-brand-mid font-medium">Clear & Educational Medical Insights</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
