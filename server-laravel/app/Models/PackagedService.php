<?php

namespace App\Models;

use App\Models\Package;
use App\Models\Service;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackagedService extends Model
{
    use HasFactory;

    protected $fillable = [
        "package_id",
        "service_id",
        "price",
    ];

    public function service()
    {
        return $this->belongsTo(Service::class, "service_id");
    }

    public function package()
    {
        return $this->belongsTo(Package::class, "package_id");
    }
}
