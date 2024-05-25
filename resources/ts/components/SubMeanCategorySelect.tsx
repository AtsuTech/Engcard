import { FC } from "react";
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { CategoryCreate } from "./CategoryCreate";


//親コンポーネントより変数(value)と関数(handleInput)を受け取り
export const SubMeanCategorySelect:FC<{name:any, value:any, onchange:any }> = ({name,value,onchange}) =>{

    const [categories,setCategory] = useState<any>([]);

    const [view,setView] = useState<boolean>(false);
    function View(){
        if(view){
            setView(false);
        }else if(!view){
            setView(true);
        }
    }
 
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


    const [selected_itme,setSelectedItme] = useState('設定なし');
    
    useEffect(()=>{

        //DB通信でデータ取得
        axios.get(`/api/category/${value}`).then((response) => { 
            setSelectedItme(response.data.item);
        }).catch((error) => { 
            console.log(error);
        });
    
    },[value]);


    return(

        <div>

            <div 
                className="block text-center py-1 w-32 h-7 text-sm border border-gray-300 rounded-lg"
                onClick={View}>
                {selected_itme}
            </div>

            {view &&
                
                <div className="">

                    <div className="relative top-0 py-2 /right-28 z-10 bg-white /divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700">

                        <button onClick={View}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <ul className="w-full h-80 overflow-auto">

                            {categories.map( (category:any) => (
                                <li key={category.id}>
                                    <input className="sr-only peer" 
                                        type="radio" 
                                        value={category.id} 
                                        name={name}
                                        id={'#category' + category.id} 
                                        onChange={onchange}
                                        onClick={View}
                                        checked={category.id == value} 
                                    />
                                    <label className="block w-full leading-8 text-center focus:outline-none hover:bg-gray-200 peer-checked:bg-yellow-400" htmlFor={'#category' + category.id}>{category.item}</label>
                                </li>
                            ))} 

                            <li><CategoryCreate Update={Update} /></li>
                            
                        </ul>

                    </div>

                </div>
            }


            
        </div>
        
    );
}