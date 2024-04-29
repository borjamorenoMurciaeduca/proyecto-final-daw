<?php

namespace Database\Factories;

use App\Models\HistorialPrecio;
use App\Models\Inmueble;
use Illuminate\Database\Eloquent\Factories\Factory;

class HistorialPrecioFactory extends Factory {
  protected $model = HistorialPrecio::class;

  public function definition(): array {
    $referenciaInmueble = Inmueble::pluck('referencia')->random();
    return [
      'referenciaInmueble' => $referenciaInmueble,
      'precio' => $this->faker->numberBetween(50000, 2000000),
    ];
  }
}
