import { FC } from "react";
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { Link } from 'react-router-dom';
import { Title } from "./parts_component/Title";


export const Setting:FC = () =>{

    document.title = "ダッシュボード";

    return(
        <div className="block rounded-3xl bg-white text-slate-600 p-5">

            <Title title="設定" />

            <div className="mt-5 mb-2">アカウント</div>         
            <ul className="w-full /text-sm font-medium bg-white border border-gray-300 rounded-lg">
                <li className="w-full px-4 py-4 border-b border-gray-300 rounded-t-lg">
                    <Link to="/user/password/update">パスワード変更</Link>
                </li>

                <li className="w-full px-4 py-4 rounded-b-lg text-rose-500">
                    <Link to="/user/unscribe">退会</Link>
                </li>
            </ul>

            <div className="mt-5 mb-2">単語帳&単語カード</div>
            <ul className="w-full /text-sm font-medium bg-white border border-gray-300 rounded-lg">
                <li className="w-full px-4 py-4 /border-b border-gray-300">
                    <Link to="/category/setting" className="block w-full h-full">単語カテゴリ設定</Link>
                </li>
            </ul>
            
        </div>
    );
}