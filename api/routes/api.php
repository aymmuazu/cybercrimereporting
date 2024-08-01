<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
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

Route::group([
    'middleware' => 'api',
    'prefix' => 'user'
], function() {
    Route::post('changepassword', [UserController::class, 'changePassword']);
    Route::post('addreport', [UserController::class, 'addReport']);
    Route::get('getreport', [UserController::class, 'getReport']);
    Route::get('getsinglereport/{id}', [UserController::class, 'getSingleReport']);
    Route::post('editsinglereport/{id}', [UserController::class, 'editReport']);

    Route::get('deletereport/{deleteReportId}', [UserController::class, 'deleteReport']);
});