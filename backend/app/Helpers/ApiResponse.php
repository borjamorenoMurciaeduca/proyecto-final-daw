<?php

namespace App\Helpers;

use Illuminate\Http\Response;

class ApiResponse {
  public static function success($message = 'Success', $data = [], $statusCode = 200,) {
    $response = [
      'message' => $message,
      'statusCode' => $statusCode,
      'error' => false,
      'data' => $data,
    ];

    return response()->json($response, $statusCode);
  }
  public static function error($message = 'Error', $statusCode = 400, $data = []) {
    $response = [
      'message' => $message,
      'statusCode' => $statusCode,
      'error' => true,
      'data' => $data,
    ];

    return response()->json($response, $statusCode);
  }
}
