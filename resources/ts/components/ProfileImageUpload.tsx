import { FC } from "react";
import { Link } from 'react-router-dom';
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { useState, useEffect, useContext } from "react";
import { ButtonWithOnClick } from "./parts_component/ButtonWithOnClick";

export const ProfileImageUpload:FC = () => {


    // 変数定義
    var file = document.getElementById("file") as HTMLElement;
    const canvas_inner = document.getElementById("canvas-inner") as HTMLCanvasElement;
    const canvas_outer = document.getElementById("canvas-outer") as HTMLCanvasElement;
    var ctx_inner : any;
    var ctx_outer : any;
    var uploadImgSrc:any;
    var aspect:any;
    var x:number;
    var y:number;
    var w:number;
    var h:number;
    const modal = document.getElementById("modal") as any;


    if (canvas_inner) {

        ctx_inner = canvas_inner.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
        canvas_inner.width = 300;
        canvas_inner.height = 300;
        ctx_inner.fillStyle = "#fff";
        ctx_inner.fillRect(0,0,canvas_inner.width,canvas_inner.height);

    }

    if(canvas_outer){
        ctx_outer = canvas_outer.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
        canvas_outer.width = 300;
        canvas_outer.height = 300;
    }

    //フィルタ(半透明黒)を描画
    let filter =()=> {
        if(ctx_outer){
            ctx_outer.globalAlpha = 0.8;
            ctx_outer.fillStyle = "#000";
            ctx_outer.fillRect(0,0,300,300);
        }

    }
    filter();


    //ファイルアップロード
    function loadLocalImage(e:any) {

        // ファイル情報を取得
        var fileData = e.target.files[0];
  
        // 画像ファイル以外は処理を止める
        if(!fileData.type.match('image.*')) {
          alert('画像を選択してください');
          return;
        }

        // FileReaderオブジェクトを使ってファイル読み込み
        var reader = new FileReader();
        // ファイル読み込みに成功したときの処理
        reader.onload = function() {
            // ファイルの読み込み結果を"uploadImgSrc"に格納
            uploadImgSrc = reader.result;
            canvasInnerDraw();
        }
        // ファイル読み込みを実行
        reader.readAsDataURL(fileData);
        modal.showModal();
    }

    // ファイルが指定された時にloadLocalImage()を実行
    if(file){
        file.addEventListener('change', loadLocalImage, false);
    }

    // Canvas上に画像を表示する
    function canvasInnerDraw() {
        
        // canvas内の要素をクリアする
        ctx_inner.clearRect(0, 0, canvas_inner.width, canvas_inner.height);
  
        // Canvas上に画像を表示
        var img = new Image();
        img.src = uploadImgSrc;

        
        //画像の縦長or横長の判別
        if(img.width > img.height){
            aspect = img.height/img.width;
            w = canvas_inner.width;
            h = canvas_inner.width*aspect;
            x = (canvas_inner.width/2)-(w/2);
            y = (canvas_inner.height/2)-(h/2);
        }else if(img.width < img.height){
            aspect = img.width/img.height;
            w = canvas_inner.height*aspect;
            h = canvas_inner.height
            x = (canvas_inner.width/2)-(w/2);
            y = (canvas_inner.height/2)-(h/2);
        }else if(img.width == img.height){
            w = canvas_inner.width;
            h = w;
            x = (canvas_inner.width/2)-(w/2);
            y = (canvas_inner.height/2)-(h/2);
        }
  
  
        img.onload = function() {
            ctx_inner.fillStyle = "#fff";
            ctx_inner.fillRect(0,0,300,300);
            ctx_inner.drawImage(img,x,y,w,h);
            canvasOuterDraw();
            filter();
        }
  
    }

    //切り取り外側部分を複製で表現
    function canvasOuterDraw(){
        var image: ImageData = ctx_inner.getImageData(0, 0, 300, 300);
        ctx_outer.putImageData(image, 0, 0);
    }

    //マウスドラック開始検知
    const MouseDown = (event:any) => {
        canvas_inner.addEventListener("mousemove", Move); 
    };

    //マウスドラック終了検知
    const MouseUp = (event:any) => {
        canvas_inner.removeEventListener("mousemove", Move); 
    };


    //画像の移動
    var Move = (e:any) => {                             

        //eにはイベントの情報が入る
        //位置の設定
        let rect = e.target.getBoundingClientRect();
        if(w != 300){
            x = e.clientX - rect.left -(w/2);
        }
        if(h != 300){
            y = e.clientY - rect.top -(h/2);
        }

        // Canvas上に画像を表示
        var img = new Image();
        img.src = uploadImgSrc;
        img.onload = function() {
          // canvas内の要素をクリアする
          ctx_inner.clearRect(0, 0, canvas_inner.width, canvas_inner.height);
  
          //書き換え
          ctx_inner.fillStyle = "#fff";
          ctx_inner.fillRect(0,0,300,300);
          ctx_inner.drawImage(img,x,y,w,h);
          canvasOuterDraw();
          filter();
        
        }
  
    }

    //画像拡大
    let Zoom =(e: any) =>{
      
        //inputスケールから値(倍率取得)
        let scale:any = document.querySelector(`input[type='range'][name='scale']`);
  
        //画像の幅と高さを変更
        if(w>h){
          w = scale.value;
          h = scale.value*aspect;
        }else if(w<h){
          w = scale.value*aspect;
          h = scale.value;
        }else if(w==h){
            w = scale.value;
            h = w;
        }
       
        x = (canvas_inner.width/2)-(w/2);
        y = (canvas_inner.height/2)-(h/2);
  
  
        // Canvas上に画像を表示
        var img = new Image();
        img.src = uploadImgSrc;
        img.onload = function() {
          // canvas内の要素をクリアする
          ctx_inner.clearRect(0, 0, canvas_inner.width, canvas_inner.height);
  
          //書き換え
          ctx_inner.fillStyle = "#fff";
          ctx_inner.fillRect(0,0,300,300);
          ctx_inner.drawImage(img,x,y,w,h);
          canvasOuterDraw();
          filter();
        }
  
    }


    //サーバにアップ
    let Upload =()=>{

        
        const url = canvas_inner.toDataURL("image/png");
        const bin = atob(url.split(",")[1]);
        const buffer = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) {
            buffer[i] = bin.charCodeAt(i);
        }
        const blob = new Blob([buffer.buffer], {type: "image/png"});

        var formData = new FormData();
        formData.append('image', blob, 'image.jpg');
        var request = new XMLHttpRequest();
        request.open('POST', '/api/user/profile/image/upload');
        request.send(formData);
        modal.close();
        alert("画像を更新しました");
    }

  
    const Cancel =()=>{
        var file = document.getElementById('file') as any;
        file.value = '';
        ctx_inner.fillRect(0,0,300,300);
        ctx_outer.fillRect(0,0,300,300);
        modal.close();
    }


    return(
        <div>
            
            <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md bg-slate-800 text-white p-2 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
                <div>ファイルを開く</div>
                <input type="file" name="file" id="file" accept="image/*" className="sr-only block w-full"></input>
            </label>

            <dialog className="w-fit rounded-2xl" id="modal">
                <header className="w-full h-20 flex items-center justify-center">
                    <h1 className="text-slate-600 text-1xl">プロフィール画像を設定</h1>
                </header>
                
                <div className="relative block">
                    <canvas id="canvas-outer" className=""></canvas>
                    <canvas id="canvas-inner" 
                            className="rounded-full absolute top-0 cursor-move" 
                            onMouseDown={MouseDown} 
                            onMouseUp={MouseUp}>
                    </canvas>
                </div>

                <div className="w-full h-20 flex items-center justify-center">
                    <label className="w-full text-center text-sm" htmlFor="">元サイズ</label>
                    <input type="range" name="scale" min="300" max="1200" className="w-full" onInput={(e) => Zoom(e)}/> 
                    <label className="w-full text-center text-sm" htmlFor="">拡大</label>
                </div>

                <div className="flex">
                    <div className="p-3 w-full">
                        <ButtonWithOnClick color="gray" text="キャンセル" onclick={Cancel} />
                    </div>
                    <div className="p-3 w-full">
                        <ButtonWithOnClick color="yellow" text="設定" onclick={Upload} />
                    </div>
                </div>
            </dialog>

        </div>
    );
}

