<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\User;//追加
use Illuminate\Auth\Notifications\ResetPassword;//追加

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //パスワードリセットフォームへの移動するためのメールのリンクを独自に設定
        $this->registerPolicies();
        ResetPassword::createUrlUsing(function (User $user, string $token) {
                return 'http://127.0.0.1:8000/password/reset?token=' . $token . '&email=' .  $user->email;        
        });
    }
}
