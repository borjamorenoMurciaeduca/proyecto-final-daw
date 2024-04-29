<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\HistorialPrecio;
use App\Models\Inmueble;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UsuarioInmueble;
use Database\Factories\HistorialPrecioFactory;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {

        Inmueble::factory(15)->create();
        $inmuebles = Inmueble::all();
        $inmuebles->each(function ($inmueble) {
            HistorialPrecio::factory()->create([
                'referenciaInmueble' => $inmueble->referencia,
            ]);
        });
        User::factory(10)->create();
        User::factory()->create([
            'username' => 'jorge',
            'password' => bcrypt('1234'),
        ]);
        User::factory()->create([
            'username' => 'borja',
            'password' => bcrypt('1234'),
        ]);
        UsuarioInmueble::factory(10)->create();
        HistorialPrecio::factory(50)->create();
    }
}
