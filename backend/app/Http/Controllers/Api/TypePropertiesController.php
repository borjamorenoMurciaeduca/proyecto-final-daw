<?php

namespace App\Http\Controllers\Api;

use App\Models\TypeProperties;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TypePropertiesController extends Controller
{
    public function getAllTypeProperties() {
        try {
            $userId = Auth::id();

            $typeProperties = TypeProperties::all();
            return ApiResponse::success('Type properties found', $typeProperties, 200);
        } catch (\Exception $e) {
            return ApiResponse::error('Type properties not found' . $e->getMessage(), 404);
        }
    }
}
