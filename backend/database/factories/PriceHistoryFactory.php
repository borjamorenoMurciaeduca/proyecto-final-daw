<?php

namespace Database\Factories;

use App\Models\PriceHistory;
use App\Models\Property;
use Illuminate\Database\Eloquent\Factories\Factory;

class PriceHistoryFactory extends Factory {
  protected $model = PriceHistory::class;

  public function definition(): array {
    $referenciaInmueble = Property::pluck('property_id')->random();
    return [
      'property_id_fk' => $referenciaInmueble,
      'price' => $this->faker->numberBetween(50000, 2000000),
    ];
  }
}
