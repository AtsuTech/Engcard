import { FC } from "react";
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { CategorySelect } from "./CategorySelect";

export const CreateCard:FC<{id: any,Update: any}> = ({id,Update}) => {

    const [card,setCard] = useState<any>({
        img_path:'',
        //category_id:1,//初期値は1:未選択
        word:'', 
        word_mean:'',
        sentence:'',
        sentence_mean:'',
    });

    const [category_id,setCategory_id] = useState<any>(1);

    //フォーム入力項目をcardにセット
    const handleInput =(e:any)=>{
        e.persist();
        setCard({...card, [e.target.name]: e.target.value }); 
    }

    //フォームからの画像ファイルの処理
    const [files, setFile] = useState<any>(null);
    const handleInputFile =(e:any)=>{
        setFile(e.target.files[0]);
    }

    //Submitボタンでデータ送信処置
    const CreateSubmit =(e:any)=>{
        e.preventDefault();
        
        //axios通信で渡すクエリパラメータ
        const params = new FormData();
        params.append('flashcard_id',id);
        params.append('image',files);
        params.append('category_id',category_id);
        params.append('word',card.word);
        params.append('word_mean',card.word_mean);
        params.append('sentence',card.sentence);
        params.append('sentence_mean',card.sentence_mean);
        
        //DBにデータ送る
        axios.post('/api/card/create', params).then(function (response: AxiosResponse<Response>) {

            // 送信成功時の処理
            alert('保存しました');

            //カードのuseEffectを発火させるための関数
            Update();
            
        })
        .catch(function (error:undefined|any) {

            // 送信失敗時の処理
            alert('失敗しました。');
            console.log(error);
            
        });
        
    }
console.log(category_id);
    return(
        <>
            <h5>カードを追加</h5>
            <div>
                <div className="flex">

                    
                    <input type="text" 
                        name="word" 
                        className="w-full h-10 border border-gray-300 rounded pl-2" 
                        placeholder="単語 ex.)Apple" 
                        onChange={handleInput} 
                        required
                    />

                    {/* <select name="category_id" onChange={handleInput}>
                        <CategorySelect />
                    </select> */}
                    <CategorySelect value={category_id} handleInput={setCategory_id} />

                    <input type="text" 
                        name="word_mean" 
                        className="w-full h-10 border border-gray-300 rounded pl-2" 
                        placeholder="訳 ex.)りんご" 
                        onChange={handleInput} 
                        required
                    />
                    
                </div>

                <input accept="image/*" multiple type="file"  
                    onChange={handleInputFile}
                />


                <div className="flex">
                    <textarea 
                        name="sentence" 
                        rows={5} 
                        className="w-full p-2 border border-gray-300" 
                        onChange={handleInput} 
                        placeholder="例文:Apple is red and delicious fruits.">
                    </textarea>

                    <textarea 
                        name="sentence_mean" 
                        rows={5} 
                        className="w-full p-2 border border-gray-300" 
                        onChange={handleInput} 
                        placeholder="例文(訳):りんごは赤くて美味しい果物です。">
                    </textarea>
                </div>

                <button type="submit" className="block mr-0 bg-blue-400 w-36 h-10 text-white ml-auto mr-auto rounded-lg font-medium text-1xl" onClick={CreateSubmit}>
                    追加
                </button>
            </div>
            
        </>
    );
}