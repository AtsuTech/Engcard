<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Authファサードを読み込む
use App\Models\User;//登録ユーザーのDBを使用
use Illuminate\Support\Facades\Storage;//ストレージ操作

class UserUnscribeController extends Controller
{
    //
    public function unscribe(){

        //プロフィール画像削除
        $me = User::find(Auth::id());
        Storage::disk('public')->delete('images/profile/' . $me->profile_icon_img);

        //カード画像をフォルダごと削除
        $directory = 'public/images/card/' . Auth::id();
        Storage::deleteDirectory($directory);

        $me = User::find(Auth::id())->delete();
    } 
}
