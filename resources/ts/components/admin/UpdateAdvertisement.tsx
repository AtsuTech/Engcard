import { FC } from "react";
import { useState, useRef} from "react";
import axios from 'axios';
import { CloseButton } from "../parts_component/CloseButton";


interface Advertisement {
    id: number,
    name: string,
    html_code: any,
    active: number,
}

export const UpdateAdvertisements:FC<Advertisement> =({
    id,
    name,
    html_code,
    active,
})=>{

    const dialogRef =  useRef<HTMLDialogElement>(null);
    const openModal = () => dialogRef.current?.showModal();
    const closeModal = () => dialogRef.current?.close();


    //送信データ


    //送信データ
    const [advertisement,setAdvertisement] = useState<Advertisement>({
        id: id,
        name: name,
        html_code: html_code,
        active: active,
    })


    const handleInput = (e:any) => {

        //イベントハンドラが実行された後にオブジェクトのプロパティにアクセスする必要がある場合は、e.persist() を呼ぶ必要がある
        e.persist();

        setAdvertisement({...advertisement, [e.target.name]: e.target.value });
    }


    const Create = (e :any) =>{

        //フォームデータ送信時に画面を再更新しないようにする処理
        e.preventDefault();

        // axiosで送るデータを定義
        const params = {
            id: advertisement.id,
            name: advertisement.name,
            html_code: advertisement.html_code,
            active: advertisement.active,
        }

        //データ送信
        axios.post('/api/advertisement/update', params).then(function (response) {

            // --------送信成功時の処理-------- //
            alert('保存しました');
            
        })
        .catch(function (error) {
        
            // --------送信失敗時の処理-------- //
            alert(error);
            console.log(error);

        });

    }




    return(
        <>
            <button className="block bg-cyan-600 text-white px-2 /py-2 /ml-auto rounded-full" onClick={openModal}>
                編集
            </button>

            <dialog ref={dialogRef} className="rounded-lg text-slate-700">

                <div className="w-full">
                    <div className="ml-auto w-fit p-2">
                        <CloseButton onClick={closeModal} />
                    </div>
                </div>

                <h1 className="text-2xl text-center py-1">編集{id}</h1>

                <p>{advertisement.active}</p>

                <form className="w-96 bg-white p-2 rounded-md">

                    <div>
                        <label htmlFor="name">広告名</label>
                        <input 
                            id="name"
                            type="text"
                            name="name"
                            value={advertisement.name}
                            onChange={handleInput}
                            className="block w-full border border-slate-400 pl-2 py-1 rounded-md"
                            placeholder=""
                        />                    
                    </div>

                    <div className="mt-2">
                        <label htmlFor="html_code">広告リンク(html)</label>
                        <textarea 
                            id="html_code"
                            name="html_code" 
                            value={advertisement.html_code} 
                            onChange={handleInput}
                            className="block w-full border border-slate-400 pl-2 py-1 rounded-md"
                            cols={30} 
                            rows={10}>
                        </textarea>                    
                    </div>

                    <div className="mt-2">
                        <select name="active" id="" className="block w-full border border-slate-400 rounded-md" onChange={handleInput}>
                            <option value={0} selected={0 === active}>非公開</option>
                            <option value={1} selected={1 === active}>公開</option>
                        </select>                    
                    </div>

                    <div className="w-full mt-2">
                        <button className="block bg-stone-700 text-white px-5 py-2 ml-auto rounded-full" onClick={Create}>追加</button>
                    </div>

                </form>
            </dialog>        
        </>

    )
}