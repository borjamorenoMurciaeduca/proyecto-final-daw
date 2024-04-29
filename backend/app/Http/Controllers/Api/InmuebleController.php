<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\HistorialPrecio;
use App\Models\Inmueble;
use App\Models\PriceHistory;
use App\Models\Property;
use App\Models\UserProperty;
use App\Models\UsersProperties;
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
     * @OA\Get(
     *    path="/api/prepare-inmueble",
     *    summary=" Display the specified resource.",
     *    tags={"Inmueble"},
     *    @OA\Parameter(
     *        name="id",
     *        in="query",
     *        description="id",
     *        required=true,
     *        @OA\Schema(type="string")
     *    ),
     *    @OA\Response(response="200", description="Inmueble encontrado"),
     *    @OA\Response(response="404", description="Inmueble encontrado")
     * )
     */
    public function prepare(string $id) {
        try {

            $pythonScriptPath = base_path('storage/python/python-scrapping.py');

            //info('Entrando a prepare con id: ' . $id . ' en la ruta ' . $pythonScriptPath);

            $output = shell_exec('python3 ' . escapeshellarg($pythonScriptPath) . ' ' . escapeshellarg($id));

            //info('output: ' . $output);

            $properties = json_decode($output, true);

            return $properties;
        } catch (\Exception $e) {
            return ApiResponse::error('Inmueble no encontrado', 404);
        }
    }

    /**
     * @OA\Post(
     *    path="/api/inmueble",
     *    summary="Store a newly created resource in storage.",
     *    tags={"Inmueble"},
     *    security={{"sanctum":{}}},
     *    @OA\Parameter(
     *        name="referencia",
     *        in="query",
     *        description="Referencia",
     *        required=true,
     *        @OA\Schema(type="number")
     *    ),
     *    @OA\Parameter(
     *        name="ubicacion",
     *        in="query",
     *        description="Ubicación",
     *        required=true,
     *        @OA\Schema(type="string")
     *    ),
     *    @OA\Parameter(
     *        name="tamano",
     *        in="query",
     *        description="Tamaño",
     *        required=true,
     *        @OA\Schema(type="integer")
     *    ),
     *    @OA\Parameter(
     *        name="habitaciones",
     *        in="query",
     *        description="Habitaciones",
     *        required=true,
     *        @OA\Schema(type="integer")
     *    ),
     *    @OA\Parameter(
     *        name="garaje",
     *        in="query",
     *        description="Garaje",
     *        required=true,
     *        @OA\Schema(type="boolean")
     *    ),
     *    @OA\Parameter(
     *        name="trastero",
     *        in="query",
     *        description="Trastero",
     *        required=true,
     *        @OA\Schema(type="boolean")
     *    ),
     *    @OA\Parameter(
     *      name="precio",
     *      in="query",
     *      description="Precio",
     *      required=true,
     *      @OA\Schema(type="number")
     *   ),
     *    @OA\Parameter(
     *      name="urlImagen",
     *      in="query",
     *      description="URL de la imagen",
     *      required=false,
     *      @OA\Schema(type="string")
     *      ), 
     *    @OA\Parameter(
     *        name="fechaBajaAnuncio",
     *        in="query",
     *        description="fecha baja anuncio",
     *        required=false,
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
            $validateProperty = $request->validate([
                'property_id' => 'numeric|required',
                'cancellation_date' => 'date|nullable',
                'url_image' => 'string|nullable',
            ]);

            // Si el usuario ya tiene el inmueble registrado, no se puede registrar de nuevo
            if (UserProperty::where('property_id_fk', $validateProperty['property_id'])->where('user_id_fk', Auth::user()->id)->exists()) {
                return ApiResponse::error('The user already has the property registered', 400);
                // return response()->json(['error' => 'El usuario ya tiene el inmueble registrado'], 400);
            }

            $validateUserProperty = $request->validate([
                'location' => 'string|required',
                'size' => 'numeric|required',
                'rooms' => 'integer|required',
                'garage' => 'required',
                'storage_room' => 'required',
            ]);
            // Convertir 'true' de string a boolean si es necesario
            $garage = filter_var($request->input('garage'), FILTER_VALIDATE_BOOLEAN);
            $storage_room = filter_var($request->input('storage_room'), FILTER_VALIDATE_BOOLEAN);

            $validateHistory = $request->validate([
                'price' => 'numeric|required',
                // 'fechaRegistro' => 'date|required',
            ]);

            // Si el inmueble no existe, lo creamos
            if (!Property::where('property_id', $validateProperty['property_id'])->exists()) {
                Property::create($validateProperty);
            }

            $history = PriceHistory::create([
                'property_id_fk' => $validateProperty['property_id'],
                'price' => $validateHistory['price'],
                // 'fechaRegistro' => $validateHistorial['fechaRegistro'],
            ]);

            $userInmueble = UserProperty::create([
                'user_id_fk' => Auth::user()->id,
                'property_id_fk' => $validateProperty['property_id'],
                'location' => $validateUserProperty['location'],
                'size' => $validateUserProperty['size'],
                'rooms' => $validateUserProperty['rooms'],
                // 'garaje' => $validateUsuarioInmueble['garaje'],
                // 'trastero' => $validateUsuarioInmueble['trastero'],
                'garage' => $garage,
                'storage_room' => $storage_room,
            ]);

            DB::commit();
            // $data = [
            //     "usuarioInmueble" => $userInmueble,
            //     'inmueble' => [
            //         $validateProperty,
            //         'historial_precio' => [$historial]
            //     ],
            // ];
            // devolver respuesta con los datos del inmueble y userInmueble
            $data = [
                'property_id' => $validateProperty['property_id'],
                'location' => $validateUserProperty['location'],
                'size' => $validateUserProperty['size'],
                'rooms' => $validateUserProperty['rooms'],
                'garage' => $garage,
                'storage_room' => $storage_room,
                'price' => $history->price,
                'url_image' => $validateProperty['url_image'] ?? null,
                'cancellation_date' => $validateProperty['cancellation_date'] ?? null,
                'created_at' => $userInmueble->created_at,
                'updated_at' => $userInmueble->updated_at,
            ];

            // $data = [
            //     'referencia' => $validateProperty['referencia'],
            //     'ubicacion' => $validateUsuarioInmueble['ubicacion'],
            //     'tamano' => $validateUsuarioInmueble['tamano'],
            //     'habitaciones' => $validateUsuarioInmueble['habitaciones'],
            //     'garaje' => $validateUsuarioInmueble['garaje'],
            //     'trastero' => $validateUsuarioInmueble['trastero'],
            //     'ultimo_precio' => $historial->precio,
            //     'fechaBajaAnuncio' => $validateProperty['fechaBajaAnuncio'] ?? null,
            //     'urlImagen' => $validateProperty['urlImagen'] ?? null,
            //     'fechaRegistro' => $userInmueble->created_at,
            //     "fechaActualizacion" => $userInmueble->updated_at,
            // ];
            return ApiResponse::success('Property created successfully', $data, 201);
        } catch (ValidationException $e) {
            DB::rollBack();
            return ApiResponse::error('Error with validation', 400, $e->validator->errors());
        } catch (\Exception $e) {
            DB::rollBack();
            return ApiResponse::error('Error:' . $e->getMessage(), 500);
        }
    }

    /**
     * @OA\Get(
     *    path="/api/inmueble",
     *    summary=" Display the specified resource.",
     *    tags={"Inmueble"},
     * security={{"sanctum":{}}},
     *    @OA\Response(response="200", description="Inmuebles encontrados"),
     *    @OA\Response(response="404", description="Inmuebles no encontrados")
     * )
     */
    /**
     * Muestra la lista de inmuebles de un usuario autenticado con sus precios pero sin el historial de precios 
     * userId = usuario que está autenticado
     * with('property') = traer los datos del inmueble (property es el nombre de la relación en UserProperty)
     */
    public function getAll() {
        try {
            $userId = Auth::id();
            $userProperty = UserProperty::where('user_id_fk', $userId)->with('property')->get();
            // Mapear los datos para combinarlos en un solo JSON
            $inmuebles = $userProperty->map(function ($userProperty) {
                return [
                    'user_id' => $userProperty->user_id_fk,
                    "propery_id" => $userProperty->property_id_fk,
                    'location' => $userProperty->location,
                    'size' => $userProperty->size,
                    'rooms' => $userProperty->rooms,
                    'garage' => $userProperty->garage  == 1 ? true : false,
                    'storage_room' => $userProperty->storage_room  == 1 ? true : false,
                    'price' => $userProperty->price,
                    'url_image' => $userProperty->url_image,
                    'cancellation_date' => $userProperty->cancellation_date,
                    'created_at' => $userProperty->created_at,
                    'updated_at' => $userProperty->updated_at,
                ];
            });
            return ApiResponse::success('Properties found', $inmuebles, 200);
        } catch (\Exception $e) {
            return ApiResponse::error('Properties not found' . $e->getMessage(), 404);
        }
    }

    public function show(string $id) {
        try {
            $property = Property::findOrFail($id);
            return ApiResponse::success('Property found', $property, 200);
        } catch (\Exception $e) {
            return ApiResponse::error('Property not found', 404);
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

            $validateProperty = $request->validate([
                'property_id' => 'numeric|required',
            ]);

            $validateHistory = $request->validate([
                'price' => 'numeric|required',
                // 'fechaRegistro' => 'date|required',
            ]);

            // Si el inmueble no existe, no se puede añadir un precio, devolvemos un 400 
            if (!Property::where('property_id', $validateProperty['property_id'])->exists()) {
                return ApiResponse::error('El inmueble no existe', 400);
            }

            $history = PriceHistory::create([
                'property_id_fk' => $validateProperty['property_id'],
                'price' => $validateHistory['price'],
            ]);

            $data = [
                'property_id' => $validateProperty['property_id'],
                'price' => $history->price,
                'created_at' => $history->created_at,
            ];
            DB::commit();
            return ApiResponse::success('Price updated successfully', $data, 201);
        } catch (ValidationException $e) {
            DB::rollBack();
            return ApiResponse::error('Validation error', 400, $e->validator->errors());
        } catch (\Exception $e) {
            DB::rollBack();
            return ApiResponse::error('Error:' . $e->getMessage(), 500);
        }
    }
    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(string $id) {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, string $id) {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(string $id) {
    //     //
    // }
}
