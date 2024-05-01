<?php

namespace App\Helpers;

use Illuminate\Http\Response;

class ApiResponse {
  public static function success($message = 'Success', $data = [], $status = 200,) {
    $response = [
      'message' => $message,
      'status' => $status,
      'error' => false,
      'data' => $data,
    ];

    return response()->json($response, $status);
  }
  public static function error($message = 'Error', $status = 400, $data = []) {
    $response = [
      'message' => $message,
      'status' => $status,
      'error' => true,
      'data' => $data,
    ];

    return response()->json($response, $status);
  }
}
