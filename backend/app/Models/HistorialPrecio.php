<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistorialPrecio extends Model {
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'referenciaInmueble',
        'precio',
    ];
    protected static function boot() {
        parent::boot();

        // Evento que se ejecuta antes de guardar un nuevo registro
        static::saving(function ($historialPrecio) {
            // Obtener el inmueble asociado al historial de precios
            $inmueble = $historialPrecio->inmueble;

            // Actualizar el campo "ultimo_precio" del inmueble
            $inmueble->ultimo_precio = $historialPrecio->precio;
            $inmueble->save(); // Guardar el inmueble actualizado
        });
    }

    public function inmueble() {
        return $this->belongsTo('App\Models\Inmueble', 'referenciaInmueble', 'referencia');
    }
}
