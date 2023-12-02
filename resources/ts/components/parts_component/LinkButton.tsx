import { FC } from "react";
import { Link } from 'react-router-dom';

export const LinkButton:FC<{ref:string,text:string,}> = ({ref,text}) => {
    return(
        <>
            <Link to={ref} className="block w-fit h-fit bg-yellow-500">
                {text}
            </Link>
        </>
    );
}
