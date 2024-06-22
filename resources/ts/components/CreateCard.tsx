import { FC } from "react";
import { useState, useRef, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { CategorySelect } from "./CategorySelect";
import { SubMeanCategorySelect } from "./SubMeanCategorySelect";
import { ButtonWithOnClick } from "./parts_component/ButtonWithOnClick";
import { CategoryContext } from "./CategoryContext"; //カテゴリのデータをコンテキストで渡す

export const CreateCard:FC<{id: any,Update: any}> = ({id,Update}) => {

    const modal = document.getElementById("modal") as any;

    const openModal =() =>{
        modal.showModal();
    }
    const closeModal =() =>{
        modal.close();
    }

    //サブに意味入力の表示切り替え
    const [editSubMeans,setEditSubMeans] = useState(false);
    const EditSubMeans = () => setEditSubMeans(!editSubMeans);

    const initialCardState = {
        img_path: '',
        word: '',
        word_mean: '',
        sentence: '',
        sentence_mean: '',
        link: '',
    };

    const [card,setCard] = useState<any>(initialCardState);

    const [category_id,setCategory_id] = useState<any>(1);

    //フォーム入力項目をcardにセット
    const handleInput =(e:any)=>{
        e.persist();
        setCard({...card, [e.target.name]: e.target.value }); 
    }

    //カテゴリデータをapi取得、更新の関数
    const [reloadCategory,setReloadCategory] = useState<boolean>(false);
    const SetReloadCategory = () => setReloadCategory(!reloadCategory);
    const [categories,setCategory] = useState<any>([]);
    useEffect(()=>{

        //DB通信でデータ取得
        axios.get('/api/categories').then((response) => { 
            setCategory(response.data);
        }).catch((error) => { 
            console.log(error);
        });
    
    },[reloadCategory]);

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
        params.append('link',card.link);
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
            modal.close();
        })
        .catch(function (error:undefined|any) {

            // 送信失敗時の処理
            alert('失敗しました。');
            console.log(error);
            
        });
        
    }

    return(
        <>
            <button className="flex w-full p-3 bg-amber-400 text-white rounded-full" onClick={openModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                </svg>
                <p className="w-full text-center">カードを追加</p>
            </button>

            <dialog className="md:w-3/5 w-full /m-0 p-2 border border-gray-300 rounded-lg" id="modal">

                <div className="relative py-4">
                    <div className="text-center font-bold text-slate-700">単語カード作成</div>

                    <button className="absolute top-1 right-1" onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                
                <div className="md:flex mb-1">

                    {/* 英単語+画像 */}
                    <div className="flex w-full p-1 h-10 border border-gray-300 rounded-lg mr-1 mb-1 md:mb-0 focus-within:border-amber-400">
                    
                        <input type="text" 
                            name="word" 
                            className="w-full pl-2 mr-1 outline-transparent" 
                            placeholder="単語 ex.)Apple" 
                            value={card.word}
                            onChange={handleInput} 
                            required
                        />

                        <div className="flex w-8 h-full border border-gray-300 rounded-lg bg-cover bg-center"  style={{ backgroundImage: `url(${defaultImg})` }}>

                            <label htmlFor="example1" className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md /bg-amber-400 text-white /p-2 transition-all">
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
                            <button onClick={resetFileInput} className="flex items-center justify-center w-7 h-full bg-gray-300 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="/text-2xl text-white w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        }

                    </div>

                    {/* 英単語の意味＋カテゴリ */}
                    <div className="flex w-full h-10 p-1 border border-gray-300 rounded-lg focus-within:border-amber-400">

                        {/* コンテキストからカテゴリのデータと更新の関数渡す */}
                        <CategoryContext.Provider value={{categories,SetReloadCategory}}>
                            <CategorySelect name="category_id" category_id={category_id} handleInput={setCategory_id} />
                        </CategoryContext.Provider>

                        <input type="text" 
                            name="word_mean" 
                            className="block w-full h-full pl-2 ml-1 outline-transparent" 
                            placeholder="訳 ex.)りんご" 
                            value={card.word_mean}
                            onChange={handleInput} 
                            required
                        />
                    </div>

                </div> 

                {/* サブの意味 */}
                <button className="flex text-amber-400 py-2" onClick={EditSubMeans}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 w-6 h-6">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                    </svg>
                    サブの意味を追加する
                </button>
                {editSubMeans&&
                    <div className="border border-gray-300 rounded-lg px-1 mb-2">
                        {/* コンテキストからカテゴリのデータと更新の関数渡す */}
                        <CategoryContext.Provider value={{categories,SetReloadCategory}}>
                        {subWordMeans.map((dummy:any,index:any) => (
                            <div className="flex w-full h-10 p-1 border border-gray-300 rounded-lg my-1" key={'#' + index}>
                                
                                    <SubMeanCategorySelect name={`word_mean[${index}][category_id]`} category_id={subWordMeans[index].category_id} onchange={(e:any) => handleInputSub(index, 'category_id', e.target.value)}/>
                                
                                <input type="text"
                                    name={`word_mean[${index}][word_mean]`}
                                    value={subWordMeans[index].word_mean}
                                    className="w-full ml-1"
                                    placeholder="サブの意味"
                                    onChange={(e) => handleInputSub(index, 'word_mean', e.target.value)}
                                    required
                                />
                            </div>
                        ))} 
                        </CategoryContext.Provider>

                    </div>
                }

                <div className="md:flex md:mb-1">
                    <textarea 
                        name="sentence" 
                        rows={3} 
                        className="w-full p-2 border border-gray-300 rounded-lg md:mr-1" 
                        onChange={handleInput} 
                        value={card.sentence}
                        placeholder="例文:Apple is red and delicious fruits.">
                    </textarea>

                    <textarea 
                        name="sentence_mean" 
                        rows={3} 
                        className="w-full p-2 border border-gray-300 rounded-lg" 
                        onChange={handleInput} 
                        value={card.sentence_mean}
                        placeholder="例文(訳):りんごは赤くて美味しい果物です。">
                    </textarea>
                </div> 

                <input type="text" 
                        name="link" 
                        className="w-full h-10 border border-gray-300 rounded-lg pl-2" 
                        placeholder="サイトのULR ex.)eng-card.com" 
                        value={card.link}
                        onChange={handleInput} 
                        required
                />



                <div className="flex mt-2">
                    <div className="w-full mr-1">
                        <ButtonWithOnClick color={'gray'} text={'キャンセル'} onclick={closeModal} />
                    </div>
                    <div className="w-full ml-1">
                        <ButtonWithOnClick color={'yellow'} text={'カード追加'} onclick={CreateSubmit} />
                    </div>
                </div>

            </dialog>
            
        </>
    );
}