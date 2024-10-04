<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Client::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name'=>'required',
            'email'=> 'required',
        ]);

        $client = Client::create($fields);

        return ['client' => $client];
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        return $client;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
    
        $fields = $request->validate([
            'name'=>'required',
            'email'=> 'required',
        ]);
        $client->update($fields);
        return ['client'=> $client];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $client->delete();
        return ['message' => 'client deleted'];
    }
}
