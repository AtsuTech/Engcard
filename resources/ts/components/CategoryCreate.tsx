import { FC } from "react";
import { useState, useEffect, useContext} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { CategoryContext } from "./CategoryContext";//コンテキスト読み込み


export const CategoryCreate:FC = () => {

    //コンテキストから使いたい関数を取得
    const {SetReloadCategory} = useContext<any>(CategoryContext);


    const [category,setCategory] = useState<string>('');

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) =>{
        e.persist();
        setCategory(e.target.value);
    }

    const Submit = (e:any) =>{

        
        e.preventDefault();

        const params = {
            item:category,
        }

        axios.post('/api/categories/create', params).then(function (response: AxiosResponse<Response>) {

            // 送信成功時の処理
            
            //Update();
            SetReloadCategory();

        })
        .catch(function (error) {
        
            // --------送信失敗時の処理-------- //
            alert(error);
            console.log(error);

        });
        setCategory('');

    }



    return(
        <div className="flex p-1">
                <input type="text" className="w-full h-10 border border-gray-300 rounded pl-1 text-xs" placeholder="新しいカテゴリ" 
                    name="item"
                    value={category}
                    onChange={handleInput} 
                    required
                />
                
                <button type="submit" className="w-20 font-medium text-1xl text-yellow-500" onClick={Submit}>追加</button>
        </div>
    );
}