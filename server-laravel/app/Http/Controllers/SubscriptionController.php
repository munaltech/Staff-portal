<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Service;
use App\Models\SubscribedService;
use App\Models\Subscription;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    // Display all subscriptions
    public function index()
    {
        $subscriptions = Subscription::all();

        $updatedSubscriptions = $subscriptions->map(function ($subscription) {
            $client = Client::find($subscription->client_id);

            $subscribedServices = SubscribedService::where("subscription_id", $subscription->id)->get();

            $services = $subscribedServices->map(function ($subscribedService) {
                $service = Service::find($subscribedService->service_id);
                $service->price = $subscribedService->price;
                return $service;
            });

            $subscription->client = $client;
            $subscription->services = $services;

            return $subscription;
        });
        return response()->json([
            "message" => "Subscriptions fetched Successfully",
            "subscriptions" => $updatedSubscriptions

        ], 200);
    }

    // Create a subscription
    public function store(Request $request)
    {
        // Validate the request fields
        $fields = $request->validate([
            "client_id" => "required|exists:clients,id",
            "started_at" => "required|date",
            "ended_at" => "nullable|date",
            "discount" => "nullable|numeric|min:0",
            "total" => "required|numeric|min:0",
            "description" => "nullable|max:1000",
            "services" => "required|array|min:1",
            "services.*.id" => "required|exists:services,id",
            "services.*.price" => "required|numeric|min:0"
        ]);

        // Check if the client exists
        $client = Client::find($fields['client_id']);
        if (!$client) {
            return response()->json([
                "message" => "Client does not exist"
            ], 404);
        }

        // Create the subscription
        $subscriptionData = [
            'client_id' => $fields['client_id'],
            'started_at' => $fields['started_at'],
            'discount' => $fields['discount'],
            'total' => $fields['total'],
            'description' => $fields['description'],
            'created_by' => $request->user()->id,
        ];

        $subscription = Subscription::create($subscriptionData);

        if (!$subscription) {
            return response()->json([
                "message" => "Failed to create subscription"
            ], 500);
        }

        // Loop through the services and add them to the subscription
        foreach ($fields['services'] as $service) {
            $subscribedService = SubscribedService::create([
                'subscription_id' => $subscription->id,
                'service_id' => $service['id'],
                'price' => $service['price'],
            ]);

            if (!$subscribedService) {
                return response()->json([
                    "message" => "Failed to create subscribed service"
                ], 500);
            }
        }

        // Return success response with the created subscription and services
        return response()->json([
            "message" => "Subscription created successfully",
            "subscription" => $subscription,
            "services" => $fields['services']
        ], 200);
    }


    // Fetch a Subscription
    public function show(Subscription $subscription)
    {

        $subscribedServices = SubscribedService::where('subscription_id', $subscription->id)->get();

        $services = $subscribedServices->map(function ($subscribedService) {
            $service = Service::find($subscribedService->service_id);

            if ($service) {
                $service->price = $subscribedService->price;
            }
            return $service;
        });

        $formattedSubscription = [
            'client_id' => $subscription->client_id,
            'started_at' => $subscription->started_at,
            'description' => $subscription->description,
            'services' => $services,
            'total' => $subscription->total,
            'discount' => $subscription->discount
        ];


        return response()->json([
            "message" => "Subscription fetched Successfully",
            "subscription" => $formattedSubscription
        ], 200);
    }

    // Update a subscription
    public function update(Request $request, Subscription $subscription)
    {
        $fields = $request->validate([
            "client_id" => "required",
            "started_at" => "required",
            "ended_at" => "",
            "discount" => "min:0",
            "total" => "required|min:0",
            "description" => "max:1000",
        ]);

        $subscription->update($fields);
        return response()->json([
            "message" => "Subscription Updated Successfully",
            "subscription" => $subscription
        ], 200);
    }

    // Delete a subscription
    public function destroy(Subscription $subscription)
    {
        // Delete the subscription
        if ($subscription->delete()) {
            return response()->json([
                'message' => 'Subscription Deleted Successfully'
            ], 200);
        }

        // In case of failure
        return response()->json([
            'message' => 'Error Deleting Subscription'
        ], 500);
    }

    // Fetch active subscriptions
    public function getActiveSubscriptions()
    {
        $subscriptions = Subscription::where('ended_at', null)->get();

        if ($subscriptions->isEmpty()) {
            return response()->json([
                'message' => 'No active subscriptions found',
                'subscriptions' => []
            ], 404);
        }

        return response()->json([
            'message' => 'Active subscriptions fetched successfully',
            'subscriptions' => $subscriptions
        ]);
    }
}
