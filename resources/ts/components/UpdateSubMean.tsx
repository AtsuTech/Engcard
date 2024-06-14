import { FC } from "react";
import { useState, useEffect} from "react";
import { SubMeanCategorySelect } from "./SubMeanCategorySelect";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';



export const UpdateSubMean:FC<{id:any,category_id:any,word_mean:any;reload:any}> = ({id,category_id,word_mean,reload}) => {



    const [wordMean,setWordMean] = useState({
        id : id,
        category_id : category_id,
        word_mean: word_mean,
    });


    const [update,setUpdate] = useState(false);

   
    const handleInput =(e:any)=>{
        e.persist();
        setWordMean({...wordMean, [e.target.name]: e.target.value }); 
    }


    //DB更新処理
    const updateSubmit =(e:any)=>{
        e.preventDefault();
        
        //axios通信で渡すクエリパラメータ
        const params = {
            id: wordMean.id,
            category_id: wordMean.category_id,
            word_mean: wordMean.word_mean
        }

        axios.post('/api/word_mean/update', params).then(function (response: AxiosResponse<Response>) {
            // 送信成功時の処理
            reload();
            alert('更新しました');
            
        })
        .catch(function (error:undefined|any) {
            // 送信失敗時の処理
            alert('失敗しました。');
            console.log(error);
        });
    }


    //DB削除処理
    const deleteSubmit =(e:any)=>{
        e.preventDefault();
        
        //axios通信で渡すクエリパラメータ
        const params = {
            id: wordMean.id,
        }

        axios.post('/api/word_mean/delete', params).then(function (response: AxiosResponse<Response>) {
            // 送信成功時の処理
            reload();
            alert('削除しました');
            
        })
        .catch(function (error:undefined|any) {
            // 送信失敗時の処理
            alert('失敗しました。');
            console.log(error);
        });
    }



    return(
        <div className="flex h-8 mb-1" >
            <div className="flex w-full h-8 border border-gray-300 p-1 rounded">
                <SubMeanCategorySelect name="category_id" category_id={wordMean.category_id} onchange={handleInput}/>
                <input className="block w-full" type="text" name="word_mean" value={wordMean.word_mean} onChange={handleInput} />
            </div>
            
            <div className="flex">
                <button className="block w-12 h-8 ml-1 bg-amber-400 /px-2 text-white rounded" onClick={updateSubmit}>保存</button>
                <button className="block w-12 h-8 ml-1 bg-gray-400 px-2 text-white rounded" onClick={deleteSubmit}>削除</button>
            </div>
        </div>
    );
}