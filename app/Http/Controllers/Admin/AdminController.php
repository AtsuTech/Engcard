<?php

// Adminディレクトリをnamespaceに追加
namespace App\Http\Controllers\Admin;

// 以下を追加
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    //
    public function index(){
        return response()->json(['admin' => true]);
    }
}
