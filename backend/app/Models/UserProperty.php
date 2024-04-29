<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProperty extends Model {
    use HasFactory;
    protected $table = 'users_properties';
    protected $primaryKey = 'user_id_fk';
    protected $fillable = [
        "user_id_fk",
        'property_id_fk',
        'location',
        'size',
        'rooms',
        'garage',
        'storage_room',
        // 'fechaBajaAnuncio'
    ];
    // Establece la relación entre UsuarioInmueble e Inmueble
    // belongsTo: Establece que pertenece a un registro de la tabla Inmueble
    // referenciaInmueble: Nombre de la columna en UsuarioInmueble que hace referencia a Inmueble
    // referencia: Nombre de la columna en Inmueble que hace referencia a UsuarioInmueble
    public function property() {
        return $this->belongsTo(Property::class, 'property_id_fk', 'property_id');
    }
}
