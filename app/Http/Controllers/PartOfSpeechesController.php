<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PartOfSpeech;

class PartOfSpeechesController extends Controller
{
    //
    public function list(){
        $part_of_speeches = PartOfSpeech::all();
        return response()->json($part_of_speeches);
    }

}
