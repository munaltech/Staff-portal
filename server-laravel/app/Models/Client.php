<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        "business_name",
        "address",
        "representative_position",
        "representative_name",
        "email",
        "phone_number",
        "card_name",
        "sort_code",
        "account_number",
        "bank_name",
    ];

    public function setEmailAttribute($value){
        $this->attributes["email"] = strtolower($value);
    }
    public function comments(){
        return $this->hasMany(Comment::class);
    }
    public function subscriptions(){
        return $this->hasMany(Subscription::class);
    }
}
