<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuarioInmueble extends Model {
    use HasFactory;
    protected $fillable = [
        "userId",
        'referenciaInmueble',
        'ubicacion',
        'tamano',
        'habitaciones',
        'garaje',
        'trastero',
        'fechaBajaAnuncio'
    ];
    // Establece la relación entre UsuarioInmueble e Inmueble
    // belongsTo: Establece que pertenece a un registro de la tabla Inmueble
    // referenciaInmueble: Nombre de la columna en UsuarioInmueble que hace referencia a Inmueble
    // referencia: Nombre de la columna en Inmueble que hace referencia a UsuarioInmueble
    public function inmueble() {
        return $this->belongsTo(Inmueble::class, 'referenciaInmueble', 'referencia');
    }
}
