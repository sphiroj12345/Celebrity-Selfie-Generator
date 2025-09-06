
import React from 'react';
import type { Personality } from '../types';

interface SelectedPersonalitiesProps {
    personalities: Personality[];
    onDeselect: (personalityId: number) => void;
}

export const SelectedPersonalities: React.FC<SelectedPersonalitiesProps> = ({ personalities, onDeselect }) => {
    if (personalities.length === 0) {
        return null;
    }
    
    return (
        <div className="mb-4 p-3 bg-gray-700/50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Selected:</h3>
            <div className="flex flex-wrap gap-2">
                {personalities.map(p => (
                    <div key={p.id} className="flex items-center bg-cyan-800/50 text-cyan-200 rounded-full pl-3 pr-1 py-1 text-sm">
                        <span>{p.name}</span>
                        <button 
                            onClick={() => onDeselect(p.id)}
                            className="ml-2 w-5 h-5 flex items-center justify-center rounded-full bg-cyan-700 hover:bg-cyan-600 transition-colors"
                            aria-label={`Deselect ${p.name}`}
                        >
                            <svg className="w-3 h-3 text-cyan-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
