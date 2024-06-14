import { FC } from "react";
import { useState, useEffect, useContext} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { CategoryCreate } from "./CategoryCreate";
import { CategoryContext } from "./CategoryContext";

//親コンポーネントより変数(value)と関数(handleInput)を受け取り
export const SubMeanCategorySelect:FC<{name:any, category_id:any, onchange:any }> = ({name,category_id,onchange}) =>{
    const {categories} = useContext<any>(CategoryContext);

    //選択中のカテゴリをテキスト表示取得
    const [selected_itme,setSelectedItme] = useState('')

    useEffect(() => {
        const selected = categories.find((element: any) => element.id === parseInt(category_id));
        if (selected) {
            setSelectedItme(selected.item);
        } else {
            setSelectedItme('設定なし');
        }
    }, [category_id,categories]);
    

    const [view,setView] = useState<boolean>(false);
    const View = () => setView(!view);


    return(

        <div className="relative inline-block">

            {/* セクトボックス部分 */}
            <div 
                className="flex justify-center items-center text-center px-1 w-14 md:w-20 text-xs h-full /text-sm border border-gray-300 rounded-md "
                onClick={View}>
                <p className="w-full truncate">{selected_itme}</p>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>

            </div>

            {view &&
                
                <div className="absolute top-full left-0 mt-2 z-50">

                    <div className="top-0 py-2 z-10 bg-white divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700">

                        <button className="absolute right-3" onClick={View}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <ul className="mt-10 w-full h-80 overflow-auto">

                            {categories.map( (category:any) => (
                                <li key={category.id}>
                                    <input className="sr-only peer" 
                                        type="radio" 
                                        value={category.id} 
                                        name={name}
                                        id={'#category' + category.id} 
                                        onChange={onchange}
                                        onClick={View}
                                        checked={category.id == category_id} 
                                    />
                                    <label className="block w-full leading-8 text-center focus:outline-none hover:bg-gray-200 peer-checked:bg-yellow-400" htmlFor={'#category' + category.id}>{category.item}</label>
                                </li>
                            ))} 

                            <li><CategoryCreate /></li>
                            
                        </ul>

                    </div>

                </div>
            }


            
        </div>
        
    );
}