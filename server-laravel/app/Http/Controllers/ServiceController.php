<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // Display all Services
    public function index()
    {
        $services = Service::all();
        return response()->json([
            "message" => "Services Fetched Successfully",
            "services" => $services
        ], 200);
    }

    // Create new Service
    public function store(Request $request)
    {
        $fields = $request->validate([
            "name" => "required|string|max:255",
            "description" => "required|string|max:1000",
            "category_id" => "nullable|exists:categories,id",
            "price" => "required|numeric|min:0",
            "duration" => "required|numeric|min:0",
            "status" => "required|string|in:active,inactive",
            "tags" => "nullable|string|max:255",
            "additional_notes" => "nullable|string|max:1000"
        ]);
        $fields["created_by"] = $request->user()->id;

        $service = Service::create($fields);

        return response()->json([
            "message" => "Service Created Successfully",
            "service" => $service
        ], 200);
    }

    // Display a Service
    public function show(Service $service)
    {
        return response()->json([
            "message" => "Service fetched Successfully",
            "service" => $service
        ], 200);
    }

    // Update a Service
    public function update(Request $request, Service $service)
    {
        $fields = $request->validate([
            "name" => "required|string|max:255",
            "description" => "required|string|max:1000",
            "category_id" => "nullable|exists:categories,id",
            "price" => "required|numeric|min:0",
            "duration" => "required|numeric|min:0",
            "status" => "required|string|in:active,inactive",
            "tags" => "nullable|string|max:255",
            "additional_notes" => "nullable|string|max:1000"
        ]);

        $service->update($fields);

        return response()->json([
            "message" => "Service Updated Successfully",
            "service" => $service
        ], 200);
    }

    // Delete a Service
    public function destroy(Service $service)
    {
        // Delete the service
        if ($service->delete()) {
            return response()->json([
                'message' => 'Service Deleted Successfully'
            ], 200);
        }

        // In case of failure
        return response()->json([
            'message' => 'Error Deleting Service'
        ], 500);
    }
}
