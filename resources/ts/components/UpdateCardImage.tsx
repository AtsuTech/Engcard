import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { ButtonWithOnClick } from "./parts_component/ButtonWithOnClick";


export const UpdateCardImage:FC<{id: any}> = ({id}) =>{

    const [img_flg,setImgFlg] = useState<boolean>(false);
    const [formImageFile,setFormImageFile] = useState<any>();
    const [cardImg,setCardImg] = useState<any>();
    const [defaultImg,setDefaultImg] = useState<string>();
    const [card_id,setCardId] = useState<any>();


    //現在画像の画像ファイル名取得
    useEffect(()=>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.get('/api/card/' + id).then((response) => { 
            setCardImg(response.data.img_path);
            setDefaultImg('/storage/images/card/'+ response.data.user_id + '/' + response.data.flashcard_id + '/' + response.data.img_path);
            setCardId(response.data.id);
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
            setImgFlg(true)
            
        }
    }


    //データ更新送信処置
    const Edit =(e:any)=>{
        e.preventDefault();
        
        //axios通信で渡すクエリパラメータ
        const params = new FormData();
        params.append('card_id',card_id);
        params.append('image',formImageFile);

        
        //DBにデータ送る
        axios.post('/api/card/update/image', params).then(function (response: AxiosResponse<Response>) {

            // 送信成功時の処理
            alert('保存しました');
            //setCardImg(true);
            
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
        params.append('card_id',card_id);
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
        <div className="border border-gray-200 bg-white rounded-lg p-3 flex items-center justify-center">

            {/* <h5 className="text-2xl">画像</h5> */}
            {cardImg == null ?
                <>
                    <div className="">

                        <div>
                            <label htmlFor="img" className="flex w-32 ml-auto mr-auto cursor-pointer appearance-none items-center justify-center rounded-full text-amber-400 border border-amber-400 p-2 transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-amber-300">
                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                    </svg>
                                <span>選択</span>
                            </label> 

                            {img_flg &&
                                <div className="w-64 h-32 relative mt-2 mb-2">
                                    <img src={defaultImg} alt="" className="absolute inset-0 w-full h-full object-cover rounded-lg border border-amber-400" />
                                </div>
                            }

                        </div>

                         
                        <input 
                            id="img" 
                            type="file" 
                            accept="image/*" multiple
                            onChange={handleInputFile}
                            //ref={defaultImg}
                            className="block sr-only w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-yellow-500 file:py-2.5 file:p-2 file:text-sm file:font-semibold file:text-white hover:file:bg-yellow-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                        />

                        {img_flg && 
                            <ButtonWithOnClick text="保存" color="yellow" onclick={Edit} />
                        }
                    </div>

                </>
                :
                <>
                    <div className="relative">

                        <div className="relative w-64 h-32 bg-black bg-opacity-50 border border-amber-400 rounded-lg z-10 flex items-center justify-center">
                            <button 
                                className="w-10 h-10 bg-gray-500 text-white px-2.5 rounded-md mr-3"
                                onClick={Delete}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {/* <input accept="image/*" multiple type="file" onChange={handleInputFile} />  */}
                            <label htmlFor="img" className="flex w-10 cursor-pointer appearance-none items-center justify-center rounded-md text-white bg-amber-400 p-2 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 /text-gray-300">
                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                </svg>
                            </label>
                            
                            <input 
                                id="img" 
                                type="file" 
                                accept="image/*" multiple
                                onChange={handleInputFile}
                                className="block sr-only w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-yellow-500 file:py-2.5 file:p-2 file:text-sm file:font-semibold file:text-white hover:file:bg-yellow-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                            />
                        </div>


                        <img src={defaultImg} alt="Image" className="absolute inset-0 w-64 h-32 object-cover rounded-lg border border-amber-400 " /> 
                        {img_flg && 
                            <ButtonWithOnClick text="画像を変更する" color="yellow" onclick={Edit} />
                        }
                    </div>


                    
                </>

            }
            
        </div>
    );
}