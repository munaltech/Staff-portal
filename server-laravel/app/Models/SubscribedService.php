<?php

namespace App\Models;

use App\Models\Service;
use App\Models\Subscription;

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
        return $this->belongsTo(Subscription::class, "subscription_id");
    }
    public function services(){
        return $this->belongsTo(Service::class, "service_id");
    }
}
