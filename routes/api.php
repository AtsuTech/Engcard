<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RgisterEmailVerifyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['api'])->group(function ($router){

    //ユーザー新規登録
    Route::post('/register',[RegisterController::class,'register'])->name('verification.verify');

    //メール承認処理(アカウント有効化処理)  
    Route::get('email/verify/{id}',[RgisterEmailVerifyController::class,'verify'])->name('verification.verify');

    //承認メールの再送信処理
    Route::get('email/resesnd',[RgisterEmailVerifyController::class,'resend'])->name('verification.resend');

});