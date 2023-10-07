import { FC } from "react";
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';



export const CategorySelect:FC = () =>{

    const [categories,setCategory] = useState<any>([]);


    useEffect(()=>{

        //
        axios.get('/api/categories').then((response) => { 
            setCategory(response.data);
        }).catch((error) => { 
            console.log(error);
        });
    
    },[]);


    return(
        
        <>
            {categories.map( (category:any) => (
                <option key={category.id} value={category.id}>{category.item}</option>
            ))}  
        </>
        
    );
}