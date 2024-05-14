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
        'title',
        'location',
        'size',
        'rooms',
        'garage',
        'storage_room',
        'bath_rooms',
        'description',
        'favorite'
    ];
    // Establece la relación entre UserProperty y Property
    // belongsTo: Establece que pertenece a un registro de la tabla Properties
    // property_id_fk: Nombre de la columna en UsuarioInmueble que hace referencia Properties
    // property_id: Nombre de la columna en Inmueble que hace referencia a UserProperty
    public function property() {
        return $this->belongsTo(Property::class, 'property_id_fk', 'property_id');
    }

    public function notes()
    {
        return $this->hasMany(UserPropertyNote::class, 'user_id_fk', 'user_id_fk')
                    ->where('property_id_fk', $this->property_id_fk);
    }
}
