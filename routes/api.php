<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RgisterEmailVerifyController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\UserUpdateController;
use App\Http\Controllers\FlashCardController;
use App\Http\Controllers\FlashcardFavoriteController;
use App\Http\Controllers\AccessController;
use App\Http\Controllers\CategorysController;
use App\Http\Controllers\CardController;
//use App\Http\Controllers\ProfileImageController;
use App\Http\Controllers\UserProfileImgController;

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

Route::group(['middleware' => ['auth', 'can:admin']], function () {
	Route::get('/admin',[AdminController::class,'index']);
    Route::get('/admin/user/list',[AdminController::class,'user_list']);
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

    //ユーザー情報の更新
    Route::post('/user/update',[UserUpdateController::class,'update']);

    //パスワードの更新
    Route::post('/user/password/update',[UserUpdateController::class,'change_password']);

    //プロフィール画像のパス取得
    Route::get('/user/profile/image/my',[UserProfileImgController::class,'get_my_image']);

    //プロフィール画像アップロード
    Route::post('/user/profile/image/upload',[UserProfileImgController::class,'upload_img']);

    //公開単語帳を全て取得
    Route::get('/flashcard/public',[FlashCardController::class,'public_flashcard']);

    //認証ユーザーの単語帳だけを全て取得
    Route::get('/flashcard/my',[FlashCardController::class,'my_flashcards']);

    //単語帳を新規作成
    Route::post('/flashcard/create',[FlashCardController::class,'create']);

    //単語帳の詳細
    Route::get('/flashcard/{id}',[FlashCardController::class,'detail_flashcard']);

    //単語帳の更新
    Route::post('/flashcard/update',[FlashCardController::class,'update']);

    //単語帳の削除
    Route::post('/flashcard/delete',[FlashCardController::class,'delete']);

    //単語帳のアクセス権限のリストを取得
    Route::get('/accesses',[AccessController::class,'list']);

    //単語帳のいいね数を取得
    Route::get('/flashcard/favorite/get/count/{id}',[FlashcardFavoriteController::class,'get_favorite_count']);

    //単語帳のいいね済みかどうかチェック
    Route::get('/flashcard/favorite/my/check/{id}',[FlashcardFavoriteController::class,'check_my_favorite']);

    //単語帳にいいねをつける
    Route::post('/flashcard/favorite/add',[FlashcardFavoriteController::class,'add_favorite']);

    //単語帳にいいねを外す
    Route::post('/flashcard/favorite/delete',[FlashcardFavoriteController::class,'delete_favorite']);

    //カテゴリのデータ取得
    Route::get('/categories',[CategorysController::class,'list']);

    //編集可能な(ユーザーが作成した)カテゴリのデータ取得
    Route::get('/categories/my',[CategorysController::class,'my_list']);

    //カテゴリの追加
    Route::post('/categories/create',[CategorysController::class,'create']);

    //カテゴリの編集
    Route::post('/categories/my/update',[CategorysController::class,'update']);

    //カテゴリの削除
    Route::post('/categories/my/delete',[CategorysController::class,'delete']);

    //カードの新規作成
    Route::post('/card/create',[CardController::class,'create']);

    //カード(公開)の詳細
    Route::get('/card/{id}',[CardController::class,'public_detail_card']);

    //カードの編集
    Route::post('/card/update',[CardController::class,'update']);

    //カードの編集(画像のみ)
    Route::post('/card/update/image',[CardController::class,'update_only_image']);

    //カード画像の削除(画像ファイルも消す)
    Route::post('/card/update/image/delete',[CardController::class,'delete_image']);

    //カードの削除
    Route::post('/card/delete',[CardController::class,'delete']);


});