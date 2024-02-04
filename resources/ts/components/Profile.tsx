import { FC } from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { Following } from "./Following";


export const Profile:FC =()=>{

    const { user_id } = useParams();
    const [user,setUser] = useState<any>();
    const [update,setUpdate] = useState<boolean>(false);

    useEffect(()=>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.get('/api/profile/' + user_id).then((response:any) => { 

            setUser(response.data);
            console.log(response.data);

        }).catch((error) => { 
            console.log('通信エラーが発生しました');
        });
    },[]);

    return(
        <>
            <div className="w-full mt-1 mb-10 p-5 rounded-3xl bg-white text-slate-600">
                {user && (
                    <div className="w-full rounded-3xl bg-white text-slate-600">
                        <div className="flex /items-center">
                            <div className="w-full">
                                <img src={ '/storage/images/profile/' + user.profile_icon_img} width={60} height={60} className="block rounded-full" />
                            </div>
                            <div className="w-32 flex-shrink-0">
                                <div>
                                    <Following id={user.id} />
                                </div>
                                
                            </div>
                        </div>
                        
                        <div className="text-2xl">{user.name}</div>
                        <div>{user.comment}</div>
                        <div className="flex">
                            <div className="p-1">
                                <b>{user.following.length}</b> フォロー
                            </div>
                            <div className="p-1">
                                <b>{user.followed.length}</b> フォロワー
                            </div>
                        </div>

                       
                    </div>
                )}
            </div>
        </>
    );
}