<?php

namespace Database\Factories;

use App\Models\Inmueble;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inmueble>
 */
class InmuebleFactory extends Factory {
    protected $model = Inmueble::class;
    public function definition(): array {
        return [
            'referencia' => $this->faker->unique()->randomNumber(9),
            'fechaBajaAnuncio' => $this->faker->date(),
        ];
    }
}
