
import React from 'react';

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 01-1.414 1.414L12 6.414l-2.293 2.293a1 1 0 01-1.414-1.414L10 5m0 14l2.293-2.293a1 1 0 011.414 1.414L12 19.586l2.293-2.293a1 1 0 011.414 1.414L14 21m-4-11l2.293 2.293a1 1 0 01-1.414 1.414L8 12.414l-2.293 2.293a1 1 0 01-1.414-1.414L6 11m12 0l-2.293 2.293a1 1 0 01-1.414-1.414L16 12.414l2.293-2.293a1 1 0 011.414 1.414L18 11z" />
  </svg>
);
