import { FC } from "react";
import { Link } from 'react-router-dom';
import { LinkLogo } from "../parts_component/LinkLogo";

export const SideMenu:FC =()=>{

    return(
        <aside className="w-64 h-screen /p-2 bg-gray-800">
            <div className="w-full flex items-center h-20 border-b border-b-slate-50">
                <div className="w-fit ml-auto mr-auto">
                    <LinkLogo link="/" width={100} />  
                </div>    
            </div>

            <img src="/storage/material_img/gazotan.png" alt="" width={100} className="mt-3 rounded-lg" />
            <ul className="text-white">
                <li className="p-4">
                    <Link to="/admin">Home</Link>
                </li>
                <li className="p-4">
                    <Link to="/admin/user/list">Users</Link>
                </li>
                <li className="p-4">
                    <Link to="/admin/advertisements">Advertisements</Link>
                </li>
            </ul>
        </aside>
    )
}