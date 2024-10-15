<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Subscription;
use Illuminate\Http\Request;

class ClientController extends Controller
{

    // Fetch all clients
    public function index()
    {
        $clients = Client::all();

        return response()->json([
            'message' => 'Clients fetched Successfully',
            'clients' => $clients
        ]);
    }

    // Create a new client
    public function store(Request $request)
    {
        $requestingUser = $request->user();

        if ($requestingUser->role !== "admin" && $requestingUser->role !== "level1") {
            return response()->json([
                'message' => 'Not Authorized'
            ], 401);
        }
        $fields = $request->validate([
            'business_name' => 'required|max:255|unique:clients',
            'address' => 'required|max:255',
            'representative_position' => 'required|max:255',
            'representative_name' => 'required|max:255',
            'email' => 'required|email|unique:clients',
            'phone_number' => 'required|unique:clients|min:10',
            'card_name' => 'max:255',
            'sort_code' => 'max:6|min:6',
            'account_number' => 'max:20',
            'bank_name' => 'max:255',
            'description' => 'nullable|max:2000',
        ]);

        $client = Client::create($fields);

        if (!$client) {
            return response()->json([
                'message' => 'Error Creating Client'
            ], 500);
        }

        return response()->json([
            'message' => 'Client Created Successfully',
            'client' => $client
        ], 200);
    }

    // Display a client and their details
    public function show(Client $client)
    {
        return response()->json([
            'message' => 'Client Fetched Successfully',
            'client' => $client
        ]);
    }

    // Update a client
    public function update(Request $request, Client $client)
    {
        $requestingUser = $request->user();

        // Ensure only admin and level 1 users can update clients
        if ($requestingUser->role !== 'admin' && $requestingUser->role !== 'level1') {
            return response()->json([
                'message' => 'Not Authorized'
            ], 401);
        }

        // Validation rules
        $fields = $request->validate([
            'business_name' => 'sometimes|required|max:255|unique:clients,business_name,' . $client->id,  // Ensures unique business name but allows the current one
            'address' => 'sometimes|required|max:255',
            'representative_position' => 'sometimes|required|max:255',
            'representative_name' => 'sometimes|required|max:255',
            'email' => 'sometimes|required|email|unique:clients,email,' . $client->id,  // Ensures unique email but allows the current one
            'phone_number' => 'sometimes|required|unique:clients,phone_number,' . $client->id . '|min:10',
            'card_name' => 'sometimes|max:255',
            'sort_code' => 'sometimes|max:6|min:6',
            'account_number' => 'sometimes|max:20',
            'bank_name' => 'sometimes|max:255',
            'description' => 'sometimes|max:2000|nullable',
        ]);

        // Update client details
        $client->update($fields);

        return response()->json([
            'message' => 'Client Updated Successfully',
            'client' => $client
        ], 200);
    }

    // Delete Client
    public function destroy(Request $request, Client $client)
    {
        $requestingUser = $request->user();

        // Ensure only admin and level 1 users can delete clients
        if ($requestingUser->role !== 'admin') {
            return response()->json([
                'message' => 'Not Authorized'
            ], 401);
        }

        // Delete the client
        if ($client->delete()) {
            return response()->json([
                'message' => 'Client Deleted Successfully'
            ], 200);
        }

        // In case of failure
        return response()->json([
            'message' => 'Error Deleting Client'
        ], 500);
    }

    // Fetch active clients
    public function getActiveClients(){
        $activeSubscriptions = Subscription::where('ended_at', null)->get();

        $activeClientIds = $activeSubscriptions->pluck('client_id')->unique();

        $clients = Client::whereIn('id', $activeClientIds)->get();

        return response()->json([
            'message' => 'Active clients fetched successfully',
            'clients' => $clients
        ]);

    }
}
