<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Advertisement;

class AdvertisementController extends Controller
{
    //データ一覧取得
    public function index(){
        $advertisements = Advertisement::all();
        return response()->json($advertisements);
    }

    //新規作成
    public function create(Request $request){
        $input = $request->all();
        Advertisement::create($input);
    }

    //
    public function update(Request $request){
        $advertisement = Advertisement::find($request->id);
        $advertisement->name = $request->name;
        $advertisement->html_code = $request->html_code;
        $advertisement->active = $request->active;
        $advertisement->save();
    }


}
