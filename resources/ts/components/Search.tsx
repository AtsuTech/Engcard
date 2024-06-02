import { FC } from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { Title } from "./parts_component/Title";
import { PageBack } from "./parts_component/PageBack";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';


export const Search:FC = () => {

    const [keyword,setKeyword] = useState<any>();
    const [flashcards,setflashcards] = useState([]);

    //console.log(flashcards);

    const clearKeyword = () =>{
        setKeyword('');
        setflashcards([]);
    }


    const handleInput = (e:any) => {

        //イベントハンドラが実行された後にオブジェクトのプロパティにアクセスする必要がある場合は、e.persist() を呼ぶ必要がある
        e.persist();
        setKeyword(e.target.value);


        //setLogin({...loginInput, [e.target.name]: e.target.value });
    }

    useEffect(()=>{
        // トークンでアクセスしてユーザー名を取得
        axios.get('/api/flashcard/search/' + keyword).then((response:AxiosResponse|any) => { 
            //console.log(response.data);
            setflashcards(response.data);
            
        }).catch((error:AxiosError|any) => { 
            console.log(error);
        });
    },[keyword]);


    return(
     
        <div className="w-full mt-5 mb-10 p-5 rounded-3xl bg-white min-h-80 text-slate-600">

            <PageBack />
            <Title title="さがす" />

            <div className="flex w-full h-10 mt-2 border border-gray-300 rounded-lg">
                
                <button className="w-fit px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
                <input type="text" className="block w-full m-1 rounded-lg" onChange={handleInput} value={keyword} />

                <button className="w-fit px-2" onClick={clearKeyword}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {keyword != '' &&
                <div className="w-full py-3 text-center">検索結果 : {flashcards.length}件</div>
            }
            

            <ul className="">
                {
                    flashcards.map( (flashcard:any) => (
                        <li key={flashcard.id} className="pl-2 py-2 border border-slate-300 rounded mb-1 hover:bg-amber-200">
                            <Link to={`/flashcard/${flashcard.uuid}`} className="block w-full">
                                {flashcard.title}
                            </Link>
                        </li>
                    ))
                }                
            </ul>

        </div>
        
    );
}