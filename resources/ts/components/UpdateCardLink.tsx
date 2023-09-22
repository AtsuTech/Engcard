import { FC } from "react";
import { Link } from 'react-router-dom';


export const UpdateCardLink:FC<{id:any}> = ({id})=> {
    return(
        <>
            <Link to={`/card/update/${id}`}>
                <button className="bg-green-600 w-14 h-10 text-white rounded-lg shadow-lg font-medium text-1xl">編集</button>
            </Link>
        </>
    );
}