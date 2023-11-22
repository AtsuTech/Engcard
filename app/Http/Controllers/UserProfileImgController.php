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
        $me = User::find(Auth::id());
        return response()->json($me->profile_icon_img);
    }


    //プロフィール画像アップロード処理
    public function upload_img(Request $request){

        $me = User::find(Auth::id());

        if($me->profile_icon_img == null || $me->profile_icon_img == ''){
            $image = $request->file('image');
            if($image != null){
                $path = $image->store('public/images/profile');
                $me->profile_icon_img = basename($path);
            }elseif($image == null){
                $me->profile_icon_img = null;
            }
            $me->save();
        }elseif($me->profile_icon_img != null || $me->profile_icon_img != ''){
            Storage::disk('public')->delete('images/profile/' . $me->profile_icon_img);
            $image = $request->file('image');
            $path = $image->store('public/images/profile');
            $me->profile_icon_img = basename($path);
            $me->save();
        }

    }
}
