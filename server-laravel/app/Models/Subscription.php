<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        "client_id",
        "started_at",
        "ended_at",
        "discount",
        "total",
        "description",
        "package",
        "created_by",
    ];
    
    public function client(){
        return $this->belongsTo(Client::class, "client_id");
    }
    public function user(){
        return $this->belongsTo(User::class, "created_by");
    }
    public function subscribed_services(){
        return $this->hasMany(SubscribedService::class);
    }
    public function package(){
        return $this->belongsTo(Package::class,"package");
    }
}
