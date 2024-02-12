<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;//Authファサードを使用(現在ログインしているユーザーの取得に使用)
use App\Models\User;//登録ユーザーのDBを使用
use Illuminate\Support\Facades\Validator;
use JWTAuth;

class UserUpdateController extends Controller
{

    //ユーザーID重複確認
    public function check_personal_id(Request $request){

        $check = User::where('personal_id','=',$request->personal_id)->get();
        $get_id = User::where('personal_id','=',$request->personal_id)->first();
        $my_id = User::find(Auth::id());


        //$check->count() == 0
        if($check->count() == 0){
            return response()->json([
                'result' => true,
            ]);
        }elseif($get_id->id == Auth::id()){
            //一致するものが有るとき
            return response()->json([
                'result' => true,
            ]);


        }elseif($check->count() == 0){
            //一致するものが有るとき
            return response()->json([
                'result' => false,
            ]);


        }
    }



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


        $check = User::where('personal_id','=',$request->personal_id)->get();

        /*personal_idが既に使われていないか確認
        既に同じものが使われている場合は被らなくなるまで再生成*/


        // 変更するユーザーを選択してインスタンス化
        $user = User::find(Auth::user()->id);
        $user->name = $request->name;
        $user->email = $request->email;

        //未使用のIDしか変更を受け付けない
        if($check->count() == 0){
            $user->personal_id = $request->personal_id;
        }
        $user->comment =  $request->comment;

        $user->save();

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
