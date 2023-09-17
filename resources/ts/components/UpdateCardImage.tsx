import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';


export const UpdateCardImage:FC<{id: any}> = ({id}) =>{

    const [formImageFile,setFormImageFile] = useState<any>();
    const [cardImg,setCardImg] = useState<any>();
    const [defaultImg,setDefaultImg] = useState<string>();


    //現在画像の画像ファイル名取得
    useEffect(()=>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.get('/api/card/' + id).then((response) => { 
            setCardImg(response.data.img_path);
            setDefaultImg('/storage/images/' + response.data.img_path);
        }).catch((error) => { 
            console.log(error);
        });
    },[]);


    const handleInputFile=(e:any)=>{
        setFormImageFile(e.target.files[0]);

        //サムネイル画像の設定処理
        if(e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onload = (e: any) => {
                //フォームからの画像のパスを取得
                setDefaultImg(e.target.result);
            }
            reader.readAsDataURL(file);
        }
    }


    //データ更新送信処置
    const Edit =(e:any)=>{
        e.preventDefault();
        
        //axios通信で渡すクエリパラメータ
        const params = new FormData();
        params.append('card_id',id);
        params.append('image',formImageFile);

        
        //DBにデータ送る
        axios.post('/api/card/update/image', params).then(function (response: AxiosResponse<Response>) {

            // 送信成功時の処理
            alert('保存しました');
            
        })
        .catch(function (error:undefined|any) {

            // 送信失敗時の処理
            alert('失敗しました。');
            console.log(error);
            
        });
    }

    //画像削除処置
    const Delete =(e:any)=>{
        //axios通信で渡すクエリパラメータ
        const params = new FormData();
        params.append('card_id',id);
        params.append('img_path',cardImg);
        

        //DBにデータ送る
        axios.post('/api/card/update/image/delete', params).then(function (response: AxiosResponse<Response>) {

            // 送信成功時の処理
            alert('画像を削除しました');
            
        })
        .catch(function (error:undefined|any) {

            // 送信失敗時の処理
            alert('失敗しました。');
            console.log(error);
            
        });

    }

    return(
        <section className="border border-amber-200 bg-white rounded-lg mt-5 mb-5 p-3">

            <h5 className="text-2xl">画像の設定</h5>
            {cardImg == null ?
                <>
                    <div>画像は設定されていません</div>
                    <img src={defaultImg} alt="" width={200} />
                    <input accept="image/*" multiple type="file" onChange={handleInputFile} /> 
                    <button onClick={Edit}>画像を設定する</button>
                </>
                :
                <>
                    <small>現在画像:{cardImg}</small>
                    <div onClick={Delete}>画像を削除</div>
                    <img src={defaultImg} alt="" width={200} />
                    <input accept="image/*" multiple type="file" onChange={handleInputFile} /> 
                    <button onClick={Edit}>画像を更新</button>
                </>

            }
            
        </section>
    );
}