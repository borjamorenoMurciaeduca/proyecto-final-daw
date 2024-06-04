<?php

namespace Database\Factories;

use App\Models\PriceHistory;
use App\Models\Property;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class PriceHistoryFactory extends Factory {
  protected $model = PriceHistory::class;

  public function definition(): array {
    $referenciaInmueble = Property::pluck('property_id')->random();
    return [
      'property_id_fk' => $referenciaInmueble,
      'price' => $this->faker->numberBetween(50000, 500000),
    ];
  }

  public function configure() {
    return $this->afterCreating(function (PriceHistory $priceHistory) {
      //establecemos la fecha de creación y modificación de forma aleatoria desde hoy a 14 días atrás
      $fechaAleatoria = Carbon::now()->subDays(rand(1, 14))->subHours(rand(0, 23))->subMinutes(rand(0, 59))->subSeconds(rand(0, 59));
      $priceHistory->created_at = $fechaAleatoria;
      $priceHistory->updated_at = $fechaAleatoria;
      $priceHistory->save();
    });
  }
}
