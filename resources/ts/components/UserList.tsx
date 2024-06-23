import { FC } from "react";
import { Link } from 'react-router-dom';

export const UserList:FC<{img:any,name:any,id:any}> = ({img,name,id}) =>{
    return(
        <Link to={`/profile/${id}`} className="w-full">
            <div className="flex items-center w-full">
                <div className="flex items-center gap-4 p-4">
                    {img ?
                        <img className="w-12 block rounded-full" src={location.protocol + '//' + window.location.host +'/storage/images/profile/' + img} />
                    :
                        <img src={location.protocol + '//' + window.location.host + "/material/images/icon-no-img.png" } className="w-12 block rounded-full" />
                    }
                    <div className="flex flex-col">
                    <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">{name}</strong>
                    <span className="text-slate-500 text-sm font-medium dark:text-slate-400">@{id}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}