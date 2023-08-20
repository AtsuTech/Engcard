<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class RgisterEmailVerifyController extends Controller
{
    //Eメールのリンククリックの承認処理
    public function verify($user_id, Request $request){

        //送信されてきたリクエストが有効な著名を持っているかを検査
        if(!$request->hasValidSignature()){
            //
            return redirect()->to('/');
        }

        $user = User::findOrFail($user_id);

        if(!$user->hasVerifiedEmail()){
            //markEmailAsVerified()でUserテーブルの"email_verifiyed_at"に日付を保存してる？
            $user->markEmailAsVerified();
        }

        return redirect()->to('/register/complete');
    }


    //Eメールを再送処理
    public function resend(Request $request){

        $user = User::where('email','=',$request->email)->first();
        $user->sendEmailVerificationNotification();
        return response()->json(['message' => 'メール承認のリンクを再送しました']);
    }
}
