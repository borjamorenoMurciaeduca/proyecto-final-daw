<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HistorialPrecio;
use App\Models\User;
use App\Models\UsuarioInmueble;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller {
    public function register(Request $request) {
        $validatedData = $request->validate([
            'username' => ['required', 'unique:users', 'regex:/^[a-zA-Z0-9_]*$/'],
            'password' => 'required|confirmed'
        ]);
        $validatedData['password'] = bcrypt($request->password);
        $user = User::create($validatedData);
        $token = $user->createToken('authToken')->plainTextToken;
        return response()->json([
            'messsage' => 'Usuario creado con éxito',
            'data' => [
                'user' => $user,
                'token' => $token
            ]
        ], 201);
        // } catch (ValidationException $e) {
        //     return response()->json(['errors' => $e->validator->errors()], 422);
        // } catch (Exception $e) {
        //     return response()->json('No se ha podido procesar', 404);
        // }
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

            return response()->json([
                'message' => 'Acceso exitoso!',
                'data' => [
                    'user' => $user,
                    'token' => $token
                ]
            ], 200);
            // return response()->json(['user' => $user, 'token' => $token], 200)->withoutCookie($cookie);
        } else {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }
    }

    public function user() {
        $userId = Auth::id();
        $user = User::find($userId);

        // Buscamos los inmuebles del usuario y sus precios
        // inmueble e historialPrecio son relaciones definidas en los modelos
        $usuarioInmuebles = UsuarioInmueble::with('inmueble.historialPrecio')->where('userId', $userId)->get();

        return response()->json([
            'message' => 'success',
            'data' => ['user' => $user, 'usuarioInmuebles' => $usuarioInmuebles]
        ], 200);
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
            return response()->json(['message' => 'Successfully logged out'], 200)->withCookie($cookie);
        } catch (\Exception $e) {
            return response()->json('No se ha podido procesar', 404);
        }
    }
}
