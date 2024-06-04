<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *     title="IdealistaWatch API - Plataforma para el Monitoreo de Propiedades en Idealista",
 *     version="1.0.0",
 *     description="IdealistaWatch API proporciona acceso a datos y funciones para monitorear propiedades en la plataforma Idealista. Con esta API, los desarrolladores pueden acceder a información detallada sobre propiedades en venta o alquiler, recibir notificaciones de cambios en listados, y realizar análisis avanzados de mercado. Optimiza tu experiencia con IdealistaWatch y maximiza tus oportunidades en el mercado inmobiliario."
 * )
 */

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
