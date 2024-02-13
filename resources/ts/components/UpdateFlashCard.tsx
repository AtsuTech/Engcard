import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { CardList } from "./CardList";
import { Title } from "./parts_component/Title";
import { ButtonWithOnClick } from "./parts_component/ButtonWithOnClick";


export const UpdateFlashCard:FC = () =>{
    document.title = "単語帳の編集"


    //URLからパラメータを取得
    const { flashcard_id } = useParams();

    //データ表示可能or不可能の判定フラグ
    //const[notFonund,setNotFonund] = useState(false);

    interface Flashcard {
        id: string;
        user_id:string|number;
        title: string;
        description: string;
        access_id: string|number;
        created_at: string;
        updated_at: string;
    }

    //編集データ表示の値
    const [flashcard,setFlashcard] = useState<Flashcard>({
        id:'',
        user_id:'',
        title:'',
        description:'',
        access_id:'',
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
                description:response.data.description,
                access_id:response.data.access_id,
                created_at:response.data.created_at,
                updated_at:response.data.updated_at,
            });

        }).catch((error) => { 
            //setNotFonund(true);
        });
    },[]);



    const [accessLists, setAccessLists] = useState<any>([]);

    useEffect(()=>{
        // axiosでログインAPIにemail,passwordをHTTP通信で送る
        axios.get('/api/accesses').then(function (response) {

            // --------送信成功時の処理-------- //
            console.log(response.data);
            setAccessLists(response.data);
            
        })
        .catch(function (error) {
        
            // --------送信失敗時の処理-------- //
            alert(error);

        });
    },[]);

    
    //input入力された値で更新
    const handleInput = (e:any) => {

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
            description: flashcard.description,
            access_id: flashcard.access_id,
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
        <div className="block w-full /ml-auto /mr-auto mt-10 mb-10 p-5 rounded-3xl bg-white">
            <h1 className="text-xs">単語帳を作成/カードの追加</h1>

            <Title title={'単語帳の編集'} />



            <div className="block w-full /ml-auto /mr-auto mt-10 mb-10 /p-5 rounded-3xl bg-white">
                
                <form>

                    <div className="flex w-full h-fit border border-gray-300 rounded-lg p-1  /text-3xl">
                        <ul className="w-fit h-fit pl-1 text-sm text-gray-700 border border-gray-300 rounded-lg" aria-labelledby="dropdownDefaultButton">
                        {accessLists.map( (accessList:any) =>(
                            <li className="flex" key={accessList.id}>
                                <input type="radio" name="access" value={accessList.id}
                                    onChange={(e:any) => setFlashcard({ ...flashcard, access_id: e.target.value })} 
                                    checked={flashcard.access_id == accessList.id } 
                                    required 
                                    className="sr-only peer"
                                    id={accessList.id}
                                />
                                <label htmlFor={accessList.id} className="block w-14 leading-5 text-xs text-center focus:outline-none peer-checked:text-amber-500">{accessList.item}</label>
                                <div className="hidden p-0.5 peer-checked:block">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </li>
                        )) }
                        </ul>

                        <input type="text" 
                            className="w-full h-10 /border border-gray-300 rounded-lg pl-2 /font-bold text-2xl" 
                            placeholder="タイトル" 
                            value={flashcard.title}
                            name="title"
                            onChange={handleInput} 
                            required
                        />                        
                    </div>

                    <label htmlFor="">概要</label>
                    <textarea 
                        name="description" 
                        id="" 
                        className="w-full h-32 border border-gray-300 rounded-lg pl-2 mt-2"
                        onChange={handleInput} 
                        value={flashcard.description}
                    >
                    </textarea>

                    <div>
                        <ButtonWithOnClick text="保存" color="yellow" onclick={updateSubmit} />
                    </div>
                   

                </form>
                
            </div>

            <div className="mt-5 mb-5">
                <hr className="border-bottom border-dashed border-2 border-amber-400 ..." />
            </div>
            

            <Title title={'単語カード'} />

            <div className="block w-full ml-auto mr-auto mt-10 mb-10 p-5 rounded-3xl bg-white">
                <CardList id={flashcard_id} />
            </div>

        </div>
    );
}