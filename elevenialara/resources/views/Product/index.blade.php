<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ env('APP_NAME', 'Laravel') }}</title>
    <!-- Icons-->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
    <div style="padding: 1rem; align-items: center; align-content: center; justify-content: space-between; display: flex; width: 100%">
        <div>
            <p>
                <strong>Total</strong>: <em id="total-info"></em>
                <br />
            </p>
        </div>
        <div>
            <Button class="btn btn-success" id="create-btn">
                Add
            </Button>
        </div>
    </div>
    <div id="container" class="pt-3" style="display: flex; flex-wrap: wrap; justify-content: flex-start; width: 100vw; height: 90vh; overflow-y: auto">
    </div>
    <div class="modal" tabindex="-1" role="dialog" id="edit-modal">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Update Item</h5>
                    <button type="button" class="close btn-close edit-modal-close-btn" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body" bis_skin_checked="1">
                    <input type="hidden" placeholder="Name" class="form-control id-input" value="">
                    <div class="mb-3" bis_skin_checked="1">
                        <label class="form-label">Name</label>
                        <input placeholder="Name" class="form-control name-input" value="">
                    </div>
                    <div class="mb-3" bis_skin_checked="1">
                        <label class="form-label">SKU</label>
                        <input placeholder="SKU" class="form-control sku-input" value="">
                    </div>
                    <div class="mb-3" bis_skin_checked="1">
                        <label class="form-label">Image</label>
                        <input placeholder="Image File" type="file" class="form-control image-input">
                    </div>
                    <div class="mb-3" bis_skin_checked="1">
                        <label class="form-label">Price</label>
                        <input placeholder="Price in IDR" type="number" class="form-control price-input" value="">
                    </div>
                    <div class="mb-3" bis_skin_checked="1">
                        <label class="form-label">Description</label>
                        <textarea placeholder="Description" class="form-control description-input"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="submit-edit-btn">Save Changes</button>
                    <button type="button" class="btn btn-secondary edit-modal-close-btn" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" tabindex="-1" role="dialog" id="create-modal">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Item</h5>
                    <button type="button" class="close btn-close create-modal-close-btn" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body" bis_skin_checked="1">
                    <input type="hidden" placeholder="Name" class="form-control id-input" value="">
                    <div class="mb-3" bis_skin_checked="1">
                        <label class="form-label">Name</label>
                        <input placeholder="Name" class="form-control name-input" value="">
                    </div>
                    <div class="mb-3" bis_skin_checked="1">
                        <label class="form-label">SKU</label>
                        <input placeholder="SKU" class="form-control sku-input" value="">
                    </div>
                    <div class="mb-3" bis_skin_checked="1">
                        <label class="form-label">Image</label>
                        <input placeholder="Image File" type="file" class="form-control image-input">
                    </div>
                    <div class="mb-3" bis_skin_checked="1">
                        <label class="form-label">Price</label>
                        <input placeholder="Price in IDR" type="number" class="form-control price-input" value="">
                    </div>
                    <div class="mb-3" bis_skin_checked="1">
                        <label class="form-label">Description</label>
                        <textarea placeholder="Description" class="form-control description-input"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id="submit-create-btn">Submit</button>
                    <button type="button" class="btn btn-secondary create-modal-close-btn" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" tabindex="-1" role="dialog" id="delete-modal">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Are you sure want to delete following item?</h5>
                    <button type="button" class="close btn-close delete-modal-close-btn" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body" bis_skin_checked="1">
                    <input type="hidden" placeholder="Name" class="form-control id-input" value="">
                    <div class="mb-3" bis_skin_checked="1">
                        <label class="form-label">Name</label>
                        <input readonly placeholder="Name" class="form-control name-input" value="">
                    </div>
                    <div class="mb-3" bis_skin_checked="1">
                        <label class="form-label">SKU</label>
                        <input readonly placeholder="SKU" class="form-control sku-input" value="">
                    </div>
                    <div class="mb-3" bis_skin_checked="1">
                        <label class="form-label">Image</label>
                        <input readonly placeholder="Image File" type="file" class="form-control image-input">
                    </div>
                    <div class="mb-3" bis_skin_checked="1">
                        <label class="form-label">Price</label>
                        <input readonly placeholder="Price in IDR" type="number" class="form-control price-input" value="">
                    </div>
                    <div class="mb-3" bis_skin_checked="1">
                        <label class="form-label">Description</label>
                        <textarea readonly placeholder="Description" class="form-control description-input"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="submit-delete-btn">Delete</button>
                    <button type="button" class="btn btn-secondary delete-modal-close-btn" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="{{ asset('js/app.js') }}"></script>
