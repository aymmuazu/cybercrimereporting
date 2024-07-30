<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegisterController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {

    Route::post('register', [RegisterController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});