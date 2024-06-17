import { FC } from "react";
import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import { UpdateCardLink } from "./UpdateCardLink";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

export const OperateCardMenu:FC<{id:any,uuid:any,reload:any}> = ({id,uuid,reload}) => {

    const [toggle,setToggle] = useState(false);

    const display  = () => setToggle((prev) => !prev);

    //カード削除
    function Delete(){
        
        const confirm = window.confirm("削除しますが本当によろしいですか？");

        if (confirm) {
            axios.post('/api/card/delete',{card_id: id}).then((response:AxiosResponse) => { 
                alert("削除しました。");
                reload();
                //setUpdate(true);
            }).catch((error) => { 
                alert("失敗しました。");
                console.log(error);
            });
        };
    }

    return(
        <div className="relative">
            <button className="text-slate-400 border border-1 border-gray-300 rounded-lg w-fit h-12 /px-1" onClick={display}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 w-6">
                <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                </svg>
            </button>

            {toggle &&
                <ul className="flex absolute right-0 top-0 bg-slate-300 w-fit h-12 p-0 rounded-lg z-50">
                    <li>
                        <Link className="/flex" to={`/card/update/${uuid}`}>
                            <div className="w-fit px-4 ml-auto mr-auto h-4/5bg-green-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-12">
                                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                                </svg>
                            </div>
                            {/* <div>編集</div> */}
                        </Link>
                    </li>
                    <li onClick={Delete}>
                        <div className="/flex">
                            <div className="w-fit px-4 ml-auto mr-auto /bg-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-12">
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                </svg>                                
                            </div>
                            {/* <div>削除</div> */}
                        </div>
                    </li>
                    <li>
                        <button className="w-fit px-4 ml-auto mr-auto /bg-amber-500" onClick={display}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-12">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </li>
                </ul>
            }


        </div>
    );
}