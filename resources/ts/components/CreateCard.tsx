import { FC } from "react";
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

export const CreateCard:FC<{id: any,Update: any}> = ({id,Update}) => {

    const [card,setCard] = useState({
        img_path:'',
        part_of_speech:'',
        word:'', 
        word_mean:'',
        sentence:'',
        sentence_mean:'',
    });

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
        params.append('part_of_speech',card.part_of_speech);
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
            
        });
    }

    return(
        <>
            <h5>カードを追加</h5>
            <form onSubmit={CreateSubmit}>
                <div className="flex">

                    
                    <input type="text" 
                        name="word" 
                        className="w-full h-10 border border-gray-300 rounded pl-2" 
                        placeholder="単語 ex.)Apple" 
                        onChange={handleInput} 
                        required
                    />

                    <select name="part_of_speech" onChange={handleInput}>
                        <option value={0}>名詞</option>
                        <option value={1}>動詞</option>
                    </select>

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

                <button type="submit" className="block mr-0 bg-blue-400 w-36 h-10 text-white ml-auto mr-auto rounded-lg font-medium text-1xl">
                    追加
                </button>
            </form>
        </>
    );
}