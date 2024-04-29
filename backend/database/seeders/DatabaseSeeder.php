<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\PriceHistory;
use App\Models\UsersProperty;
use App\Models\Property;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserProperty;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {

        Property::factory(15)->create();
        $inmuebles = Property::all();
        $inmuebles->each(function ($inmueble) {
            PriceHistory::factory()->create([
                'property_id_fk' => $inmueble->property_id,
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
        UserProperty::factory(10)->create();
        PriceHistory::factory(50)->create();
    }
}
