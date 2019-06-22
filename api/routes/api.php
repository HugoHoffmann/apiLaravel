<?php

use Illuminate\Http\Request;

Route::group(['middleware' => ['cors']], function() {
    Route::get('/todo', 'TodoController@index');
    Route::get('/todo/{id}', 'TodoController@show');
    Route::post('/todo', 'TodoController@store');
    Route::put('/todo/{id}', 'TodoController@update');
    Route::delete('/todo/{id}', 'TodoController@delete');    
});