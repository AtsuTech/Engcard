import { FC } from "react";
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';



export const CategoryCreate:FC<{Update:any}> = ({Update}) => {


    const [category,setCategory] = useState<string>('');

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) =>{
        e.persist();
        setCategory(e.target.value);
    }

    const Submit = (e:any) =>{

        
        e.preventDefault();

        const params = {
            item:category,
        }

        axios.post('/api/categories/create', params).then(function (response: AxiosResponse<Response>) {

            // 送信成功時の処理
            
            Update();
            

        })
        .catch(function (error) {
        
            // --------送信失敗時の処理-------- //
            alert(error);
            console.log(error);

        });
        setCategory('');

    }



    return(
        <div className="flex p-1">
                <input type="text" className="w-full h-10 border border-gray-300 rounded pl-1" placeholder="カテゴリを追加" 
                    name="item"
                    value={category}
                    onChange={handleInput} 
                    required
                />
                
                <button type="submit" className="w-20 font-medium text-1xl text-yellow-500" onClick={Submit}>追加</button>
        </div>
    );
}