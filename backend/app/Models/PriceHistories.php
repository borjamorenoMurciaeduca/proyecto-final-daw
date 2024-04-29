<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PriceHistories extends Model {
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'property_id_fk',
        'price',
    ];
    protected static function boot() {
        parent::boot();

        // Evento que se ejecuta antes de guardar un nuevo registro
        static::saving(function ($historialPrecio) {
            // Obtener el inmueble asociado al historial de precios
            $inmueble = $historialPrecio->property;

            // Actualizar el campo "ultimo_precio" del inmueble
            $inmueble->last_price = $historialPrecio->price;
            $inmueble->save(); // Guardar el inmueble actualizado
        });
    }

    public function inmueble() {
        return $this->belongsTo('App\Models\Properties', 'property_id_fk', 'property_id');
    }
}
