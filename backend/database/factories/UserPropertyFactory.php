<?php

namespace Database\Factories;

use App\Models\Property;
use App\Models\User;
use App\Models\UserProperty;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UsuarioInmueble>
 */
class UserPropertyFactory extends Factory {
    public function definition(): array {
        $referenciasInmuebles = Property::pluck('property_id')->toArray();
        $referenciasUserID = User::pluck('id')->toArray();
        $jorgeId = User::where('username', 'jorge')->first()->id;

        // Filtrar los property_id que no se han utilizado
        $propertyIdsNoUtilizados = array_diff($referenciasInmuebles, UserProperty::pluck('property_id_fk')->toArray());

        // Si no quedan property_id disponibles, utilizar el primero de la lista original
        $propertyId = !empty($propertyIdsNoUtilizados) ? $this->faker->randomElement($propertyIdsNoUtilizados) : $referenciasInmuebles[0];

        return [
            'user_id_fk' => $jorgeId,
            'property_id_fk' => $propertyId,
            'location' => $this->faker->word(),
            'size' => $this->faker->numberBetween(50, 300),
            'rooms' => $this->faker->randomNumber(1),
            'garage' => $this->faker->boolean(),
            'storage_room' => $this->faker->boolean(),
        ];
    }
}
