import { FC } from "react";
import { Link } from 'react-router-dom';
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { useState, useEffect, useContext } from "react";

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


    if (canvas_inner) {
        
        ctx_inner = canvas_inner.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
        canvas_inner.width = 300;
        canvas_inner.height = 300;
        ctx_inner.fillStyle = "#fff";
        ctx_inner.fillRect(0,0,canvas_inner.width,canvas_inner.height);
    
        //マウスドラック開始検知
        canvas_inner.addEventListener('mousedown', ()=> {
            canvas_inner.addEventListener('mousemove',Move);
        });

        //マウスドラック終了検知
        canvas_inner.addEventListener('mouseup',()=> {
            canvas_inner.removeEventListener('mousemove',Move);
        });

    }

    if(canvas_outer){
        ctx_outer = canvas_outer.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
        canvas_outer.width = 300;
        canvas_outer.height = 300;
    }


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

    function canvasOuterDraw(){
        var image: ImageData = ctx_inner.getImageData(0, 0, 300, 300);
        ctx_outer.putImageData(image, 0, 0);
    }


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
        request.open('POST', '/api/user/profile/image/create');
        request.send(formData);
    }

  


    return(
        <div className="w-80 p-2 border border-gray-300">
            <h1>プロフィール画像</h1>
            <input type="file" name="file" id="file" className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-yellow-500 file:py-2.5 file:p-2 file:text-sm file:font-semibold file:text-white hover:file:bg-yellow-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"></input>

            <div className="relative block mt-10">
                <canvas id="canvas-outer" className=""></canvas>
                <canvas id="canvas-inner" className="rounded-full absolute top-0"></canvas>
            </div>

            <input type="range" name="scale" min="300" max="1200" className="w-full" onInput={(e) => Zoom(e)}/> 
            <button className="block bg-amber-400 w-full h-10 text-white ml-auto mr-auto rounded-lg shadow-lg font-medium text-1xl" onClick={Upload}>画像アップロード</button>

        </div>
    );
}

