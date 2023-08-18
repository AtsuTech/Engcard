<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class RegisterController extends Controller
{
    //
    public function register(Request $request){
        $validator = Validator::make($request->only(["name", "email", "password", "password_confirmation"]), [
            'name' => 'required|max:10|unique:users',
            'email' => 'required|email|unique:users|max:50',
            'password' => 'required|confirmed|string|min:6|max:30',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ))->sendEmailVerificationNotification();

        return response()->json([
            'message' => '登録しました',
            'email' => $request->email
        ], 201);
    }
}
