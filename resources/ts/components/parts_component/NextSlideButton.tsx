import React from 'react';

type NextButtonProps = {
    onClick: () => void;
}

export const NextSlideButton: React.FC<NextButtonProps> = ({ onClick }) => {
    return (
      <button className="bg-amber-400 hover:bg-amber-600 text-white w-20 h-20 px-5 font-bold rounded-full" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10">
        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    );
}



