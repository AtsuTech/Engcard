import { FC } from "react";
import {Link} from 'react-router-dom';

export const LinkLogo:FC<{link:string,width:number}> =({link,width})=>{
    return(
        <>
            <Link to={link}>
                <img src="/storage/images/material/brand-logo.png" 
                    alt="logo" 
                    width={width} 
                    className="block /mt-3 rounded-lg ml-auto mr-auto" 
                />
            </Link>
        </>
    );
}