<?php

namespace Database\Factories;

use App\Models\Properties;
use App\Models\Property;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inmueble>
 */
class PropertyFactory extends Factory {
    protected $model = Property::class;
    public function definition(): array {
        return [
            'property_id' => $this->faker->unique()->randomNumber(9),
            'cancellation_date' => null,
            'url_image' => $this->faker->imageUrl(),
        ];
    }
}
