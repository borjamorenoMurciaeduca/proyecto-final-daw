<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\PriceHistory;
use App\Models\UsersProperty;
use App\Models\Property;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserProperty;
use App\Models\TypeProperties;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {

        // Crea 10 usuarios usando la fábrica User
        User::factory(10)->create();
        $randomUserData = file_get_contents('https://randomuser.me/api/?results=10');
        $decodedData = json_decode($randomUserData, true);
        // Crea un usuario adicional con nombre de usuario 'jorge' y contraseña '1234'
        $jorge = User::factory()->create([
            'username' => 'jorge',
            'password' => bcrypt('1234'),
            "email" => "jorge@jorge.com",
            'name' => "Jorge Manuel",
            "surname" => 'Balibrea',
            "birth_date" => "1999-12-12",
            "avatar_url" => $decodedData['results'][0]['picture']['large'],
            "phone" => "655555555"
        ]);

        // Crea otro usuario adicional con nombre de usuario 'borja' y contraseña '1234'
        $borja = User::factory()->create([
            'username' => 'borja',
            'password' => bcrypt('1234'),
            "email" => "borja@borja.com",
            'name' => "Borja",
            "surname" => 'XXX',
            "birth_date" => "1999-12-12",
            "avatar_url" => $decodedData['results'][1]['picture']['large'],
            "phone" => "622222222"
        ]);

        TypeProperties::insertOrIgnore([
            ['type_properties_id' => 0, 'description' => 'others'],
            ['type_properties_id' => 1, 'description' => 'property'],
            ['type_properties_id' => 2, 'description' => 'garage'],
        ]);

        //  Crea 10 propiedades usando la fábrica Property
        Property::factory(10)->create();
        Property::factory(100)->create()->each(function ($property) use ($jorge, $borja) {
            $faker = Faker::create();
            $user = rand(0, 1) ? $jorge : $borja;
            UserProperty::factory()->create([
                'user_id_fk' => $user->id,
                'property_id_fk' => $property->property_id,
                'title' => $faker->word(),
                'location' => $faker->word(),
                'size' => $faker->numberBetween(50, 300),
                'rooms' => $faker->randomNumber(1),
                'garage' => $faker->boolean(),
                'storage_room' => $faker->boolean(),
                'bath_rooms' => $faker->randomNumber(1),
                'description' => $faker->sentence(200),
                'type_property_fk' => rand(0, 2)
            ]);
            //añadir 10 registros al historial de precios
            PriceHistory::factory(10)->create([
                'property_id_fk' => $property->property_id,

            ]);
        });


        // Crea 40 relaciones entre usuarios y propiedades utilizando la fábrica UserProperty
        // UserProperty::factory(8)->create();
        // Obtener todos los property_id no utilizados


        // Crea 50 registros de historial de precios utilizando la fábrica PriceHistory
        PriceHistory::factory(50)->create();
    }
}
