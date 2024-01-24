import React from 'react';

type PrevButtonProps = {
    onClick: () => void;
}

export const PrevSlideButton: React.FC<PrevButtonProps> = ({ onClick }) => {
    return (
      <button className="bg-amber-400 hover:bg-amber-600 text-white w-20 h-20 px-5 font-bold rounded-full" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
    );
}



