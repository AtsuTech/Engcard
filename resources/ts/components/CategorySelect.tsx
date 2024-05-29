import { FC } from "react";
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { CategoryCreate } from "./CategoryCreate";


//親コンポーネントより変数(value)と関数(handleInput)を受け取り
export const CategorySelect:FC<{name:any, value:any ,handleInput: any}> = ({name,value,handleInput}) =>{

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


    const [selected_itme,setSelectedItme] = useState('カテゴリ選択');
    
    useEffect(()=>{

        //DB通信でデータ取得
        axios.get(`/api/category/${value}`).then((response) => { 
            setSelectedItme(response.data.item);
        }).catch((error) => { 
            console.log(error);
        });
    
    },[value]);


    return(

        <div className="relative inline-block">

            <div 
                className="block text-center py-1 w-20 h-7 text-sm border border-gray-300 rounded-lg"
                onClick={View}>
                {selected_itme}
            </div>

            {view &&
                
                <div className="absolute top-full left-0 mt-2 z-50">

                    {/* <div className="fixed top-0 left-0 bottom-0 right-0 m-auto w-80 h-fit bg-white border border-gray-400 rounded-lg"> */}
                    <div className="relative top-0 py-2 /right-28 z-10 bg-white /divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700">

                        {/* <div className="block w-full leading-8 border-b border-gray-300 text-center">
                            カテゴリを設定
                            
                        </div> */}
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
                                        //name="category_id" 
                                        name={name}
                                        id={'#category' + category.id} 
                                        onChange={(e:any) => handleInput(e.target.value)} 
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