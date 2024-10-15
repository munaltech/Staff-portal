<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('clients/active', [ClientController::class, 'getActiveClients'])->middleware('auth:sanctum');
Route::get('subscriptions/active', [SubscriptionController::class, 'getActiveSubscriptions'])->middleware('auth:sanctum');
Route::post('subscriptions/end/{subscription}', [SubscriptionController::class, 'markAsEnded'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('clients', ClientController::class);
    Route::apiResource('services', ServiceController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('subscriptions', SubscriptionController::class);
    Route::apiResource('comments', CommentController::class);
});


Route::post('users/register', [AuthController::class, 'register'])->middleware('auth:sanctum');
Route::post('users/login', [AuthController::class, 'login']);
Route::post('users/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::put('users/{id}', [AuthController::class, 'update'])->middleware('auth:sanctum');
Route::delete('users/{id}', [AuthController::class, 'destroy'])->middleware('auth:sanctum');
Route::get('users', [AuthController::class, 'getAllUsers'])->middleware('auth:sanctum');
Route::get('users/{id}', [AuthController::class, 'getUser'])->middleware('auth:sanctum');
