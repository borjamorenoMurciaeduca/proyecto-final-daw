<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\PriceHistories;
use App\Models\Properties;
use App\Models\Property;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserProperties;
use App\Models\UsersProperties;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {

        Properties::factory(15)->create();
        $inmuebles = Properties::all();
        // $inmuebles->each(function ($inmueble) {
        //     PriceHistories::factory()->create([
        //         'property_id_fk' => $inmueble->property_id,
        //     ]);
        // });
        User::factory(10)->create();
        User::factory()->create([
            'username' => 'jorge',
            'password' => bcrypt('1234'),
        ]);
        User::factory()->create([
            'username' => 'borja',
            'password' => bcrypt('1234'),
        ]);
        UsersProperties::factory(10)->create();
        PriceHistories::factory(50)->create();
    }
}
