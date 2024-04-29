<?php

namespace Database\Factories;

use App\Models\PriceHistories;
use App\Models\PriceHistory;
use App\Models\Properties;
use App\Models\Property;
use Illuminate\Database\Eloquent\Factories\Factory;

class PriceHistoriesFactory extends Factory {
  protected $model = PriceHistories::class;

  public function definition(): array {
    $referenciaInmueble = Properties::pluck('property_id')->random();
    return [
      'property_id_fk' => $referenciaInmueble,
      'price' => $this->faker->numberBetween(50000, 2000000),
    ];
  }
}
