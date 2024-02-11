import { FC } from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";


type FollowingProps = {
    id: any;
    update: () => void;
}


export const Following:FC<FollowingProps> =({id,update})=>{

    const [status,setStatus] = useState<boolean>();
    const [toggle,setToggle] = useState<boolean>(false);

    //フォロー状態確認
    useEffect(()=>{
        // パラメータidでアクセスし、該当データをDBより取得
        axios.get('/api/follow/status/'+ id).then((response) => { 
            console.log(response.data.status);
            setStatus(response.data.status);
            
        }).catch((error) => { 
            
        });

    },[toggle]);


    //フォロー付与
    const Add = () =>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.post('/api/follow/add',{user_id:id}).then((response) => { 
        
            alert('フォローしました');
            update();
            setToggle(true);

        }).catch((error) => { 
            alert('エラー');
        });
    }

    //フォロー付与
    const Remove = () =>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.post('/api/follow/remove',{user_id:id}).then((response) => { 
        
            alert('フォロー解除');
            update();
            setToggle(false);

        }).catch((error) => { 
            alert('エラー');
        });
    }

    return(
        <>
            {status ?

                <button 
                    className="w-32 bg-amber-400 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={Remove}>
                    フォロー解除
                </button>

            :
                <button 
                    className="w-32 bg-white hover:bg-amber-100 text-amber-400 font-bold py-2 px-4 rounded-full border border-amber-400"
                    onClick={Add}>
                    フォロー
                </button>
            }

        </>
    );
}
