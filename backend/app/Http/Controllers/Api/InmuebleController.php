<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HistorialPrecio;
use App\Models\Inmueble;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InmuebleController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        try {
            // Iniciar una transacción de base de datos
            DB::beginTransaction();
            $validate = $request->validate([
                'referencia' => 'string|required',
                'ubicacion' => 'string|required',
                'tamano' => 'numeric|required',
                'habitaciones' => 'integer|required',
                'garaje' => 'boolean|required',
                'trastero' => 'boolean|required',
                'fechaBajaAnuncio' => 'date|required',
            ]);
            $validateHistorial = $request->validate([
                'precio' => 'numeric|required',
                'fechaRegistro' => 'date|required',
            ]);
            Inmueble::create($validate);
            $historial = HistorialPrecio::create([
                'referenciaInmueble' => $validate['referencia'],
                'precio' => $validateHistorial['precio'],
                'fechaRegistro' => $validateHistorial['fechaRegistro'],
            ]);
            DB::commit();
            return response()->json([
                'message' => 'Inmueble creado exitosamente',
                'data' => [
                    'inmueble' => $validate,
                    'historial' => $historial
                ]
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        $inmueble = Inmueble::find($id);
        if ($inmueble) {
            return response()->json($inmueble, 200);
        } else {
            return response()->json('Inmueble no encontrado', 404);
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
