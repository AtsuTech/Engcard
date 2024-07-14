<?php

// Adminディレクトリをnamespaceに追加
namespace App\Http\Controllers\Admin;

// 以下を追加
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    //権限ユーザーのチェック
    public function index(){
        return response()->json(['admin' => true]);
    }

    public function user_list(){
        $users = User::all();
        return response()->json($users);
    }
}
