<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PriceHistory extends Model {
    use HasFactory;

    protected $fillable = [
        'property_id_fk',
        'price',
    ];
    protected static function boot() {
        parent::boot();

        // Evento que se ejecuta antes de guardar un nuevo registro
        // static::saving(function ($historialPrecio) {
        //     // Obtener el inmueble asociado al historial de precios
        //     $inmueble = $historialPrecio->property;

        //     // Actualizar el campo "ultimo_precio" del inmueble
        //     $inmueble->last_price = $historialPrecio->price;
        //     $inmueble->save(); // Guardar el inmueble actualizado
        // });
        static::creating(function ($priceHistory) {
            // Obtener el inmueble asociado al historial de precios
            $property = $priceHistory->property;

            // Actualizar el campo "ultimo_precio" del inmueble
            $property->last_price = $priceHistory->price;
            $property->save(); // Guardar el inmueble actualizado
        });
    }

    public function property() {
        return $this->belongsTo(Property::class, 'property_id_fk', 'property_id');
    }
}
