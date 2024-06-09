import { FC } from "react";
import {Link} from 'react-router-dom';

export const Loading:FC = () =>{
    return(
        <div className="flex justify-center" aria-label="読み込み中">
            <div className="animate-spin h-8 w-8 border-4 border-slate-200 rounded-full border-t-transparent"></div>
        </div>
    );
}