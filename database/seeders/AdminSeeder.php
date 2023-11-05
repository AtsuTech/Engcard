<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Admin;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Admin::create([
            //id(pk):1 = 権限者
            'role' => '権限者',
        ]);

        Admin::create([
            //id(pk):2 = 非権限者
            'role' => '非権限者',
        ]);
    }
}
