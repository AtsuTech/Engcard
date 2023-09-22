import { FC } from "react";
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';



export const PartOfSpeechesSelect:FC = () =>{

    const [part_of_speeches,setPart_of_speeches] = useState<any>([]);


    useEffect(()=>{

        //
        axios.get('/api/part_of_speeches').then((response) => { 
            //console.log(response);
            setPart_of_speeches(response.data);
        }).catch((error) => { 
            console.log(error);
        });
    
    },[]);


    return(
        
        <>
            {part_of_speeches.map( (part_of_speeche:any) => (
                <option key={part_of_speeche.id} value={part_of_speeche.id}>{part_of_speeche.item}</option>
            ))}  
        </>
        
    );
}