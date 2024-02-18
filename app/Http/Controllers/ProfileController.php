<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;//登録ユーザーのDBを使用
use Illuminate\Support\Facades\Auth; // Authファサードを読み込む

class ProfileController extends Controller
{
    //ユーザー情報取得
    public function get_user($personal_id){
        //固有IDで検索
        $user = User::with('following')->with('followed')->where('personal_id','=',$personal_id)->first();
        return response()->json($user);
    }


    //ダッシュボードで自身アカウント情報取得
    public function get_me(){
        $me = User::with('following')->with('followed')->where('id','=',Auth::id())->first();
        return response()->json($me);
    }
}
