<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HistorialPrecio;
use App\Models\Inmueble;
use App\Models\UsuarioInmueble;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class InmuebleController extends Controller {
    public function index() {
        //
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        try {
            // Iniciar una transacción de base de datos
            DB::beginTransaction();

            $validateInmueble = $request->validate([
                'referencia' => 'numeric|required',
                'fechaBajaAnuncio' => 'date|required',
            ]);

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

            Inmueble::create($validateInmueble);
            $historial = HistorialPrecio::create([
                'referenciaInmueble' => $validateInmueble['referencia'],
                'precio' => $validateHistorial['precio'],
                'fechaRegistro' => $validateHistorial['fechaRegistro'],
            ]);

            $userID = Auth::user()->id;
            UsuarioInmueble::create([
                'userId' => Auth::user()->id,
                'referenciaInmueble' => $validateInmueble['referencia'],
                'ubicacion' => $validateUsuarioInmueble['ubicacion'],
                'tamano' => $validateUsuarioInmueble['tamano'],
                'habitaciones' => $validateUsuarioInmueble['habitaciones'],
                'garaje' => $validateUsuarioInmueble['garaje'],
                'trastero' => $validateUsuarioInmueble['trastero'],
                'fechaBajaAnuncio' => $validateInmueble['fechaBajaAnuncio'],
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Inmueble creado exitosamente',
                'data' => [
                    'inmueble' => $validateInmueble,
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
