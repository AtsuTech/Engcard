import { FC } from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { useState, useEffect, useContext } from "react";


export const ProfileImage:FC<{width:number,height:number,}> = ({width,height}) =>{


    const [my_image,setMyImage] = useState<any>([]);
    useEffect(()=>{
        // トークンでアクセスしてユーザー名を取得
        axios.get('/api/user/profile/image/my').then((response:AxiosResponse|any) => { 
            console.log(response);
            setMyImage(response.data);

        }).catch((error:AxiosError|any) => { 
 
        });
    },[]);

    return(
        <>
            <img src={ '/storage/images/profile/' + my_image} width={width} height={height} className="block rounded-full" />
        </>
    );
}