import { FC } from "react";
import {Link} from 'react-router-dom';

export const LinkLogo:FC<{link:string,width:number}> =({link,width})=>{
    return(
        <>
            <Link to={link}>
                <img src={location.protocol + '//' + window.location.host + "/material/images/brand-logo.png" }
                    alt="logo" 
                    width={width} 
                    className="block rounded-lg /ml-auto /mr-auto" 
                />
            </Link>
        </>
    );
}