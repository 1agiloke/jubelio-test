<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use GuzzleHttp\Psr7;
use GuzzleHttp\Client;
use PDO;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        return view('product.index');
    }

    public function list(Request $request, $page){
        $baseUrl = env('API_URL');
        $productRes = $this->httpClient->get("/products/$page");

        $productResObj = json_decode($productRes->getBody());
        $response = [];
        if($productResObj && isset($productResObj->products)){
            $response = [
                'total'  =>  $productResObj->total,
                'totalPage' => $productResObj->totalPage,
                'products' => $productResObj->products
            ];
        }

        return response()->json($response);
    }

    public function update(Request $request, $id=null){
        $name = $request->name;
        $price = $request->price;
        $description = $request->description;
        $sku = $request->sku;

        $file = $request->file('image');

        if($file){
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = base_path() .'/public_html/documents/';
        }

        $reqData = [
            [
                'name' => 'name',
                'contents' => $name,
            ],
            [
                'name' => 'price',
                'contents' => $price,
            ],
            [
                'name' => 'description',
                'contents' => $description,
            ],
            [
                'name' => 'sku',
                'contents' => $sku,
            ],
        ];
        if($file){
            $reqData['image'] = [
                'name' => 'image',
                'contents' => Psr7\Utils::tryFopen($file, 'r'),
            ];
        }
        $boundary = 'my_custom_boundary';
        $method = 'post';
        $url = "/product";
        if(isset($id)){
            $id = intval($id);
            $method = 'put';
            $url .= "/$id";
        }
        // dd($url);
        $productRes = $this->httpClient->request($method, $url, [
            // 'headers' => [
            //     'Connection' => 'close',
            //     'Content-Type' => 'multipart/form-data; boundary='.$boundary,
            // ],
            // 'body' => new Psr7\MultipartStream($reqData, $boundary), // here is all the magic
            'multipart' => $reqData
        ]);
        // dd($productRes);
        $productResObj = json_decode($productRes->getBody());
        return response()->json($productResObj);
    }

    public function delete($id){
        $id = intval($id);
        $productRes = $this->httpClient->delete("/product/$id");
        // dd($productRes);
        $productResObj = json_decode($productRes->getBody());
        return response()->json($productResObj);
    }

    public function create(Request $request){

    }
}
