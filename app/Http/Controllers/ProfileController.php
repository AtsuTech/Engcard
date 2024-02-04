<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;//登録ユーザーのDBを使用

class ProfileController extends Controller
{
    //ユーザー情報取得
    public function get_user($user_id){
        $user = User::with('following')->with('followed')->findOrFail($user_id);
        return response()->json($user);
    }
}
