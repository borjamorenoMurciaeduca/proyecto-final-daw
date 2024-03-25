<?php

namespace Database\Factories;

use App\Models\Inmueble;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inmueble>
 */
class InmuebleFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Inmueble::class;
    public function definition(): array {
        return [
            'referencia' => $this->faker->unique()->word(),
            'ubicacion' => $this->faker->word(),
            'tamano' => $this->faker->randomNumber(),
            'habitaciones' => $this->faker->randomNumber(),
            'garaje' => $this->faker->boolean(),
            'trastero' => $this->faker->boolean(),
            'fechaBajaAnuncio' => $this->faker->date(),
        ];
    }
}
