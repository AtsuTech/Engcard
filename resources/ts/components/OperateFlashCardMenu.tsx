import { FC } from "react";
import { useState, useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';


export const OperateFlashCardMenu:FC<{id_encrypt:any,id:any,Update:any}> = ({id_encrypt,id,Update}) => {

    const [view,setView] = useState<boolean>(false);
    function View(){
        if(view){
            setView(false);
        }else if(!view){
            setView(true);
        }
    }


    const Delete = (id:number) =>{
        
        const confirm = window.confirm("削除しますが本当によろしいですか？");

        if (confirm) {
            axios.post('/api/flashcard/delete',{id: id}).then((response) => { 
                alert("削除しました。");
                Update();
            }).catch((error) => { 
                alert("失敗しました。");
            });
        };
    }

    return(
        <div className="block w-10 h-5 relative">

            <button onClick={View} className="w-10 h-5 /rounded-full /border /border-gray-100">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-5 text-gray-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </div>
            </button>

            {view&&

            <div className="relative top-0 right-28 z-10 bg-white /divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <Link to={`/flashcard/${id_encrypt}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            詳細
                        </Link>
                    </li>
                    <li>
                        <Link to={`/flashcard/update/${id_encrypt}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            編集
                        </Link>
                    </li>
                    <li>
                        <span onClick={() => Delete(id)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-red-600">
                            削除
                        </span>
                    </li>
                    <li>
                        <span onClick={() => View()} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            閉じる
                        </span>
                    </li>
                </ul>
            </div>
            }
        </div>
    );
}