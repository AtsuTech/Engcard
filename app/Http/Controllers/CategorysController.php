<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategorysController extends Controller
{
    //
    public function list(){
        $part_of_speeches = Category::all();
        return response()->json($part_of_speeches);
    }
}
