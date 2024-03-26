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
}
