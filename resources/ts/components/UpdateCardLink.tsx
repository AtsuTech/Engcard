import { FC } from "react";
import { Link } from 'react-router-dom';


export const UpdateCardLink:FC<{id:any}> = ({id})=> {
    return(
        <>
            <Link to={`/card/update/${id}`}>
                <button className="flex items-center justify-center bg-amber-400 w-10 h-10 text-white rounded-lg /font-medium /text-1xl">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>
                </button>
            </Link>
        </>
    );
}