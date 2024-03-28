<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\HistorialPrecio;
use App\Models\User;
use App\Models\UsuarioInmueble;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Validation\ValidationException;
use Spatie\FlareClient\Api;

class AuthController extends Controller {
    public function register(Request $request) {
        try {
            $validatedData = $request->validate([
                'username' => ['required', 'unique:users', 'regex:/^[a-zA-Z0-9_]*$/'],
                'password' => 'required|confirmed'
            ]);
            $validatedData['password'] = bcrypt($request->password);
            $user = User::create($validatedData);
            $token = $user->createToken('authToken')->plainTextToken;
            $data = ['user' => $user, 'token' => $token];
            return ApiResponse::success('Usuario creado con éxito', $data, 201);
        } catch (ValidationException $e) {
            return ApiResponse::error("Error de validación", 422, $e->validator->errors());
        } catch (\Exception $e) {
            return ApiResponse::error('No se ha podido procesar: ' . $e->getMessage(), 404);
        }
    }

    public function login(Request $request) {
        $credentials = $request->only('username', 'password');
        $remember = $request->filled('remember');
        //rememberToken no cambia
        if (Auth::attempt($credentials, $remember)) {
            /** @var \App\Models\User $user **/
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;
            $cookie = cookie('cookie_token', $token, 60 * 24);
            $data = ['user' => $user, 'token' => $token];
            return ApiResponse::success('Acceso exitoso!',  $data, 200);
        } else {
            return ApiResponse::error('Unauthenticated', 401);
        }
    }

    public function user() {
        try {
            $userId = Auth::id();
            $user = User::find($userId);

            // Buscamos los inmuebles del usuario y sus precios
            // inmueble e historialPrecio son relaciones definidas en los modelos
            $usuarioInmuebles = UsuarioInmueble::with('inmueble.historialPrecio')->where('userId', $userId)->get();
            $data = ['user' => $user, 'usuarioInmuebles' => $usuarioInmuebles];
            return ApiResponse::success('success', $data, 200);
        } catch (\Exception $e) {
            return ApiResponse::error('No se ha podido procesar: ' . $e->getMessage(), 404);
        }
    }

    // public function userOld() {
    //     $userId = Auth::id();
    //     $user = User::find($userId);

    //     $usuarioInmuebles = UsuarioInmueble::where('userId', $userId)->get();
    //     $referencias = $usuarioInmuebles->pluck('referenciaInmueble');
    //     $precio = HistorialPrecio::whereIn('referenciaInmueble', $referencias)->get();
    //     return response()->json([
    //         'message' => 'success',
    //         'data' => ['user' => $user, 'usuarioInmuebles' => $usuarioInmuebles, "precio" => $precio]
    //     ], 200);
    // }

    public function logout(Request $request) {
        try {
            $cookie = Cookie::forget('cookie_token');
            $request->user()->tokens()->delete();
            Auth::guard('web')->logout();
            return ApiResponse::success('Successfully logged out', [], 200)->withCookie($cookie);
        } catch (\Exception $e) {
            return ApiResponse::error('Error logging out:' . $e->getMessage(), 400);
        }
    }
}
