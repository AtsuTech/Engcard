import { FC } from "react";
import { useState, useRef} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { CategorySelect } from "./CategorySelect";
import { SubMeanCategorySelect } from "./SubMeanCategorySelect";
import { ButtonWithOnClick } from "./parts_component/ButtonWithOnClick";

export const CreateCard:FC<{id: any,Update: any}> = ({id,Update}) => {

    const initialCardState = {
        img_path: '',
        word: '',
        word_mean: '',
        sentence: '',
        sentence_mean: '',
    };

    const [card,setCard] = useState<any>(initialCardState);

    const [category_id,setCategory_id] = useState<any>(1);

    //フォーム入力項目をcardにセット
    const handleInput =(e:any)=>{
        e.persist();
        setCard({...card, [e.target.name]: e.target.value }); 
    }

    // サブの意味を配列で保管
    const [subWordMeans, setSubWordMeans] = useState<any>([
        //５まで登録可能
        { category_id:1, word_mean: '' },
        { category_id:1, word_mean: '' },
        { category_id:1, word_mean: '' },
        { category_id:1, word_mean: '' },
        { category_id:1, word_mean: '' },
    ]);
    const handleInputSub = (index: number, name: string, value: string) => {
        //元の配列をコピーして、それを編集するようにする
        const newSubWordMeans = [...subWordMeans];
        if (!newSubWordMeans[index]) {
            newSubWordMeans[index] = { category_id: '', word_mean: '' };
        }
        newSubWordMeans[index][name] = value;
        setSubWordMeans(newSubWordMeans);
    }
    //console.log(subWordMeans);

    const [defaultImg,setDefaultImg] = useState<string|null>();

    //フォームからの画像ファイルの処理
    const [files, setFile] = useState<any>(null);
    const fileInputRef= useRef<any>(null);

    const handleInputFile =(e:any)=>{
        setFile(e.target.files[0]);

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

    //セットした画像ファイルを消す関数
    const resetFileInput = () => {
        if (fileInputRef.current) {
          // fileのinput要素が存在していたらリセットする
          fileInputRef.current.value = null;
        }
        // stateをリセット(※フォームの削除だけだとstateに残ってしまうため必要)
        setFile(null);
        setDefaultImg(null);
      };

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

        params.append('sub_means',JSON.stringify(subWordMeans))
        
        //DBにデータ送る
        axios.post('/api/card/create', params).then(function (response: AxiosResponse<Response>) {

            // 送信成功時の処理 //

            //フォームをクリア
            setCard(initialCardState);
            setCategory_id(1);
            setFile(null);
            setDefaultImg(null);
            setSubWordMeans([
                { category_id:1, word_mean: '' },
                { category_id:1, word_mean: '' },
                { category_id:1, word_mean: '' },
                { category_id:1, word_mean: '' },
                { category_id:1, word_mean: '' },
            ]);
            Update();
            
        })
        .catch(function (error:undefined|any) {

            // 送信失敗時の処理
            alert('失敗しました。');
            console.log(error);
            
        });
        
    }

    return(
        <>
            
            <div className="w-full p-2 border border-gray-300 rounded-lg" >
                <h5 className="pb-3">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>単語カード作成</div>
                </h5>

                
                <div className="md:flex">

                    
                    <input type="text" 
                        name="word" 
                        className="w-full h-10 border border-gray-300 rounded-lg pl-2 mr-1" 
                        placeholder="単語 ex.)Apple" 
                        value={card.word}
                        onChange={handleInput} 
                        required
                    />

                    <div className="flex w-10 h-10 border border-gray-300 rounded-lg bg-cover bg-center"  style={{ backgroundImage: `url(${defaultImg})` }}>

                        <label htmlFor="example1" className="flex w-16 cursor-pointer appearance-none items-center justify-center rounded-md /bg-amber-400 text-white p-2 transition-all">
                            {defaultImg == null &&
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-300">
                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                </svg>
                            }
                        </label>
                         
                        {/* この中に余白いる */}
                        <input id="example1" 
                            type="file" 
                            accept="image/*" multiple
                            onChange={handleInputFile}
                            ref={fileInputRef}
                            className="block sr-only text-sm file:mr-4 file:rounded-md file:border-0 file:bg-yellow-500 file:py-2.5 file:p-2 file:text-sm file:font-semibold file:text-white hover:file:bg-yellow-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                        />

                    </div>

                    {defaultImg != null &&
                    <div>
                        <button onClick={resetFileInput} className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="/text-2xl text-white w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    }



                    <div className="flex w-full h-10 p-1 border border-gray-300 rounded-lg md:ml-1">
                        <CategorySelect name="category_id" value={category_id} handleInput={setCategory_id} />

                        <input type="text" 
                            name="word_mean" 
                            className="block w-full h-full pl-2" 
                            placeholder="訳 ex.)りんご" 
                            value={card.word_mean}
                            onChange={handleInput} 
                            required
                        />
                    </div>

                </div> 

                <div>
                    <a href="" className="text-cyan-500 m-1">例文を追加</a>
                    <a href="" className="text-cyan-500 m-1">外部リンクを追加</a>
                </div>

                <div className="md:flex">
                    <textarea 
                        name="sentence" 
                        rows={5} 
                        className="w-full p-2 border border-gray-300 rounded-lg mr-1" 
                        onChange={handleInput} 
                        value={card.sentence}
                        placeholder="例文:Apple is red and delicious fruits.">
                    </textarea>

                    <textarea 
                        name="sentence_mean" 
                        rows={5} 
                        className="w-full p-2 border border-gray-300 rounded-lg" 
                        onChange={handleInput} 
                        value={card.sentence_mean}
                        placeholder="例文(訳):りんごは赤くて美味しい果物です。">
                    </textarea>
                </div> 

                <div>
                    <h4>サブの意味を追加</h4>
                     
                    {subWordMeans.map((dummy:any,index:any) => (
                        <div className="flex w-full h-10 p-1 border border-gray-300 rounded-lg mt-2">
                            <SubMeanCategorySelect name={`word_mean[${index}][category_id]`} value={subWordMeans[index].category_id} onchange={(e:any) => handleInputSub(index, 'category_id', e.target.value)}/>
                            <input type="text"
                                name={`word_mean[${index}][word_mean]`}
                                value={subWordMeans[index].word_mean}
                                className="w-full"
                                placeholder="ワード"
                                onChange={(e) => handleInputSub(index, 'word_mean', e.target.value)}
                                required
                            />
                        </div>
                    ))} 


                </div>

                <div className="mt-10">
                    <ButtonWithOnClick color={'yellow'} text={'カード追加'} onclick={CreateSubmit} />
                </div>

            </div>
            
        </>
    );
}