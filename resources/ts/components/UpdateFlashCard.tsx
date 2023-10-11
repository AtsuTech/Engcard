import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { CardList } from "./CardList";


export const UpdateFlashCard:FC = () =>{
    document.title = "単語帳の編集"


    //URLからパラメータを取得
    const { flashcard_id } = useParams();

    //データ表示可能or不可能の判定フラグ
    const[notFonund,setNotFonund] = useState(false);

    interface Flashcard {
        id: string;
        user_id:string|number;
        title: string;
        access: string|number;
        created_at: string;
        updated_at: string;
    }

    //編集データ表示の値
    const [flashcard,setFlashcard] = useState<Flashcard>({
        id:'',
        user_id:'',
        title:'',
        access:'',
        created_at:'',
        updated_at:'',
    });

    //DBより編集対象データ取得し値をセット
    useEffect(()=>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.get('/api/flashcard/' + flashcard_id).then((response) => { 
            console.log(response);
            setFlashcard({
                id:response.data.id,
                user_id:response.data.user_id,
                title:response.data.title,
                access:response.data.access,
                created_at:response.data.created_at,
                updated_at:response.data.updated_at,
            });

        }).catch((error) => { 
            setNotFonund(true);
        });
    },[]);


    //input入力された値で更新
    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {

        //イベントハンドラが実行された後にオブジェクトのプロパティにアクセスする必要がある場合は、e.persist() を呼ぶ必要がある
        e.persist();

        const { name, value } = e.target
        setFlashcard({ ...flashcard, [name]: value })

    }

    //DB更新処理
    const updateSubmit =(e:any)=>{
        e.preventDefault();
        
        //axios通信で渡すクエリパラメータ
        const params = {
            id: flashcard.id,
            user_id: flashcard.user_id,
            title: flashcard.title,
            access: flashcard.access,
        }

        axios.post('/api/flashcard/update', params).then(function (response: AxiosResponse<Response>) {
            // 送信成功時の処理
            alert('保存しました');
            
        })
        .catch(function (error:undefined|any) {
            // 送信失敗時の処理
            alert('失敗しました。');
            console.log(error);
        });
    }

    return(
        <>
            <div>
                <h1 className="text-3xl">単語帳の編集</h1>
            </div>

            <div className="block w-full ml-auto mr-auto mt-10 mb-10 p-5 rounded-3xl bg-white">
            {notFonund ?
                
                <div>ページが見つかりません</div>

                :
                
                <form onSubmit={updateSubmit} className="flex">

                    
                    <ul className="w-24 h-14 pl-1 text-sm text-gray-700 border border-gray-300 rounded-lg" aria-labelledby="dropdownDefaultButton">

                        <li className="flex">
                            <input type="radio" name="access" value={0}
                                onChange={(e:any) => setFlashcard({ ...flashcard, access: e.target.value })} 
                                checked={flashcard.access == 0 } 
                                required
                                className="sr-only peer" 
                                id="0"
                            />
                            <label htmlFor="0" className="block w-full leading-7 /text-center focus:outline-none peer-checked:/bg-yellow-400">公開</label>
                            <div className="hidden p-1 peer-checked:block">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                            
                        </li>
                        <li className="flex">
                            <input type="radio" name="access" value={1}
                                onChange={(e:any) => setFlashcard({ ...flashcard, access: e.target.value })} 
                                checked={flashcard.access == 1 } 
                                required 
                                className="sr-only peer"
                                id="1"
                            />
                            <label htmlFor="1" className="block w-full leading-7 /text-center focus:outline-none peer-checked:/bg-yellow-400">非公開</label>
                            <div className="hidden p-1 peer-checked:block">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                            
                        </li>
                    </ul>
                    


                    <input type="text" className="w-full h-14 border border-gray-300 rounded-lg pl-2 mx-1 text-3xl" placeholder="タイトル" value={flashcard.title}
                        name="title"
                        onChange={handleInput} 
                        required
                    />


                    <button type="submit" className="block mr-0 bg-blue-400 w-36 h-14 text-white ml-auto mr-auto rounded-lg font-medium text-1xl">
                        更新
                    </button>

                </form>
                
            }
            </div>

            <div>
                <h1 className="text-3xl">単語カード追加</h1>
            </div>

            <div className="block w-full ml-auto mr-auto mt-10 mb-10 p-5 rounded-3xl bg-white">
                <CardList id={flashcard_id} />
            </div>

            
            
        </>
    );
}