<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscribedService extends Model
{
    use HasFactory;
    protected $fillable = [
        "subscription_id",
        "service_id",
        "price",
    ];

    public function subscriptions(){
        return $this->belongsTo(Subscription::class);
    }
    public function services(){
        return $this->belongsTo(Service::class);
    }
}
