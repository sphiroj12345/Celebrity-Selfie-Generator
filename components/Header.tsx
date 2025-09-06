
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
        Celebrity Selfie Generator
      </h1>
      <p className="mt-2 text-lg text-gray-400">Create your dream photo with icons from past and present.</p>
    </header>
  );
};
