<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\PackagedService;
use App\Models\Service;
use Illuminate\Http\Request;

class PackageController extends Controller
{
    // Show all packages
    public function index()
    {
        $packages = Package::orderBy('created_at', 'desc')->get();

        $updatedPackages = $packages->map(function ($package) {
            $packagedServices = PackagedService::where("package_id", $package->id)->get();

            $services = $packagedServices->map(function ($packagedService) {
                $service = Service::find($packagedService->service_id);
                $service->price = $packagedService->price;
                return $service;
            });

            $package->services = $services;
            return $package;
        });

        return response()->json([
            'message' => 'Packages fetched Successfully',
            'packages' => $updatedPackages
        ], 200);
    }

    // Create a new package
    public function store(Request $request)
    {
        $fields = $request->validate([
            "name" => "required|string|max:255",
            "discount" => "numeric|min:0",
            "total" => "required|numeric|min:0",
            "description" => "string|max:2000",
            "services" => "required|array|min:1",
            "services.*.id" => "required|exists:services,id",
            "services.*.price" => "required|numeric|min:0"
        ]);

        $packageData = [
            'name' => $fields['name'],
            'discount' => $fields['discount'],
            'total' => $fields['total'],
            'description' => $fields['description'],
            'created_by' => $request->user()->id
        ];

        $package = Package::create($packageData);

        if (!$package) {
            return response()->json([
                "message" => "Package Creation Failed"
            ], 500);
        }

        foreach ($fields['services'] as $service) {
            PackagedService::create([
                'package_id' => $package->id,
                'service_id' => $service['id'],
                'price' => $service['price']
            ]);
        }


        return response()->json([
            "message" => "Package Created Successfully",
            "package" => $package,
            "services" => $fields['services']
        ], 200);
    }

    // Show a single package
    public function show(Package $package)
    {
        $packagedServices = PackagedService::where("package_id", $package->id)->get();

        $services = $packagedServices->map(function ($packagedService) {
            $service = Service::find($packagedService->service_id);
            if ($service) {
                $service->price = $packagedService->price;
            }
            return $service;
        });

        $formattedPackage = [
            "name" => $package->name,
            "description"=> $package->description,
            "discount" => $package->discount,
            "total" => $package->total,
            "services" => $services
        ];

        return response()->json([
            'message' => 'Package Fetched Successfully',
            'package' => $formattedPackage
        ]);
    }

    // Update a package
    public function update(Request $request, Package $package)
    {
        $fields = $request->validate([
            "name" => "required|string|max:255",
            "discount" => "numeric|min:0",
            "total" => "required|numeric|min:0",
            "description" => "string|max:2000",
            "services"=> "exists:services,id",
            "services.*.id" => "exists:services,id",
            "services.*.price" => "required|numeric|min:0"
        ]);

        $packageData = [
            'name' => $fields['name'],
            'discount' => $fields['discount'],
            'total' => $fields['total'],
            'description' => $fields['description'],
            'created_by' => $request->user()->id
        ];

        $package->update($packageData);

        $newServiceIds = collect($fields['services'])->pluck('id')->toArray();

        $existingServices = PackagedService::where('package_id', $package->id)->get();

        foreach ($existingServices as $existingService) {
            if (!in_array($existingService->service_id, $newServiceIds)) {
                $existingService->delete();
            }
        }

        foreach ($fields['services'] as $service) {
            $existingService = PackagedService::where('package_id', $package->id)->where('service_id', $service['id'])->first();
            if ($existingService) {
                $existingService->price = $service['price'];
                $existingService->save();
            } else {
                PackagedService::create([
                    'package_id' => $package->id,
                    'service_id' => $service['id'],
                    'price' => $service['price']
                ]);
            }
        }

        return response()->json([
            "message" => "Package Updated Successfully",
            "package" => $package
        ]);
    }

    // Delete a package
    public function destroy(Package $package)
    {
        $package->delete();

        return response()->json([
            "message" => "Package Deleted Successfully"
        ]);
    }
}
