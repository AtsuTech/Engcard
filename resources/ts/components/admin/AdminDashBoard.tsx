import { FC } from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
//Outletをインポート
import { Outlet } from 'react-router-dom';
import { ProfileImage } from "../ProfileImage";

export const AdminDashBoard:FC =()=>{

    document.title = '管理者ダッシュボード';

    useEffect(()=>{
        // トークンでアクセスしてユーザー名を取得
        axios.get('/api/admin').then((response) => { 
            console.log(response);

        }).catch((error) => { 
            console.log(error);
        });
    },[]);

    return(
        <>
            
            <div className="flex text-gray-700">
                <aside className="w-64 h-screen /p-2 bg-gray-800">
                    <div className="w-full flex items-center h-20 border-b border-b-slate-50">
                        <h5 className="w-full text-white text-3xl text-center /h-20 ">DashBoard</h5>
                    </div>

                    <img src="/storage/material_img/gazotan.png" alt="" width={100} className="mt-3 rounded-lg" />
                    <ul className="text-white">
                        <li className="p-4">
                            <Link to="/admin">Home</Link>
                        </li>
                        <li className="p-4">
                            <Link to="/admin/user/list">Users</Link>
                        </li>
                    </ul>
                </aside>
                <main className="w-full bg-gray-200">

                    {/* Nabbar */}
                    <div className="w-full h-20 p-2 bg-gray-300 flex items-center">
                        <Link to="/home">
                            <button className="bg-gray-500 hover:bg-gray-600 text-white p-5 rounded-full">
                                Go to User Page
                            </button>
                        </Link>

                        <div className="ml-auto">
                            <ProfileImage width={50} height={50} />
                        </div>

                    </div>

                    <div className="p-2">
                        <Outlet />
                    </div>
                    
                </main>
            </div>
            
        </>
    )
}