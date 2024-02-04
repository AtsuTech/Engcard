<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Follow;//Followモデルをインポート
use Illuminate\Support\Facades\Auth; // Authファサードを読み込む

class FollowController extends Controller
{
    //フォローしているかどうかの状態確認
    public function check_following($id){

        //自分がフォローしているかどうか検索
        $check = Follow::where('following', Auth::id() )->where('followed', $id);

        if($check->count() == 0):
            //フォローしている場合
            return response()->json(['status' => false]);
        elseif($check->count() != 0):
            //まだフォローしていない場合
            return response()->json(['status' => true]); 
        endif;

    }

    //フォローする(中間テーブルをインサート)
    public function following(Request $request){

        //自分がフォローしているかどうか検索
        $check = Follow::where('following', Auth::id())->where('followed', $request->user_id);

        //検索結果が0(まだフォローしていない)場合のみフォローする
        if($check->count() == 0):
            $follow = new Follow;
            $follow->following = Auth::id();
            $follow->followed = $request->user_id;
            $follow->save();
        endif;

    }


    //フォローを外す
    public function unfollowing(Request $request){

        //削除対象のレコードを検索して削除
        $unfollowing = Follow::where('following', Auth::id())->where('followed', $request->user_id)->delete();


    }
}
