<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Authファサードを読み込む
use App\Models\User;//登録ユーザーのDBを使用
use Illuminate\Support\Facades\Storage;//ストレージ操作

class UserProfileImgController extends Controller
{

    //プロフィール画像取得
    public function get_my_image(){
        //$me = User::find(Auth::id());
        $img = User::where('id',Auth::id())->pluck('profile_icon_img');
        
        //return response()->json($me->profile_icon_img);
        return response()->json($img);
    }


    //プロフィール画像アップロード処理
    public function upload_img(Request $request){

        $me = User::find(Auth::id());

        if($me->profile_icon_img == null || $me->profile_icon_img == ''){
            $image = $request->file('image');
            if($image != null){
                $path = $image->store('public/images/profile');
                //reactからアクセスできるように権限付与
                $fullPath = Storage::path($path);//storageのフルパスを取得
                chmod($fullPath, 0755);
                $me->profile_icon_img = basename($path);
            }elseif($image == null){
                $me->profile_icon_img = null;
            }
            $me->save();
        }elseif($me->profile_icon_img != null || $me->profile_icon_img != ''){
            Storage::disk('public')->delete('images/profile/' . $me->profile_icon_img);
            $image = $request->file('image');
            $path = $image->store('public/images/profile');
            //reactからアクセスできるように権限付与
            $fullPath = Storage::path($path);//storageのフルパスを取得
            chmod($fullPath, 0755);
            $me->profile_icon_img = basename($path);
            $me->save();
        }

    }

    ///プロフィール画像削除
    public function delete_img(Request $request){

        $me = User::find(Auth::id());

        //画像が設定してある場合ののみ処理を実行する
        if($me->profile_icon_img != null || $me->profile_icon_img != ''){
            //画像ファイル削除
            Storage::disk('public')->delete('/images/profile/' .  $me->profile_icon_img);

            //画像ファイル名をnullにする
            $me->profile_icon_img = null;
            $me->save();            
        }

    }
}
