<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model {
    use HasFactory;
    public $incrementing = false;
    protected $primaryKey = 'property_id';
    protected $fillable = [
        'property_id',
        'cancellation_date',
        'url_image',
    ];

    //Establece la relación entre Property e PriceHistory
    //hasMany: Establece que un registro de Inmueble puede tener varios registros de PriceHistory
    //property_id_fk: Nombre de la columna en PriceHistory que hace referencia a Property
    //property_id: Nombre de la columna en Property que hace referencia a PriceHistory
    public function historialPrecio() {
        return $this->hasMany(PriceHistory::class, 'property_id_fk', 'property_id');
    }
    //nuevo? no se usa 
    // public function users() {
    //     return $this->belongsToMany(User::class, 'users_properties', 'property_id_fk', 'user_id_fk');
    // }
}
