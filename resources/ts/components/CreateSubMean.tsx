import { FC } from "react";
import { useState, useEffect} from "react";
import { CategorySelect } from "./CategorySelect";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';



export const CreateSubMean:FC<{card_id:any,reload:any}> = ({card_id,reload}) =>{
    
    const [subWordMean,setWordMean] = useState<any>({
        card_id:card_id,
        word_mean : '',
    });
    const [category_id,setCategory_id] = useState<number>(1);

    const handleInput =(e:any)=>{
        e.persist();
        setWordMean({...subWordMean, [e.target.name]: e.target.value }); 
    }

    //DB新規作成処理
    const createSubmit =(e:any)=>{
        e.preventDefault();
        
        //axios通信で渡すクエリパラメータ
        const params = {
            card_id: subWordMean.card_id,
            category_id: category_id,
            word_mean: subWordMean.word_mean
        }

        axios.post('/api/word_mean/create', params).then(function (response: AxiosResponse<Response>) {
            // 送信成功時の処理
            reload();
            setCategory_id(1);
            setWordMean({
                card_id:card_id,
                word_mean : '',
            });
            alert('追加しました');
            
            
        })
        .catch(function (error:undefined|any) {
            // 送信失敗時の処理
            alert('失敗しました。');
            console.log(error);
        });
    }

    return(
        <div className="flex w-100">
            <div className="flex w-full h-fit p-1 mr-1 border border-gray-300 focus-within:border-amber-400 rounded-lg">
                <CategorySelect  name="category_id" category_id={category_id} handleInput={setCategory_id} />
                <input className="w-full h-6 ml-1 outline-transparent" type="text" name="word_mean" value={subWordMean.word_mean} onChange={handleInput} />
            </div>
            <button className="block w-14 border border-amber-400 text-amber-400 rounded" onClick={createSubmit}>追加</button>
        </div>
    );
}