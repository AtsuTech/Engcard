import React from 'react';

type CloseButtonProps = {
    onClick: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
    return (
      <button className="w-fit h-full px-2 font-bold /rounded-full" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-gray-600 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    );
}



