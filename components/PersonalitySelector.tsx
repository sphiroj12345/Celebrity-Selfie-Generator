
import React from 'react';
import { FAMOUS_PERSONALITIES } from '../constants';
import type { Category, Personality } from '../types';

interface PersonalitySelectorProps {
  selectedIds: number[];
  onSelect: (personality: Personality) => void;
}

const categories: Category[] = ['Science', 'Art & Literature', 'Politics', 'Entertainment'];

const PersonalityCard: React.FC<{
  personality: Personality;
  isSelected: boolean;
  onSelect: (personality: Personality) => void;
}> = ({ personality, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(personality)}
      className={`relative cursor-pointer rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 group ${isSelected ? 'ring-4 ring-cyan-400' : 'ring-2 ring-gray-700 hover:ring-cyan-500'}`}
    >
      <img src={personality.imageUrl} alt={personality.name} className="w-full h-32 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-2">
        <h3 className="text-white text-sm font-semibold">{personality.name}</h3>
      </div>
       {isSelected && (
        <div className="absolute inset-0 bg-cyan-500 bg-opacity-50 flex items-center justify-center">
           <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
      )}
    </div>
  );
};

export const PersonalitySelector: React.FC<PersonalitySelectorProps> = ({ selectedIds, onSelect }) => {
  return (
    <div className="space-y-6">
      {categories.map(category => (
        <div key={category}>
          <h3 className="text-lg font-semibold text-gray-300 mb-3">{category}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {FAMOUS_PERSONALITIES.filter(p => p.category === category).map(p => (
              <PersonalityCard
                key={p.id}
                personality={p}
                isSelected={selectedIds.includes(p.id)}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
