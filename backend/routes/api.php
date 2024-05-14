<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PropertyController;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
// Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
// Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
  // Rutas protegidas correspondientes a la autenticación
  Route::get('/user', [AuthController::class, 'user']);
  Route::post('/logout', [AuthController::class, 'logout']);
  Route::put('/edit-profile', [AuthController::class, 'editProfile']);

  // Rutas protegidas correspondientes a los inmuebles
  Route::get('/properties', [PropertyController::class, 'getAllUserProperties']);
  Route::post('/properties', [PropertyController::class, 'store']);
  Route::post('/notes', [PropertyController::class, 'storeNewNote']);
  Route::delete('/remove-note/{id}', [PropertyController::class, 'deleteNote']);
  Route::put('/update-note/{id}', [PropertyController::class, 'updateNote']);
  Route::get('/property/{id}', [PropertyController::class, 'show']);
  Route::get('/prepare-inmueble/{id}', [PropertyController::class, 'prepare']);
  Route::post('/property/{id}/update-price', [PropertyController::class, 'storeNewPrice']);

  // Rutas protegidas correspondientes a compartir inmuebles
  Route::post('/property/{id}/share', [PropertyController::class, 'shareProperty']);
  // Ruta protegida para el historial de precios
  Route::get('/property/{id}/prices', [PropertyController::class, 'getPrices']);

  // Rutas protegidas correspondientes a los favoritos
  Route::post('/property/{id}/favorite', [PropertyController::class, 'favoriteProperty']);
});

Route::get('/shared-property/{share_url}', [PropertyController::class, 'getSharedProperty']);

// Route::get('/properties', [InmuebleController::class, 'getAllUserProperties'])->middleware('auth:sanctum');
// Route::post('/properties', [InmuebleController::class, 'store'])->middleware('auth:sanctum');
// Route::get('/inmueble/{id}', [InmuebleController::class, 'show'])->middleware('auth:sanctum');
// Route::get('/prepare-inmueble/{id}', [InmuebleController::class, 'prepare'])->middleware('auth:sanctum');
// Route::post('/property/{id}/update-price', [InmuebleController::class, 'storeNewPrice'])->middleware('auth:sanctum');
