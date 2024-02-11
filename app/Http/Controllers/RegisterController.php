<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Str;//ランダム文字列を生成

class RegisterController extends Controller
{
    //
    public function register(Request $request){
        $validator = Validator::make($request->only(["name", "email", "password", "password_confirmation"]), [
            'name' => 'required|max:10|unique:users',
            'email' => 'required|email|unique:users|max:50',
            'password' => 'required|confirmed|string|min:6|max:30',
            // 'personal_id' => 'min:6|max:15|unique:users|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // $hashids = new Hashids('', 10); 
        // $personal_id = $hashids->encode($request->email); 
        $personal_id = Str::random(15); 
        $check = User::where('personal_id','=',$personal_id)->get();

        /*personal_idが既に使われていないか確認
        既に同じものが使われている場合は被らなくなるまで再生成*/
        while($check->count() != 0){
            $personal_id = Str::random(15); 
            $check = User::where('personal_id','=',personal_id)->first();
        }
        
        $user = User::create(array_merge(
            $validator->validated(),
            [
                'password' => bcrypt($request->password),
                'personal_id' => $personal_id,
            ]
        ))->sendEmailVerificationNotification();


        return response()->json([
            'message' => '登録しました',
            'email' => $request->email
        ], 201);
    }
}
