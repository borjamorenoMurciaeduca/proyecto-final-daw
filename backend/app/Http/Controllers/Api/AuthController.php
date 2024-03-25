<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller {
    public function register(Request $request) {
        $validatedData = $request->validate([
            'username' => ['required', 'unique:users', 'regex:/^[a-zA-Z0-9_]*$/'],
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed'
        ]);
        $validatedData['password'] = bcrypt($request->password);
        $user = User::create($validatedData);
        $token = $user->createToken('authToken')->plainTextToken;
        return response()->json(['user' => $user, 'token' => $token], 201);
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

            return response()->json(['user' => $user, 'token' => $token], 200);
            // return response()->json(['user' => $user, 'token' => $token], 200)->withoutCookie($cookie);
        } else {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }
    }

    public function userProfile() {
        return response()->json([
            'mensaje' => 'Hola',
            'numero' => 123,
            'booleano' => true,
            'datos' => [
                'nombre' => 'Juan',
                'apellido' => 'Pérez',
                'edad' => 30,
            ]
        ], 200);
        // return response()->json($request->user(), 200);
    }

    public function users() {
        return response()->json(User::all(), 200);
    }

    public function logout(Request $request) {
        // try {
        $cookie = Cookie::forget('cookie_token');
        $request->user()->tokens()->delete();
        Auth::guard('web')->logout();
        return response()->json(['message' => 'Successfully logged out'], 200)->withCookie($cookie);
        // } catch (Exception $e) {
        //     return response()->json('No se ha podido procesar', 404);
        // }
    }
}
