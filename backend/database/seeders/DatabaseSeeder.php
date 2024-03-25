<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Inmueble;
use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {

        Inmueble::factory(10)->create();
        User::factory(10)->create();
        User::factory()->create([
            'username' => 'jorge',
            'email' => 'jorge@jorge.com',
            'password' => bcrypt('1234'),
        ]);
    }
}
