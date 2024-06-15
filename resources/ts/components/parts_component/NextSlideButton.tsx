import React from 'react';

type NextButtonProps = {
    onClick: () => void;
}

export const NextSlideButton: React.FC<NextButtonProps> = ({ onClick }) => {
    return (
      <button className="font-bold mt-3" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-10 text-white bg-slate-500 rounded-md">
        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    );
}



