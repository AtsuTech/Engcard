import { FC } from "react";
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { DeleteCategory } from "./DeleteCategory";
import { UpdateCategory } from "./UpdateCategory";

export const CategorySetting:FC = () => {

    document.title = "カテゴリ設定";

    const [categories,setCategory] = useState<any>([]);
    const [refresh,setRefresf] = useState<boolean>(false);
    function Refresh(){
        if(refresh){
            setRefresf(false);
        }else if(!refresh){
            setRefresf(true);
        }
    }

    useEffect(()=>{

        //DB通信でデータ取得
        axios.get('/api/categories/my').then((response) => { 
            setCategory(response.data);
            console.log(response);
        }).catch((error) => { 
            console.log(error);
        });
    
    },[refresh]);



    return(
        <>
            <h5>カテゴリ設定</h5>

            {categories.map( (category:any) => (
                <div key={category.id} className="flex h-10">

                    
                    <UpdateCategory id={category.id} value={category.item} Refresh={Refresh} />
                    <DeleteCategory id={category.id} Refresh={Refresh} />
                </div>
            ))} 
        </>
    );
}