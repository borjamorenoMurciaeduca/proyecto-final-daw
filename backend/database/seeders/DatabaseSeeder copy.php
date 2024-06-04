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
        // Create 15 properties
        Property::factory(15)->create();
        $properties = Property::all();
        $properties->each(function ($property) {
            // Create 10 price histories for each property
            PriceHistory::factory(10)->create([
                'property_id_fk' => $property->property_id,
            ]);
        });

        // Create 10 users
        User::factory(10)->create();

        // Create user jorge and borja
        User::factory()->create([
            'username' => 'jorge',
            'password' => bcrypt('1234'),
        ]);
        User::factory()->create([
            'username' => 'borja',
            'password' => bcrypt('1234'),
        ]);

        // Create 10 user properties
        UserProperty::factory(10)->create();

        // Create 50 price histories
        // PriceHistory::factory(50)->create();
    }
}
