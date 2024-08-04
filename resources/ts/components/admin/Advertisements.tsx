import { FC } from "react";
import { useState, useEffect, useRef} from "react";
import axios from 'axios';

import { CreateAdvertisements } from "./CreateAdvertisement";
import { UpdateAdvertisements } from "./UpdateAdvertisement";

export const Advertisements:FC =()=>{

    const [advertisements,SetAdvertisements] = useState([]);



    useEffect(()=>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.get('/api/advertisement/index').then((response) => { 
            SetAdvertisements(response.data);
        }).catch((error) => { 
            console.log(error);
        });
    },[]);



    return(
        <>
            <h1 className="text-2xl">Advertisements</h1>



            
            <CreateAdvertisements />
            
            <table className="table-auto border-collapse border border-slate-300 w-full bg-white">
                <thead>
                    <th className="border border-slate-300">広告名</th>
                    <th className="border border-slate-300">HTML</th>
                    <th className="border border-slate-300">ステータス</th>
                    <th className="border border-slate-300">操作</th>
                </thead>
                <tbody>
                {advertisements.map( (advertisement:any) => (
                    <tr  key={advertisement.id} className="">
                        <td className="border border-slate-300 p-2">{advertisement.name}</td>
                        <td className="border border-slate-300 p-2 w-32">
                            <div dangerouslySetInnerHTML={{ __html: advertisement.html_code }} />
                        </td>
                        <td className="border border-slate-300 p-2 text-center">
                            {advertisement.active ?
                                <p>公開</p>
                            :
                                <p>非公開</p>
                            }
                        </td>
                        <td className="border border-slate-300 p-2">
                            <div className="flex h-10 p-2">
                                <UpdateAdvertisements 
                                    id={advertisement.id}
                                    name={advertisement.name}
                                    html_code={advertisement.html_code}
                                    active={advertisement.active}
                                />
                                削除                                
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}