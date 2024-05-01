<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model {
    use HasFactory;
    protected $primaryKey = 'property_id';
    protected $fillable = [
        'property_id',
        'cancellation_date',
        'url_image',
    ];

    //Establece la relación entre Inmueble e HistorialPrecio
    //hasMany: Establece que un registro de Inmueble puede tener varios registros de HistorialPrecio
    //referenciaInmueble: Nombre de la columna en HistorialPrecio que hace referencia a Inmueble
    //referencia: Nombre de la columna en Inmueble que hace referencia a HistorialPrecio
    public function historialPrecio() {
        return $this->hasMany(PriceHistory::class, 'property_id_fk', 'property_id');
    }
}
