import { FC } from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

export const UserList:FC =()=>{

    const[users,setUsers] = useState<any>([]);

    useEffect(()=>{        

        //成功の場合、認証必須ページにアクセス許可
        axios.get('/api/admin/user/list').then((response) => { 
            setUsers(response.data);
            console.log(response);
        })    
        
        //失敗(トークン有効期限切れor無し)の場合以下はログインへ強制移動
        .catch((error) => { 
            
            // setCheckAdmin(false);
            
        });

    },[]);

    return(
        <>
            <h1 className="text-2xl">UserList</h1>

            <table className="table-auto w-full bg-white">
                <thead>
                    <tr>
                        <th className="border border-slate-300">Id</th>
                        <th className="border border-slate-300">Icon</th>
                        <th className="border border-slate-300">Name</th>
                        <th className="border border-slate-300">E-mail</th>
                        <th className="border border-slate-300">Operation</th>
                    </tr>
                </thead>
                <tbody>
                {users.map( (user:any) => (
                    <tr key={user.name}>
                        <td className="border border-slate-300 text-center">{user.id}</td>
                        <td className="border border-slate-300 text-center">
                            {/* {user.profile_icon_img && <img src={'/storage/images/profile/' + user.profile_icon_img} width={28} className="rounded-full inline-block" alt="" />}
                            {user.profile_icon_img ==null  && <span>NoImg</span>} */}

                            {user.profile_icon_img != null ?
                                <img src={location.protocol + '//' + window.location.host +'/storage/images/profile/' + user.profile_icon_img} width={28} className="block ml-auto mr-auto rounded-full border border-gray-400" />
                                :
                                <img src={location.protocol + '//' + window.location.host + "/material/images/icon-no-img.png"} width={28} className="block ml-auto mr-auto rounded-full" alt="ss" />
                            }    
                        </td>
                        <td className="border border-slate-300">
                           {user.name}
                        </td>
                        <td className="border border-slate-300">{user.email}</td>
                        <td className="border border-slate-300 p-1 text-center">
                            <button className="bg-gray-300 hover:bg-gray-400 text-cyan-700 py-1 px-3 mr-1 rounded-full">
                                detail
                            </button>
                            <button className="bg-rose-500 hover:bg-rose-600 text-white py-1 px-3 rounded-full">
                                delete
                            </button>
                        </td>
                    </tr>
                ))} 
                </tbody>
            </table>

        </>
    )
}