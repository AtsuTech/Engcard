import { FC } from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { useState, useEffect, useContext } from "react";


export const ProfileImage:FC<{width:number,height:number,}> = ({width,height}) =>{

    const [my_image,setMyImage] = useState<any>("");
    useEffect(()=>{
        // トークンでアクセスしてユーザー名を取得
        axios.get('/api/user/profile/image/my').then((response:AxiosResponse|any) => { 

            setMyImage(response.data);
            
            console.log(my_image);
        }).catch((error:AxiosError|any) => { 
 
        });
    },[]);

    return(
        <>
            <div className="w-fit border border-gray-300 rounded-full">
                {my_image != "" ?
                    <img src={location.protocol + '//' + window.location.host +'/storage/images/profile/' + my_image} width={width} height={height} alt={my_image} className="block rounded-full border border-gray-400" />
                    :
                    <img src={location.protocol + '//' + window.location.host + "/material/images/icon-no-img.png"} width={width} height={height} className="block rounded-full" />
                }                
            </div>

        </>
    );
}