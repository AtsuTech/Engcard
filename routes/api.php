<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RgisterEmailVerifyController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\FlashCardController;

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

    //ログイン処理
    Route::post('/login',[LoginController::class,'login']);

    //ログイン処理
    Route::post('/logout',[LoginController::class,'logout']);
    Route::post('/refresh',[LoginController::class,'refresh']);

    //パスワードリセットのリクエストのメール送信
    Route::post('/password/forgot',[PasswordResetController::class,'sendemail']);

    //パスワードリセット処理
    Route::post('/password/reset',[PasswordResetController::class,'passwordreset'])->name('password.reset');

    //公開単語帳を全て取得
    Route::get('/flashcard/public',[FlashCardController::class,'public_flashcard']);

    //単語帳の詳細
    Route::get('/flashcard/{id}',[FlashCardController::class,'detail_flashcard']);

    //単語帳を新規作成
    Route::post('/flashcard/create',[FlashCardController::class,'create']);

});