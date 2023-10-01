<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;//Authファサードを使用(現在ログインしているユーザーの取得に使用)
use App\Models\User;//登録ユーザーのDBを使用
use Illuminate\Support\Facades\Validator;
use JWTAuth;

class UserUpdateController extends Controller
{
    //ユーザー情報更新処理
    public function update(Request $request){

        /**
         * 仕様
         * 変更されてない入力データが来ても、上書きする。
         * メールアドレスは、変更する場合はすでに登録済み(他ユーザーと合致)の場合はエラーとする
         */

        //メールアドレスの変更ありorなしによってバリデーションを変更する
        if(Auth::user()->email != $request->email){
            $email_validator = 'required|email|unique:users|max:50';
        }else{
            $email_validator = 'required|email|max:50';
        }

        //バリデーション検証
        $validator = Validator::make($request->only(["name", "email"]), [
            'name' => 'required|max:10',
            'email' => $email_validator,
        ]);


        //バリデーション検知の処理
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }


        // 変更するユーザーを選択してインスタンス化
        $User = User::find(Auth::user()->id);
        $User->name = $request->name;
        $User->email = $request->email;
        $User->save();

        return response()->json([
            'message' => 'ユーザー情報を更新しました',
        ]);

    }

    //パスワード更新処理
    public function change_password(Request $request){
            
        //まずは、現在のパスワードが正しく入力されたか確認。password_verify(生パスワード, ハッシュ値)を使用。
        if(password_verify($request->password_current, Auth::user()->password)){

            // 続いて、新しいパスワードが確認で２回入力したものが一致してるか確認。
            if($request->password_new == $request->password_new_conf){
            
                // 問題なければ、パスワード変更実施
                $user = User::find(Auth::user()->id);
                $user->password = bcrypt($request->password_new);//値をハッシュ化する。
                $user->save();

                return response()->json([
                    'message' => 'パスワードを更新しました',
                ]);
            }else{
                // エラー処理
                return response()->json([
                    'message' => '新しいパスワードが一致しません',
                ]);
            }
            
        }else{
            // エラー処理
            return response()->json([
                'message' => '現在のパスワードが違います',
            ]);
            
        }
    }      
}
