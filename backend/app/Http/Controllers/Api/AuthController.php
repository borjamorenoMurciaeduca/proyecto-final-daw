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
use Illuminate\Support\Facades\Hash;
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
     *        in="query",
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
     *     @OA\Parameter(
     *        name="password_confirmation",
     *        in="query",
     *        description="User's password confirmation",
     *        required=true,
     *        @OA\Schema(type="string")
     *    ),
     *     @OA\Parameter(
     *        name="name",
     *       in="query",
     *       description="User's name",
     *      required=false,
     *     @OA\Schema(type="string")
     *      ),
     *      @OA\Parameter(
     *       name="surname",
     *       in="query",
     *      description="User's surname",
     *      required=false,
     *       @OA\Schema(type="string")
     *       ),
     *       @OA\Parameter(
     *       name="birth_date",
     *       in="query",
     *       description="User's birth date",
     *       required=false,
     *       @OA\Schema(type="string")
     *       ),
     *       @OA\Parameter(
     *       name="avatar_url",
     *       in="query",
     *       description="User's avatar url",
     *       required=false,
     *       @OA\Schema(type="string")
     *       ),
     *       @OA\Parameter(
     *       name="phone",
     *       in="query",
     *       description="User's phone",
     *       required=false,
     *       @OA\Schema(type="string")
     *       ),
     *       @OA\Parameter(
     *       name="email",
     *       in="query",
     *       description="User's email",
     *       required=false,
     *       @OA\Schema(type="string")
     *       ),
     *    @OA\Response(response="201", description="Usuario creado con éxito",@OA\JsonContent()),
     *    @OA\Response(response="404", description="No se ha podido procesar",@OA\JsonContent()),
     *    @OA\Response(response="422", description="Error de validación",@OA\JsonContent())
     * )
     */
    public function register(Request $request) {
        try {
            $validatedData = $request->validate([
                'username' => ['required', 'unique:users', 'regex:/^[a-zA-Z0-9_]*$/'],
                'password' => 'required|confirmed',
                'name' => 'nullable | string',
                'surname' => 'nullable | string',
                'birth_date' => 'nullable | date',
                'avatar_url' => 'nullable | string',
                'phone' => 'nullable | string ',
                'email' => 'nullable|email|unique:users,email,NULL,id',
            ]);

            $validatedData['password'] = bcrypt($request->password);
            $user = User::create($validatedData);
            $token = $user->createToken('authToken')->plainTextToken;
            $data = [
                'user' => [
                    'id' => $user->id,
                    'username' => $user->username,
                    'name' => $user->name,
                    'surname' => $user->surname,
                    'birth_date' => $user->birth_date,
                    'avatar_url' => $user->avatar_url,
                    'phone' => $user->phone,
                    'email' => $user->email,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                ],
                'token' => $token
            ];

            return ApiResponse::success('User created successfully!', $data, 201);
        } catch (ValidationException $e) {
            return ApiResponse::error("Validation error!", 422, $e->validator->errors());
        } catch (\Exception $e) {
            return ApiResponse::error('Error processing the request:' . $e->getMessage(), 404);
        }
    }

    /**
     * @OA\Post(
     *    path="/api/login",
     *    summary="Log in a known user",
     *    tags={"Autenticación"},
     *    @OA\Parameter(
     *        name="identifier",
     *         in="query",
     *        description="User's name or email",
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
     *    @OA\Response(response="401", description="Unauthenticated",@OA\JsonContent())
     * )
     */
    public function login(Request $request) {
        $request->validate([
            'identifier' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = ['password' => $request->password];
        $remember = $request->filled('remember');
        $identifier = $request->input('identifier');

        // Verificar si el identificador es un email
        if (filter_var($identifier, FILTER_VALIDATE_EMAIL)) {
            $credentials['email'] = $identifier;
        } else {
            $credentials['username'] = $identifier;
        }

        if (Auth::attempt($credentials, $remember)) {
            /** @var \App\Models\User $user **/
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;
            $data = ["user" => $user, "token" => $token];
            return ApiResponse::success('Successfully logged in!', $data, 200);
        } else {
            return ApiResponse::error('Unauthenticated', 401);
        }
    }


    /**
     * @OA\Get(
     *    path="/api/user",
     *    summary="Show the user panel",
     *    tags={"Autenticación"},
     *    security={{"sanctum":{}}},
     *
     *    @OA\Response(response="200", description="success",@OA\JsonContent()),
     *    @OA\Response(response="404", description="No se ha podido procesar",@OA\JsonContent())
     * )
     */
    public function user() {
        try {
            $user = User::find(Auth::id());
            return ApiResponse::success('success', $user, 200);
        } catch (\Exception $e) {
            return ApiResponse::error('No se ha podido procesar: ' . $e->getMessage(), 404);
        }
    }

    public function editProfile(Request $request) {
        //editar password del usuario
        try {
            $request->validate([
                'name' => 'nullable|string',
                'surname' => 'nullable|string',
                'birth_date' => 'nullable|date',
                'avatar_url' => 'nullable|string',
                'phone' => 'nullable|string',
                'password' => 'nullable|string|confirmed',
            ]);

            $user = User::find(Auth::id());

            if ($request->password !== null && Hash::check($request->password, $user->password)) {
                return ApiResponse::error('Password must be different from the current one', 400);
            }

            if ($request->password !== null) {
                $user->password = bcrypt($request->password);
            }

            $user->update($request->except('password'));
            return ApiResponse::success('User updated successfully!', $user, 200);
        } catch (\Exception $e) {
            return ApiResponse::error('Error processing the request: ' . $e->getMessage(), 404);
        }
    }

    /**
     * @OA\Post(
     *      path="/api/logout",
     *      summary="Log out the user session",
     *      tags={"Autenticación"},
     *    security={{"sanctum":{}}},
     *      @OA\Response(response="200", description="Successfully logged out",@OA\JsonContent()),
     *     @OA\Response(response="400", description="Error logging out",@OA\JsonContent())
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
