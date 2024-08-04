import { FC } from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
//Outletをインポート
import { Outlet } from 'react-router-dom';
import { ProfileImage } from "../ProfileImage";
import { SideMenu } from "./SideMenu";

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

                <SideMenu />

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