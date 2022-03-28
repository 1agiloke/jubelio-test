<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $httpClient;

    function __construct()
    {
        $baseUrl = env('API_URL');
    
        $this->httpClient = new Client([
            'base_uri' => $baseUrl,
            'headers' => [
                'Authorization' => "Bearer " . env('API_KEY')
            ]
        ]);
        // $this->httpClient = Http::withHeaders([
        //     'Authorization' => "Bearer " . env('API_KEY')
        // ]);
    }
}
