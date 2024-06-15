import React from 'react';

type PrevButtonProps = {
    onClick: () => void;
}

export const PrevSlideButton: React.FC<PrevButtonProps> = ({ onClick }) => {
    return (
      <button className="font-bold mt-3" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-10 text-white bg-slate-500 rounded-md">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
    );
}



