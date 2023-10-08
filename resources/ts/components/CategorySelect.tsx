import { FC } from "react";
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { CategoryCreate } from "./CategoryCreate";


//親コンポーネントより変数(value)と関数(handleInput)を受け取り
export const CategorySelect:FC<{value:any ,handleInput: any}> = ({value,handleInput}) =>{

    const [categories,setCategory] = useState<any>([]);

    const [update,setUpdate] = useState(false);
    function Update(){
        
        if(update){
            setUpdate(false);
        }else if(!update){
            setUpdate(true);
        }
    }


    useEffect(()=>{

        //DB通信でデータ取得
        axios.get('/api/categories').then((response) => { 
            setCategory(response.data);
        }).catch((error) => { 
            console.log(error);
        });
    
    },[update]);

    console.log(categories);


    return(
        
        <div className="relative">
            {/* {categories.map( (category:any) => (
                <option key={category.id} value={category.id}>{category.item}</option>
            ))}   */}

            <button className="block w-32 h-10 border border-gray-300 rounded-lg">選択▼{}</button>

            <div className="block w-full h-full absolute top-0 left-0">
                <div className="block w-60 mx-auto mt-10 bg-white">
                    <div className="block w-full leading-8 border-b border-gray-300 text-center">カテゴリを設定</div>
                    <ul className="w-full h-96 overflow-auto">

                        {categories.map( (category:any) => (
                            <li key={category.id}>
                                <input className="sr-only peer" 
                                    type="radio" 
                                    value={category.id} 
                                    name="category_id" 
                                    id={category.id} 
                                    onChange={(e:any) => handleInput(e.target.value)} 
                                    checked={category.id == value} 
                                />
                                <label className="block w-full leading-8 text-center focus:outline-none hover:bg-gray-200 peer-checked:bg-yellow-400" htmlFor={category.id}>{category.item}</label>
                            </li>
                        ))} 

                        <li><CategoryCreate Update={Update} /></li>
                        
                    </ul>
                    
                </div>
            </div>
            
        </div>
        
    );
}