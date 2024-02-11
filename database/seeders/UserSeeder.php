<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Carbon\Carbon;//現在日時取得

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //現在日時取得
        $now = Carbon::now();

        //固有ID
        $personal_id = 'Admin_User'; 

        User::create([
            'name' => '権限者',
            'email' => 'admin@admin.com',
            'email_verified_at' => $now,
            'password' => bcrypt('admin0123'),
            'admin_id' => 1,
            'personal_id' => $personal_id,
            'comment' => 'すべてのアクセス権限を持つ管理者用のアカウントです'
        ]);
    }
}
