<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Access;

class AccessController extends Controller
{
    //
    function list(){
        $accesses = Access::all();
        return response()->json($accesses);
    }
}
