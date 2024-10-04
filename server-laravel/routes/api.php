<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('clients', ClientController::class);
});


Route::post('users/register', [AuthController::class, 'register'])->middleware('auth:sanctum');
Route::post('users/login', [AuthController::class, 'login']);
Route::post('users/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::put('users/{id}', [AuthController::class, 'update'])->middleware('auth:sanctum');
Route::delete('users/{id}', [AuthController::class, 'destroy'])->middleware('auth:sanctum');
