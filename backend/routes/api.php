<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\InmuebleController;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/user', [AuthController::class, 'userProfile'])->middleware('auth:sanctum');

Route::get('/users', [AuthController::class, 'users'])->middleware('auth:sanctum');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/inmueble', [InmuebleController::class, 'store'])->middleware('auth:sanctum');
Route::get('/inmueble/{id}', [InmuebleController::class, 'show'])->middleware('auth:sanctum');