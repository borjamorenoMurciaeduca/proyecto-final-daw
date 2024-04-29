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

/**
 * @OA\Tag(
 *     name="Autenticación",
 *     description="Endpoints para operaciones relacionadas con la autenticación"
 * )
 */
class AuthController extends Controller {

    /**
    * @OA\Post(
     *    path="/api/register",
     *    summary="Register a new user",
     *    tags={"Autenticación"},
     *    @OA\Parameter(
     *        name="username",
     *         in="query",
     *        description="User's name",
     *        required=true,
     *        @OA\Schema(type="string")
     *    ),
     *    @OA\Parameter(
     *        name="password",
     *        in="query",
     *        description="User's password",
     *        required=true,
     *        @OA\Schema(type="string")
     *    ),
     *    @OA\Response(response="201", description="Usuario creado con éxito"),
     *    @OA\Response(response="404", description="No se ha podido procesar"),
     *    @OA\Response(response="422", description="Error de validación")
     * )
     */
    public function register(Request $request) {
        try {
            $validatedData = $request->validate([
                'username' => ['required', 'unique:users', 'regex:/^[a-zA-Z0-9_]*$/'],
                'password' => 'required|confirmed'
            ]);
            $validatedData['password'] = bcrypt($request->password);
            $user = User::create($validatedData);
            $token = $user->createToken('authToken')->plainTextToken;
            $cookie = cookie('user_token', $token, 60 * 8);
            $data = ['user' => $user, 'token' => $token];
            return ApiResponse::success('Usuario creado con éxito', $data, 201)->withCookie($cookie);
            // return ApiResponse::success('Usuario creado con éxito', $data, 201);
        } catch (ValidationException $e) {
            return ApiResponse::error("Error de validación", 422, $e->validator->errors());
        } catch (\Exception $e) {
            return ApiResponse::error('No se ha podido procesar: ' . $e->getMessage(), 404);
        }
    }

    /**
    * @OA\Post(
    *    path="/api/login",
    *    summary="Log in a known user",
    *    tags={"Autenticación"},
    *    @OA\Parameter(
    *        name="username",
    *         in="query",
    *        description="User's name",
    *        required=true,
    *        @OA\Schema(type="string")
    *    ),
    *    @OA\Parameter(
    *        name="password",
    *        in="query",
    *        description="User's password",
    *        required=true,
    *        @OA\Schema(type="string")
    *    ),
    *    @OA\Parameter(
    *        name="remember",
    *        in="query",
    *        description="Flag to remember the user",
    *        required=false,
    *        @OA\Schema(type="string")
    *    ),
    *    @OA\Response(response="401", description="Unauthenticated")
    * )
    */
    public function login(Request $request) {
        $credentials = $request->only('username', 'password');
        $remember = $request->filled('remember');
        //rememberToken no cambia
        if (Auth::attempt($credentials, $remember)) {
            /** @var \App\Models\User $user **/
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;
            $cookie = cookie('user_token', $token, 60 * 8); 

            $data = ['user' => $user, 'token' => $token];
            //return con cookie
            // return ApiResponse::success('Acceso exitoso!',  $data, 200)->withCookie($cookie);
            return ApiResponse::success('Acceso exitoso!',  $data, 200);
        } else {
            return ApiResponse::error('Unauthenticated', 401);
        }
    }

    /**
    * @OA\Get(
    *    path="/api/user",
    *    summary="Show the user panel",
    *    tags={"Autenticación"},
    *    @OA\Response(response="200", description="success"),
    *    @OA\Response(response="404", description="No se ha podido procesar")
    * )
    */
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

    /**
  * @OA\Post(
  *      path="/api/logout",
  *      summary="Log out the user session",
  *      tags={"Autenticación"},
  *      @OA\Response(response="200", description="Successfully logged out"),
  *     @OA\Response(response="400", description="Error logging out")
  * ) 
  */   
    public function logout(Request $request) {
        try {
            $cookie = Cookie::forget('user_token');
            $request->user()->tokens()->delete();
            Auth::guard('web')->logout();
            return ApiResponse::success('Successfully logged out', [], 200)->withCookie($cookie);
        } catch (\Exception $e) {
            return ApiResponse::error('Error logging out:' . $e->getMessage(), 400);
        }
    }
}
