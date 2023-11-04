import { FC } from "react";
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { CategoryCreate } from "./CategoryCreate";


//親コンポーネントより変数(value)と関数(handleInput)を受け取り
export const CategorySelect:FC<{value:any ,handleInput: any}> = ({value,handleInput}) =>{

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


    return(

        <div>

            <button 
                className="block w-32 h-10 border border-gray-300 rounded-lg"
                onClick={View}>
                選択▼{}
            </button>

            {view &&
                
                <div className="absolute left-0 top-0 h-screen w-screen">

                    <div className="fixed top-0 left-0 bottom-0 right-0 m-auto w-80 h-fit bg-white border border-gray-400 rounded">

                        <div className="block w-full leading-8 border-b border-gray-300 text-center">
                            カテゴリを設定
                            
                        </div>
                        <ul className="w-full h-80 overflow-auto">

                            {categories.map( (category:any) => (
                                <li key={category.id}>
                                    <input className="sr-only peer" 
                                        type="radio" 
                                        value={category.id} 
                                        name="category_id" 
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
                        <button onClick={View}>閉じる</button>
                    </div>

                </div>
            }


            
        </div>
        
    );
}