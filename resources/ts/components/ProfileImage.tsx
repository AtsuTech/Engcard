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
            {my_image != "" &&
                <img src={ '/storage/images/profile/' + my_image} width={width} height={height} className="block rounded-full border border-gray-400" />
            }

            {my_image == "" &&            
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" width={width} height={height} className="block rounded-full" />
            }
            
        </>
    );
}