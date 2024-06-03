<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\PriceHistory;
use App\Models\Property;
use App\Models\User;
use App\Models\UserProperty;
use App\Models\UserPropertyNote;
use App\Models\TypeProperties;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

/**
 * @OA\Tag(
 *     name="Inmueble",
 *     description="Endpoints para operaciones relacionadas con los inmuebles"
 * )
 */
class PropertyController extends Controller {
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
            $output = shell_exec('python3 ' . escapeshellarg($pythonScriptPath) . ' ' . escapeshellarg($id));
    
            if ($output === null) {
                throw new \Exception('Error al ejecutar el script Python');
            }
    
            $properties = json_decode($output, true);
    
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception('Error al decodificar el JSON devuelto por el script Python');
            }
    
            $property = $this->convertPropertyData($properties);
    
            return $property;
        } catch (\Exception $e) {
            return ApiResponse::error('Inmueble no encontrado', 404);
        }
    }
    
    private function convertPropertyData(array $data) {
        $property = [
            'property_id' => $data['id'] ?? '',
            'title' => $data['title'] ?? '',
            'location' => $data['location'] ?? '',
            'price' => $data['price'] ?? '',
            'size' => $this->extractFeatureValue($data['features'] ?? [], 'm²', 'size'),
            'rooms' => $this->extractFeatureValue($data['features'] ?? [], 'habitaci', 'rooms'),
            'garage' => $this->hasFeature($data['features'] ?? [], 'garaje'),
            'storage_room' => $this->hasFeature($data['features'] ?? [], 'trastero'),
            'bath_rooms' => $this->extractFeatureValue($data['features'] ?? [], 'baño', 'bath_rooms'),
            'description' => $data['description'] ?? '',
            'url_image' => $data['img_url'] ?? '',
            'type_property' => $this->determinePropertyType($data),
            'cancellationDate' => $data['fechaBaja'] ?? null,  
            'status' => $data['status'] ?? 'unknown' 
        ];
    
        return $property;
    }
    
    private function extractFeatureValue(array $features, string $keyword, string $type) {
        foreach ($features as $category => $items) {
            foreach ($items as $item) {
                if (stripos($item, $keyword) !== false) {
                    $matches = [];
                    preg_match('/\d+/', $item, $matches);
                    return isset($matches[0]) ? (int)$matches[0] : '';
                }
            }
        }
        return '';
    }
    
    private function hasFeature(array $features, string $keyword) {
        foreach ($features as $category => $items) {
            foreach ($items as $item) {
                if (stripos($item, $keyword) !== false) {
                    return true;
                }
            }
        }
        return false;
    }
    
    private function determinePropertyType(array $data) {
        $keywords = [
            'property' => ['casa', 'apartamento', 'piso'],
            'garage' => ['garaje', 'parking']
        ];
    
        $text = strtolower(json_encode($data));
        foreach ($keywords as $type => $words) {
            foreach ($words as $word) {
                if (stripos($text, $word) !== false) {
                    return $type;
                }
            }
        }
        return 'others';
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
            }

            $validateUserProperty = $request->validate([
                'title' => 'string|required',
                'location' => 'string|required',
                'size' => 'numeric|required',
                'rooms' => 'integer|required',
                'garage' => 'required',
                'storage_room' => 'required',
                'bath_rooms' => 'integer|required',
                'description' => 'string|required',
                'type_property' => 'string|required'
            ]);
            // Convertir 'true' de string a boolean si es necesario
            $garage = filter_var($request->input('garage'), FILTER_VALIDATE_BOOLEAN);
            $storage_room = filter_var($request->input('storage_room'), FILTER_VALIDATE_BOOLEAN);

            $validateHistory = $request->validate([
                'price' => 'numeric|required',
            ]);

            // Si el inmueble no existe, lo creamos
            if (!Property::where('property_id', $validateProperty['property_id'])->exists()) {
                Property::create($validateProperty);
            }

            $history = PriceHistory::create([
                'property_id_fk' => $validateProperty['property_id'],
                'price' => $validateHistory['price'],
            ]);

            $typeProperty = TypeProperties::where('description', $validateUserProperty['type_property'])->first();

            $userProperty = UserProperty::create([
                'user_id_fk' => Auth::id(),
                'property_id_fk' => $validateProperty['property_id'],
                'title' => $validateUserProperty['title'],
                'location' => $validateUserProperty['location'],
                'size' => $validateUserProperty['size'],
                'rooms' => $validateUserProperty['rooms'],
                'garage' => $garage,
                'storage_room' => $storage_room,
                'bath_rooms' => $validateUserProperty['bath_rooms'],
                'description' => $validateUserProperty['description'],
                'url_image' => $validateProperty['url_image'],
                'type_property' => $typeProperty->type_properties_id
            ]);

            DB::commit();
 
            // devolver respuesta con los datos del inmueble y userInmueble
            $data = [
                'user_id' => Auth::id(),
                'property_id' => $validateProperty['property_id'],
                'title' => $validateUserProperty['title'],
                'location' => $validateUserProperty['location'],
                'size' => $validateUserProperty['size'],
                'rooms' => $validateUserProperty['rooms'],
                'garage' => $garage,
                'storage_room' => $storage_room,
                'bath_rooms' => $validateUserProperty['bath_rooms'],
                'description' => $validateUserProperty['description'],
                'price' => $history->price,
                'is_shared' => $userProperty->is_shared,
                'share_url' => $userProperty->share_url,
                'favorite' => $userProperty->favorite,
                'url_image' => $validateProperty['url_image'] ?? null,
                'type_property' => $validateUserProperty['type_property'] ?? null,
                'cancellation_date' => $validateProperty['cancellation_date'] ?? null,
                'notes' => '',
                'created_at' => $userProperty->created_at,
                'updated_at' => $userProperty->updated_at,
            ];

            return ApiResponse::success('Property created successfully', $data, 201);
        } catch (ValidationException $e) {
            DB::rollBack();
            return ApiResponse::error('Error with validation', 400, $e->validator->errors());
        } catch (\Exception $e) {
            DB::rollBack();
            return ApiResponse::error('Error:' . $e->getMessage(), 500);
        }
    }

    public function updateProperty(Request $request) {
        try {
            DB::beginTransaction();
            $validateProperty = $request->validate([
                'property_id' => 'numeric|required',
                'cancellation_date' => 'date|nullable',
            ]);

            $validateUserProperty = $request->validate([
                'title' => 'string|required',
                'location' => 'string|required',
                'size' => 'numeric|required',
                'rooms' => 'integer|required',
                'garage' => 'required',
                'storage_room' => 'required',
                'bath_rooms' => 'integer|required',
                'description' => 'string|required',
                'type_property' => 'string|required'
            ]);

            $garage = filter_var($request->input('garage'), FILTER_VALIDATE_BOOLEAN);
            $storage_room = filter_var($request->input('storage_room'), FILTER_VALIDATE_BOOLEAN);

            $validateHistory = $request->validate([
                'price' => 'numeric|required',
            ]);

            if (!Property::where('property_id', $validateProperty['property_id'])->exists()) {
                return ApiResponse::error('The property does not exist', 400);
            }

            $history = PriceHistory::create([
                'property_id_fk' => $validateProperty['property_id'],
                'price' => $validateHistory['price'],
            ]);

            $typeProperty = TypeProperties::where('description', $validateUserProperty['type_property'])->first();

            UserProperty::where('property_id_fk', $validateProperty['property_id'])->update([
                'title' => $validateUserProperty['title'],
                'location' => $validateUserProperty['location'],
                'size' => $validateUserProperty['size'],
                'rooms' => $validateUserProperty['rooms'],
                'garage' => $garage,
                'storage_room' => $storage_room,
                'bath_rooms' => $validateUserProperty['bath_rooms'],
                'description' => $validateUserProperty['description'],
                'type_property_fk' => $typeProperty->type_properties_id
            ]);

            $userProperty = UserProperty::where('property_id_fk', $validateProperty['property_id'])->first();

            $notas = $userProperty->notes;

            DB::commit();

            $data = [
                'user_id' => Auth::id(),
                'property_id' => $validateProperty['property_id'],
                'title' => $validateUserProperty['title'],
                'location' => $validateUserProperty['location'],
                'size' => $validateUserProperty['size'],
                'rooms' => $validateUserProperty['rooms'],
                'garage' => $garage,
                'storage_room' => $storage_room,
                'bath_rooms' => $validateUserProperty['bath_rooms'],
                'description' => $validateUserProperty['description'],
                'price' => $history->price,
                'is_shared' => $userProperty->is_shared,
                'share_url' => $userProperty->share_url,
                'favorite' => $userProperty->favorite,
                'url_image' => $validateProperty['url_image'] ?? null,
                'type_property' => $validateUserProperty['type_property'],
                'cancellation_date' => $validateProperty['cancellation_date'] ?? null,
                'notes' => $notas ?? '',
                'created_at' => $userProperty->created_at,
                'updated_at' => $userProperty->updated_at,
            ];
            return ApiResponse::success('Property updated successfully', $data, 200);
        } catch (ValidationException $e) {
            DB::rollBack();
            return ApiResponse::error('Error with validation', 400, $e->validator->errors());
        } catch (\Exception $e) {
            DB::rollBack();
            return ApiResponse::error('Error:' . $e->getMessage(), 500);
        }
    }

    public function storeNewNote(Request $request) {
        try {
            DB::beginTransaction();
            $validateNote = $request->validate([
                'property_id' => 'numeric|required',
                'description' => 'string|required',
                'public' => 'boolean|required',
            ]);

            $isPublicNote = filter_var($request->input('public'), FILTER_VALIDATE_BOOLEAN);

            $userPropertyNotes = UserPropertyNote::create([
                'user_id_fk' => Auth::id(),
                'property_id_fk' => $validateNote['property_id'],
                'description' => $validateNote['description'],
                'public' =>  $isPublicNote,
                'updated_at' => null
            ]);

            DB::commit();

            $data = [
                'id' => $userPropertyNotes['id'],
                'user_id' => Auth::id(),
                'property_id' => $validateNote['property_id'],
                'description' => $validateNote['description'],
                'public' =>  $validateNote['public'],
                'created_at' => $userPropertyNotes->created_at,
                'updated_at' => $userPropertyNotes->updated_at,
            ];
            return ApiResponse::success('Note created successfully', $data, 201);
        } catch (ValidationException $e) {
            DB::rollBack();
            return ApiResponse::error('Error with validation', 400, $e->validator->errors());
        } catch (\Exception $e) {
            DB::rollBack();
            return ApiResponse::error('Error:' . $e->getMessage(), 500);
        }
    }

    public function deleteNote(int $noteId) {
        try {

            DB::beginTransaction();

            $note = UserPropertyNote::findOrFail($noteId);

            if ($note->user_id_fk !== Auth::id()) {
                return ApiResponse::error('You are not authorized to delete this note', 403);
            }

            $note->delete();

            DB::commit();

            return ApiResponse::success(['message' => 'Note removed successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return ApiResponse::error('Error:' . $e->getMessage(), 500);
        }
    }

    public function updateNote(Request $request, int $noteId) {
        try {
            $validatedData = $request->validate([
                'property_id' => 'numeric|required',
                'description' => 'string|required',
                'public' => 'boolean|required',
            ]);

            $note = UserPropertyNote::findOrFail($noteId);

            $note->update($validatedData);

            $data = [
                'id' => $note['id'],
                'user_id' => Auth::id(),
                'property_id' => $note['property_id_fk'],
                'description' => $note['description'],
                'public' =>  $note['public'],
                'created_at' => $note->created_at,
                'updated_at' => $note->updated_at,
            ];
            return ApiResponse::success('Note created successfully', $data, 201);
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
    public function getAllUserProperties() {
        try {
            $userId = Auth::id();
            $userProperty = UserProperty::where('user_id_fk', $userId)->with('property')->get();
            
            // Mapear los datos para combinarlos en un solo JSON
            $inmuebles = $userProperty->map(function ($userProperty) {
                $property = $userProperty->property;
                $notas = $userProperty->notes;
                $typeProperty = TypeProperties::find($userProperty['type_property_fk']);
                return [
                    'user_id' => $userProperty->user_id_fk,
                    "property_id" => $userProperty->property_id_fk,
                    'title' => $userProperty->title,
                    'location' => $userProperty->location,
                    'size' => $userProperty->size,
                    'rooms' => $userProperty->rooms,
                    'garage' => $userProperty->garage  == 1 ? true : false,
                    'storage_room' => $userProperty->storage_room  == 1 ? true : false,
                    'bath_rooms' => $userProperty->bath_rooms,
                    'description' => $userProperty->description,
                    'price' => $property->last_price,
                    'url_image' => $property->url_image,
                    'is_shared' => $userProperty->is_shared,
                    'share_url' => $userProperty->share_url,
                    'favorite' => $userProperty->favorite,
                    'type_property' => $typeProperty->description,
                    'cancellation_date' => $property->cancellation_date,
                    'notes' => $notas,
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
            $userProperty = UserProperty::where('property_id_fk', $id)->first();
            $typeProperty = TypeProperties::find($userProperty['type_property_fk']);

            $data = [
                'user_id' => $userProperty->user_id_fk,
                'property_id' => $userProperty->property_id_fk,
                'title' => $userProperty->title,
                'location' => $userProperty->location,
                'size' => $userProperty->size,
                'rooms' => $userProperty->rooms,
                'garage' => $userProperty->garage,
                'storage_room' => $userProperty->storage_room,
                'bath_rooms' => $userProperty->bath_rooms,
                'description' => $userProperty->description,
                'price' => $property->last_price,
                'url_image' => $property->url_image,
                'is_shared' => $userProperty->is_shared,
                'share_url' => $userProperty->share_url,
                'favorite' => $userProperty->favorite,
                'type_property' => $typeProperty->description,
                'cancellation_date' => $property->cancellation_date,
                'created_at' => $userProperty->created_at,
                'updated_at' => $userProperty->updated_at,
            ];
            return ApiResponse::success('Property found', $data, 200);
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

            $propertyId = $request->route('id');

            $validateHistory = $request->validate([
                'price' => 'numeric|required',
            ]);

            if (!Property::where('property_id', $propertyId)->exists()) {
                return ApiResponse::error('El inmueble no existe', 400);
            }

            $history = PriceHistory::create([
                'property_id_fk' => $propertyId,
                'price' => $validateHistory['price'],
            ]);

            $data = [
                'property_id' =>  $propertyId,
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


    public function getPrices(string $id) {
        try {
            $property = Property::findOrFail($id);
            $prices = PriceHistory::where('property_id_fk', $id)->get();
            $data = [
                'property_id' => $id,
                'prices' => $prices,
                'created_at' => $property->created_at,
                'updated_at' => $property->updated_at,
            ];
            return ApiResponse::success('Prices found', $data, 200);
        } catch (\Exception $e) {
            return ApiResponse::error('Prices not found', 404);
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
    public function shareProperty($propertyId) {
        $property = Property::find($propertyId);
        $userProperty = UserProperty::where('property_id_fk', $propertyId)->first();
        if ($property && $userProperty) {
            // Generar el URL compartido
            $randomUrl = Str::random(8);
            while (UserProperty::where('share_url', $randomUrl)->exists()) {
                $randomUrl = Str::random(8);
            }
            UserProperty::where('property_id_fk', $propertyId)
                ->update(['is_shared' => true, 'share_url' => $randomUrl]);
            return ApiResponse::success('Property shared successfully', ['share_url' => $randomUrl], 200);
        } else {
            return ApiResponse::error('Property not found', 404);
        }
    }

    public function revokeShareProperty($propertyId) {
        try {
            DB::beginTransaction();
            $userProperty = UserProperty::where('property_id_fk', $propertyId)->first();
            if ($userProperty) {
                $isShared = !$userProperty->is_shared;

                UserProperty::where('property_id_fk', $propertyId)->update([
                    'is_shared' => false,
                    'share_url' => null
                ]);

                $data = [
                    'property_id' => $userProperty->property_id_fk,
                    'is_shared' => false,
                    'share_url' => null,
                ];

                DB::commit();
                return ApiResponse::success('Property private updated successfully', $data, 200);
            } else {
                return ApiResponse::error('Property not found', 404);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return ApiResponse::error('An error occurred: ' . $e->getMessage(), 500);
        }
    }

    public function getSharedProperty($shareUrl) {
        $userProperty = UserProperty::where('share_url', $shareUrl)->first();
        if ($userProperty) {
            $property = Property::find($userProperty->property_id_fk);
            $typeProperty = TypeProperties::findOrFail($userProperty['type_property_fk']);
            $userInfo = User::find($userProperty->user_id_fk);
            $data = [
                'username' => $userInfo->username,
                'name' => $userInfo->name,
                'property_id' => $userProperty->property_id_fk,
                'title' => $userProperty->title,
                'location' => $userProperty->location,
                'size' => $userProperty->size,
                'rooms' => $userProperty->rooms,
                'garage' => $userProperty->garage,
                'storage_room' => $userProperty->storage_room,
                'bath_rooms' => $userProperty->bath_rooms,
                'description' => $userProperty->description,
                'price' => $property->last_price,
                'url_image' => $property->url_image,
                'type_property' => $typeProperty->description,
                'cancellation_date' => $property->cancellation_date,
                'created_at' => $userProperty->created_at,
                'updated_at' => $userProperty->updated_at,
            ];
            return ApiResponse::success('Property found', $data, 200);
        } else {
            return ApiResponse::error('Property not found', 404);
        }
    }

    public function favoriteProperty($propertyId) {
        $userProperty = UserProperty::where('property_id_fk', $propertyId)->first();
        if ($userProperty) {
            $fav = !$userProperty->favorite;
            UserProperty::where('property_id_fk', $propertyId)
                ->update(['favorite' => $fav]);
            $data = [
                'property_id' => $userProperty->property_id_fk,
                'favorite' => $fav,
            ];
            return ApiResponse::success('Property updated successfully', $data, 200);
        } else {
            return ApiResponse::error('Property not found', 404);
        }
    }

    public function deleteMultiple(Request $request) {
        $ids = $request->input('ids');

        if (!is_array($ids)) {
            return ApiResponse::error('Invalid data', 400);
        }
        try {
            $deleteRows = UserProperty::whereIn('property_id_fk', $ids)->delete();
            if ($deleteRows === 0) {
                return ApiResponse::error('Properties not found', 404);
            }
            return ApiResponse::success('Properties deleted successfully', null, 200);
        } catch (\Exception $e) {
            return ApiResponse::error('Error:' . $e->getMessage(), 500);
        }
    }
}
