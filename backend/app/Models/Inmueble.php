<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inmueble extends Model {
    use HasFactory;
    protected $primaryKey = 'referencia';
    protected $fillable = [
        'referencia',
        'ubicacion',
        'tamano',
        'habitaciones',
        'garaje',
        'trastero',
        'fechaBajaAnuncio'
    ];
}
