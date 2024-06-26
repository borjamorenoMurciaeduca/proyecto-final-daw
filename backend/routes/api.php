<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\TypePropertiesController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

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
  Route::put('/property/{id}', [PropertyController::class, 'updateProperty']);
  Route::get('/prepare-inmueble/{id}', [PropertyController::class, 'prepare']);
  Route::post('/property/{id}/update-price', [PropertyController::class, 'storeNewPrice']);
  Route::delete('/properties/delete-multiple', [PropertyController::class, 'deleteMultiple']);
  Route::get('/type-properties', [TypePropertiesController::class, 'getAllTypeProperties']);

  // Rutas protegidas correspondientes a compartir inmuebles
  Route::post('/property/{id}/share', [PropertyController::class, 'shareProperty']);
  Route::put('/property/{id}/revoke-share', [PropertyController::class, 'revokeShareProperty']);

  // Ruta protegida para el historial de precios
  Route::get('/property/{id}/prices', [PropertyController::class, 'getPrices']);

  // Rutas protegidas correspondientes a los favoritos
  Route::post('/property/{id}/favorite', [PropertyController::class, 'favoriteProperty']);
});
 // Ruta sin proteger correspondiente a las propiedades compartidas
Route::get('/shared-property/{share_url}', [PropertyController::class, 'getSharedProperty']);