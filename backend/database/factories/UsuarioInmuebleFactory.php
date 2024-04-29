<?php

namespace Database\Factories;

use App\Models\Inmueble;
use App\Models\User;
use App\Models\UsuarioInmueble;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UsuarioInmueble>
 */
class UsuarioInmuebleFactory extends Factory {
    public function definition(): array {
        $referenciasInmuebles = Inmueble::pluck('referencia')->toArray();
        // $referenciaInmueble = InmuebleFactory::new()->create()->referencia;
        $referenciasUserID = User::pluck('id')->toArray();
        return [
            // 'userId' => User::inRandomOrder()->first()->id,
            'userId' => $this->faker->randomElement($referenciasUserID),
            'referenciaInmueble' => $this->faker->randomElement($referenciasInmuebles),
            'ubicacion' => $this->faker->word(),
            'tamano' => $this->faker->numberBetween(50, 300),
            'habitaciones' => $this->faker->randomNumber(1),
            'garaje' => $this->faker->boolean(),
            'trastero' => $this->faker->boolean(),
        ];
    }
}
