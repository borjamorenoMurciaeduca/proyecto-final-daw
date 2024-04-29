<?php

namespace Database\Factories;

use App\Models\Properties;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inmueble>
 */
class PropertiesFactory extends Factory {
    protected $model = Properties::class;
    public function definition(): array {
        return [
            'property_id' => $this->faker->unique()->randomNumber(9),
            'cancellation_date' => null,
            'url_image' => $this->faker->imageUrl(),
        ];
    }
}
