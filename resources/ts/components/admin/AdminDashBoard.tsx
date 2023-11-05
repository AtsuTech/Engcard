import { FC } from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
//Outletをインポート
import { Outlet } from 'react-router-dom';

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
                <div className="w-96 h-screen p-2 bg-gray-800">
                    <h5 className="text-white text-3xl">DashBoard</h5>
                    <img src="/storage/material_img/gazotan.png" alt="" width={100} className="mt-3 rounded-lg" />
                    <ul className="text-white">
                        <li className="p-4">
                            <Link to="/admin">Home</Link>
                        </li>
                        <li className="p-4">
                            <Link to="/admin/user/list">Users</Link>
                        </li>
                    </ul>
                </div>
                <div className="w-full">

                    <div className="w-full h-20 p-2 bg-gray-300">
                        <button>
                            <Link to="/home">Go to User Page</Link>
                        </button>
                    </div>

                    <div className="p-2">
                        <Outlet />
                    </div>
                    
                </div>
            </div>
            
        </>
    )
}