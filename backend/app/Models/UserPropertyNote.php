<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPropertyNote extends Model
{
    use HasFactory;

    protected $table = 'users_properties_notes';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id_fk',
        'property_id_fk',
        'description',
        'public'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($note) {
            $note->updated_at = null;
        });
    }

    public function userProperty()
    {
        return $this->belongsTo(UserProperty::class, 'user_id_fk', 'user_id_fk');
    }
}