<script defer>
    $(document).ready(function() {
        let page = 1;
        let maxPage = 1;
        let productArr = [];
        let loading = false;

        $('#container').on('scroll', function(e) {
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = e.currentTarget;
            console.log({
                scrollTop,
                scrollHeight,
                clientHeight
            });
            if (Math.ceil(scrollTop + clientHeight) >= scrollHeight && page < maxPage && !loading) {
                page++;
                fetchProduct();
            }
        })

        $(document).on('click', '.edit-btn', function(e){
            console.log('triggered')
            let data = JSON.parse($(this).attr('data'));
            let {id, name, price, sku, description} = data || {};
            $('#edit-modal').show();
            $('#edit-modal .id-input').val(id);
            $('#edit-modal .name-input').val(name);
            $('#edit-modal .sku-input').val(sku);
            $('#edit-modal .price-input').val(price);
            $('#edit-modal .description-input').val(description);

        })

        $(document).on('click', '.edit-modal-close-btn', function(){
            $('#edit-modal').hide();
        })

        $('#create-btn').click(function(){
            $('#create-modal').show();
        })
        $(document).on('click', '.create-modal-close-btn', function(){
            $('#create-modal').hide();
        })

        $(document).on('click', '.delete-btn', function(e){
            console.log('triggered')
            let data = JSON.parse($(this).attr('data'));
            let {id, name, price, sku, description} = data || {};
            $('#delete-modal').show();
            $('#delete-modal .id-input').val(id);
            $('#delete-modal .name-input').val(name);
            $('#delete-modal .sku-input').val(sku);
            $('#delete-modal .price-input').val(price);
            $('#delete-modal .description-input').val(description);

        })

        $(document).on('click', '.delete-modal-close-btn', function(){
            $('#delete-modal').hide();
        })

        $('#submit-edit-btn').click(function(){
            let id = $('#edit-modal .id-input').val();
            let name = $('#edit-modal .name-input').val();
            let sku = $('#edit-modal .sku-input').val();
            let price = $('#edit-modal .price-input').val();
            let description = $('#edit-modal .description-input').val();
            let image = $('#edit-modal .image-input')[0].files[0];
            createOrpdateProduct({id,name,sku,price,description,image});
        })

        $('#submit-create-btn').click(function(){
            let name = $('#create-modal .name-input').val();
            let sku = $('#create-modal .sku-input').val();
            let price = $('#create-modal .price-input').val();
            let description = $('#create-modal .description-input').val();
            let image = $('#create-modal .image-input')[0].files[0];
            createOrpdateProduct({name,sku,price,description,image});
        })

        $('#submit-delete-btn').click(function(){
            let id = $('#delete-modal .id-input').val();
            deleteProduct(id);
        })

        const createOrpdateProduct = ({id,name,sku,price,description,image}) => {
            loading = true;
            let formData = new FormData();
            formData.append('name', name);
            formData.append('sku', sku);
            formData.append('price', price);
            formData.append('description', description);
            if(image){
                formData.append('image', image, image.name);
            }
            let url = id ? ('/product/' + id) : '/product';
            console.log(url);
            $.ajax({
                url,
                method: 'POST',
                processData: false,
                contentType: false,
                data: formData
            }).done(function(res) {
                console.log({res});
                if (res) {
                    let {
                        status,
                        error,
                        data
                    } = res;
                    if (!status){
                        return;
                    }
                    if(id){ // post-update process
                        let idx = productArr.findIndex((p)=>parseInt(p.id)==parseInt(id));
                        if(idx>=0){
                            productArr[idx] = data;
                        }
                    } else { // post-create processs
                        productArr.unshift(data);
                    }
                    $('#edit-modal').hide();
                    $('#create-modal').hide();
                    renderList();
                }
            })
            .fail(function() {})
            .always(function() {
                loading = false;
            });
        }

        const fetchProduct = () => {
            loading = true;
            $.ajax({
                url: '/products/' + page
            }).done(function(res) {
                if (res) {
                    let {
                        total,
                        totalPage,
                        products
                    } = res;
                    if (maxPage < totalPage) maxPage = totalPage;
                    productArr = productArr.concat(products);
                    renderList();
                }
            })
            .fail(function() {})
            .always(function() {
                loading = false;
            });
        }

        const deleteProduct = (id) => {
            loading = true;
            $.ajax({
                url: '/product/' + id,
                method: 'DELETE'
            }).done(function(res) {
                if (res) {
                    let {
                        status
                    } = res;
                    if(status){
                        productArr = productArr.filter((p)=>parseInt(p.id)!==parseInt(id));
                        $('#delete-modal').hide();   
                    }
                    renderList();
                }
            })
            .fail(function() {})
            .always(function() {
                loading = false;
            });
        }

        const renderList = () => {
            $('#container').html('');
            let newInnerHtml = '';
            productArr.map((p) => {
                newInnerHtml += (
                    `<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <div class="card" style="margin: 0 20px; display: inline-flex; margin-bottom: 2em">
                            <img class="card-img-top" src="${p.image}" alt="Card image cap" style="height: 100%; object-fit: cover">
                            <div class="card-body">
                                <h5 class="card-title" style="height: 48px!important; overflow-y: hidden!important">${p.name}</h5>
                                <p class="card-text" style="height: 98px!important; overflow-y: hidden!important">${p.description}</p>
                            </div>
                            <div class="card-footer" style="align-items: center; justify-content: space-between; display: flex;">
                                <div>
                                    IDR ${p.price}
                                </div>
                                <div>
                                    <a href="#" class="btn btn-primary edit-btn" data='${JSON.stringify(p)}'>Edit</a>
                                    <a href="#" class="btn btn-danger delete-btn" data='${JSON.stringify(p)}'>Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>`
                )
            })
            $('#container').html(newInnerHtml);
            $('#total-info').html(productArr.length);
        }

        fetchProduct();
    })
</script>

</html>