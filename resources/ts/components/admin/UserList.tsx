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

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border border-slate-300">Id</th>
                        <th className="border border-slate-300">Name</th>
                        <th className="border border-slate-300">E-mail</th>
                        <th className="border border-slate-300">Operation</th>
                    </tr>
                </thead>
                {users.map( (user:any) => (
                    <tr>
                        <td className="border border-slate-300">{user.id}</td>
                        <td className="border border-slate-300">{user.name}</td>
                        <td className="border border-slate-300">{user.email}</td>
                        <td className="border border-slate-300">
                            <button>detail</button>
                            <button>delete</button>
                        </td>
                    </tr>
                ))} 
            </table>

        </>
    )
}