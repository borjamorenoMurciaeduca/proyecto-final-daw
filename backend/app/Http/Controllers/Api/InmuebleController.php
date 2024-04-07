<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\HistorialPrecio;
use App\Models\Inmueble;
use App\Models\UsuarioInmueble;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

/**
 * @OA\Tag(
 *     name="Inmueble",
 *     description="Endpoints para operaciones relacionadas con los inmuebles"
 * )
 */
class InmuebleController extends Controller {
    public function index() {
        //
    }

    /**
    * @OA\Post(
     *    path="/api/store",
     *    summary="Store a newly created resource in storage.",
     *    tags={"Inmueble"},
     *    @OA\Parameter(
     *        name="referencia",
     *         in="query",
     *        description="Referencia",
     *        required=true,
     *        @OA\Schema(type="numeric")
     *    ),
     *    @OA\Parameter(
     *        name="fechaBajaAnuncio",
     *        in="query",
     *        description="fecha baja anuncio",
     *        required=true,
     *        @OA\Schema(type="date")
     *    ),
     *    @OA\Response(response="201", description="Inmueble creado exitosamente"),
     *    @OA\Response(response="400", description="Error de validación"),
     *    @OA\Response(response="500", description="Error")
     * )
     */
    public function store(Request $request) {
        try {
            // Iniciar una transacción de base de datos
            DB::beginTransaction();
            $validateInmueble = $request->validate([
                'referencia' => 'numeric|required',
                'fechaBajaAnuncio' => 'date|required',
            ]);

            // Si el usuario ya tiene el inmueble registrado, no se puede registrar de nuevo
            if (UsuarioInmueble::where('referenciaInmueble', $validateInmueble['referencia'])->where('userId', Auth::user()->id)->exists()) {
                return ApiResponse::error('El usuario ya tiene el inmueble registrado',  400);
                // return response()->json(['error' => 'El usuario ya tiene el inmueble registrado'], 400);
            }

            $validateUsuarioInmueble = $request->validate([
                'ubicacion' => 'string|required',
                'tamano' => 'numeric|required',
                'habitaciones' => 'integer|required',
                'garaje' => 'boolean|required',
                'trastero' => 'boolean|required',
            ]);

            $validateHistorial = $request->validate([
                'precio' => 'numeric|required',
                'fechaRegistro' => 'date|required',
            ]);

            // Si el inmueble no existe, lo creamos
            if (!Inmueble::where('referencia', $validateInmueble['referencia'])->exists()) {
                Inmueble::create($validateInmueble);
            }

            // if ($historial = HistorialPrecio::where('referenciaInmueble', $validateInmueble['referencia'])->first()) {
            //     $historial->precio = $validateHistorial['precio'];
            //     $historial->save();
            // } else {
            //     $historial = HistorialPrecio::create([
            //         'referenciaInmueble' => $validateInmueble['referencia'],
            //         'precio' => $validateHistorial['precio'],
            //         'fechaRegistro' => $validateHistorial['fechaRegistro'],
            //     ]);
            // }
            $historial = HistorialPrecio::create([
                'referenciaInmueble' => $validateInmueble['referencia'],
                'precio' => $validateHistorial['precio'],
                'fechaRegistro' => $validateHistorial['fechaRegistro'],
            ]);

            $userInmueble = UsuarioInmueble::create([
                'userId' => Auth::user()->id,
                'referenciaInmueble' => $validateInmueble['referencia'],
                'ubicacion' => $validateUsuarioInmueble['ubicacion'],
                'tamano' => $validateUsuarioInmueble['tamano'],
                'habitaciones' => $validateUsuarioInmueble['habitaciones'],
                'garaje' => $validateUsuarioInmueble['garaje'],
                'trastero' => $validateUsuarioInmueble['trastero'],
            ]);

            DB::commit();
            $data = [
                "usuarioInmueble" => $userInmueble,
                'inmueble' => $validateInmueble,
                'historial' => $historial
            ];
            return ApiResponse::success('Inmueble creado exitosamente', $data, 201);
        } catch (ValidationException $e) {
            DB::rollBack();
            return ApiResponse::error('Error de validación', 400, $e->validator->errors());
        } catch (\Exception $e) {
            DB::rollBack();
            return ApiResponse::error('Error:' . $e->getMessage(), 500);
        }
    }

     /**
    * @OA\Post(
     *    path="/api/show",
     *    summary=" Display the specified resource.",
     *    tags={"Inmueble"},
     *    @OA\Parameter(
     *        name="id",
     *         in="query",
     *        description="id",
     *        required=true,
     *        @OA\Schema(type="string")
     *    ),
     *    @OA\Response(response="200", description="Inmueble encontrado"),
     *    @OA\Response(response="404", description="Inmueble encontrado")
     * )
     */
    public function show(string $id) {
        try {
            $inmueble = Inmueble::findOrFail($id);
            return ApiResponse::success('Inmueble encontrado', $inmueble, 200);
        } catch (\Exception $e) {
            return ApiResponse::error('Inmueble no encontrado', 404);
        }
    }

    /**
    * @OA\Post(
     *    path="/api/storeNewPrice",
     *    summary=" Store a new price.",
     *    tags={"Inmueble"},
     *    @OA\Parameter(
     *        name="id",
     *         in="query",
     *        description="id",
     *        required=true,
     *        @OA\Schema(type="string")
     *    ),
     *    @OA\Response(response="201", description="Precio añadido exitosamente"),
     *    @OA\Response(response="400", description="El inmueble no existe"),
     *    @OA\Response(response="500", description="Error genérico")
     * )
     */
    public function storeNewPrice(Request $request) {
        try {
            DB::beginTransaction();

            $validateInmueble = $request->validate([
                'referencia' => 'numeric|required',
            ]);

            $validateHistorial = $request->validate([
                'precio' => 'numeric|required',
                'fechaRegistro' => 'date|required',
            ]);

            // Si el inmueble no existe, no se puede añadir un precio, devolvemos un 400 
            if (!Inmueble::where('referencia', $validateInmueble['referencia'])->exists()) {
                return ApiResponse::error('El inmueble no existe', 400);
            }

            $historial = HistorialPrecio::create([
                'referenciaInmueble' => $validateInmueble['referencia'],
                'precio' => $validateHistorial['precio'],
                'fechaRegistro' => $validateHistorial['fechaRegistro'],
            ]);

            DB::commit();
            $data = [
                'historial' => $historial
            ];
            return ApiResponse::success('Precio añadido exitosamente', $data, 201);
        } catch (ValidationException $e) {
            DB::rollBack();
            return ApiResponse::error('Error de validación', 400, $e->validator->errors());
        } catch (\Exception $e) {
            DB::rollBack();
            return ApiResponse::error('Error:' . $e->getMessage(), 500);
        }
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}
