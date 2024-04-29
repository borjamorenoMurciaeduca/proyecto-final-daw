<?php

namespace Database\Factories;

use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UsuarioInmueble>
 */
class UserPropertyFactory extends Factory {
    public function definition(): array {
        $referenciasInmuebles = Property::pluck('property_id')->toArray();
        // $referenciaInmueble = InmuebleFactory::new()->create()->referencia;
        $referenciasUserID = User::pluck('id')->toArray();
        return [
            // 'userId' => User::inRandomOrder()->first()->id,
            'user_id_fk' => $this->faker->randomElement($referenciasUserID),
            'property_id_fk' => $this->faker->randomElement($referenciasInmuebles),
            'location' => $this->faker->word(),
            'size' => $this->faker->numberBetween(50, 300),
            'rooms' => $this->faker->randomNumber(1),
            'garage' => $this->faker->boolean(),
            'storage_room' => $this->faker->boolean(),
        ];
    }
}
