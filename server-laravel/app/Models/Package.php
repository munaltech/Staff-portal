<?php

namespace App\Models;

use App\Models\User;

use App\Models\PackagedService;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "discount",
        "total",
        "description",
        "created_by",
    ];

    public function user(){
        return $this->belongsTo(User::class, "created_by");
    }

    public function services(){
        return $this->hasMany(PackagedService::class);
    }
    public function package(){
        return $this->hasMany(Subscription::class);
    }

        
}
