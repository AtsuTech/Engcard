import { FC } from "react";
import { Link } from 'react-router-dom';

export const MakeFlashCardButton:FC = () => {
    return(
        <>
            <Link to='/flashcard/create' className="flex w-fit h-hit p-4 items-center justify-center rounded-lg text-sm /text-white h-fit bg-yellow-300 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
                つくる
            </Link>
        </>
    );
}






