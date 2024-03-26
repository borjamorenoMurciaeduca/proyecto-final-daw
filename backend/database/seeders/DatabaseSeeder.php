<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Inmueble;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UsuarioInmueble;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {

        Inmueble::factory(10)->create();
        User::factory(10)->create();
        User::factory()->create([
            'username' => 'jorge',
            'password' => bcrypt('1234'),
        ]);
        UsuarioInmueble::factory(10)->create();
    }
}
