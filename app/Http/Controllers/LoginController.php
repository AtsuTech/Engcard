<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use JWTAuth;//JWTAuth::attempt()を使用するため

class LoginController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * ログイン処理
     * メール承認が完了(Userテーブルのemail_verified_at != null)していないと
     * ログインができない仕様にしてある
     */
    public function login()
    {
        $credentials = request(['email', 'password']);
        $verify_check = null;

        // メールアドレスで、合致するユーザーを検索
        $user = Authenticatable::where('email','=',request(['email']))->first();

        // メールアドレスが合致するユーザーが居なければエラー返す
        if($user == null){
            return response()->json(['email' => 'このメールアドレスで登録されたユーザーが見つかりませんでした'], 401);
        }

        // メールアドレスが合致するユーザーがいた場合、データを取得
        if($user){
            $verify_check = $user->email_verified_at;
            $user_name = $user->name;
            $user_id = $user->id;
        }


        // メール承認のカラムがnullどうかチェック。nullならログインを却下する
        if(is_null($verify_check)){
            return response()->json(['email' => 'メールアドレスの承認が完了していません。承認がされていないアカウントではログインできません。'], 401);
        }

        //JWTAuth::attempt()にしないとトークンが得られなかった(auth()->attemptだとtrueと帰ってくる)
        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['password' => 'ログインできません。パスワードが間違っていないかご確認ください。'], 401);
        }

        return $this->respondWithToken($token,$verify_check,$user_name,$user_id);
    }

    /**
     * マイページ
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * ログアウト処理
     */
    public function logout()
    {
        auth('')->logout();

        return response()->json(['message' => '正常にログアウトしました。']);
    }


    /**
     * Refresh a token.
     */
    public function refresh()
    {
        //return $this->respondWithToken(auth()->refresh());
        return response()->json([
            'new_token' => auth()->refresh(),
            'expires_in' =>  date("Y-m-d", mktime(date('H'),date('i'),date('s'),date('n'),date('j') + 20,date('Y'))),
        ],200);
    }

    /**
     * ログイン成功時にトークンなどの値を返す
     */
    protected function respondWithToken($token,$verify_check,$user_name,$user_id)
    {
        return response()->json([
            'access_token' => $token,
            'email_verify' => $verify_check,
            'user_name' => $user_name,
            'user_id' => $user_id,
            'token_type' => 'bearer',
            'expires_in' =>  date("Y-m-d", mktime(date('H'),date('i'),date('s'),date('n'),date('j') + (auth('api')->factory()->getTTL()/1440),date('Y'))),
        ],200);
    }
}
