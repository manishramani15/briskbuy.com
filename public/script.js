$(() => {
    let productsOnView = []
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            let userPosition = {
                lat: await position.coords.latitude,
                lon: await position.coords.longitude
            }
            $.get(
                `/loadproducts/?lat=${userPosition.lat}&lon=${userPosition.lon}`,
                async (products) => {
                    productsOnView = products
                    await loadProducts(products)
                    checkSession();
                    let searchValue = location.search.split('=')[1]
                    $('#searchInput').val(searchValue)
                    searchHandler()
                    
                    $('.addToCart').click((ev) => {
                        console.log('clicked!')
                        $.post(
                            '/addtocart',
                            {
                                id: $(ev.target).closest('.productCard').data('id'),
                                userId: sessionStorage['user-id']
                            },
                            (cartItems) => {
                                if(cartItems.exceed) {
                                    alert('Cannot be added to cart. Limited stock!')
                                } else{
                                    console.log(cartItems)
                                    loadCart(cartItems)
                                }
                            })
                        })
                    })
                }, 
                async (error) => {
                    if(error.PERMISSION_DENIED) {
                        alert('Location permission should be allowed to view products near you.')
                    }
                }
                )
            } else { 
                alert("Geolocation is not supported by this browser.")
            }
            
            //
            function loadProducts(products) {
                products.forEach((product) => {
                    if(product.quantity == 0) {
                        $('#productsContainer').append(`
                        <div class='productCard' data-id='${product.id}'>
                        <h2>${product.name}</h2>
                        <h6>Price : ${product.price}</h6>
                        <button class="btn btn-default addToCart" disabled><strike>Add to Cart 🛒</strike></button>
                        </div>
                        `)
                    } else{
                        $('#productsContainer').append(`
                        <div class='productCard' data-id='${product.id}'>
                        <h2>${product.name}</h2>
                        <h6>Price : ${product.price}</h6>
                        <button class="btn btn-default addToCart">Add to Cart 🛒</button>
                        </div>
                        `)
                    }
                })
            }
            
            function loadCart(cartItems) {
                $('#cart').empty().append(`<h1><b><i>Cart</i></b></h1>`)
                cartItems.forEach((cartItem) => {
                    $('#cart').append(`
                    <div class='cartCard'>
                    <p><b>${cartItem.product.name}</b></p>
                    <p><b>Price :</b>${cartItem.product.price}</p>
                    <p><b>Quantity :</b> ${cartItem.quantity}</p>
                    <button class="btn btn-default removeFromCart" data-cart-id="${cartItem.id}">Remove from Cart <strike>🛒</strike></button>
                    </div>
                    `)
                })
                $('#cart').append(`<button id='buy' class='btn btn-default'>buy</button>`)
                $('#buy').click(() => {
                    $.get(
                        `/buy/?userId=${sessionStorage['user-id']}`,
                        (data) => {
                            if(data.success) {
                                console.log(data.success)
                                $('#cart').empty()
                                location.reload();
                            } else {
                                alert(`Product ${data.name} has quantity ${data.quantity} in stock, you can not buy more than ${data.quantity}.`)
                            }
                        }
                        )
                    })
                    $('.removeFromCart').click((event) => {
                        $.post(
                            '/removefromcart',
                            {id: $(event.target).data('cart-id')},
                            (cartItems) => {
                                $(event.target).closest('.cartCard').detach()
                                loadCart(cartItems)
                            }
                            )
                        })
                    }
                    
                    $('#buy').click(() => {
                        console.log('buy clicked!')
                    })
                    
                    $('#logout').click(() => {
                        sessionStorage.removeItem('user-id')
                        $('#searchInput').val('')
                        $('#loginFormButton').show()
                        $('#signupFormButton').show()
                        location.reload(); 
                    })
                    
                    function loginSuccessFollowups(data) {
                        $('#welcomeDiv').append(`<div style="color: floralwhite"><h4>Welcome ${data.name}!</h4><br><h6><i>your product is on the way.</i></h6></div>`)
                        $('#loginFormButton').hide()
                        $('#signupFormButton').hide()
                        $('#productsContainer').removeClass('col-sm-12').addClass('col-sm-10')
                        $('#cart').show()
                        $('#logout').show() 
                        $('.addToCart').show()
                        $.get(
                            `/addtocart/?userId=${sessionStorage['user-id']}`,
                            (cartItems) => {
                                loadCart(cartItems)
                            })
                            
                        }
                        function checkSession() {
                            if(sessionStorage['user-id']) {
                                $.post(
                                    '/credentialsbyid',
                                    {id: sessionStorage['user-id']},
                                    (data) => {
                                        console.log(data)
                                        loginSuccessFollowups(data)
                                    })
                                    console.log('it exists')
                                } else {
                                    $('.addToCart').hide()
                                    console.log(`it doesn't exist`)
                                }
                            }
                            
                            function searchHandler() {
                                let newProductsOnView = productsOnView.filter((product) => {
                                    return product.name.includes($('#searchInput').val())
                                })
                                $('#productsContainer').empty() 
                                loadProducts(newProductsOnView)
                                
                            }
                            
                            $('#searchInput').on('input', (ev) => {  
                                searchHandler() //
                                if(sessionStorage['user-id']) {
                                    $('.addToCart').show().click((ev) => {
                                        console.log('clicked!')
                                        $.post(
                                            '/addtocart',
                                            {
                                                id: $(ev.target).closest('.productCard').data('id'),
                                                userId: sessionStorage['user-id']
                                            },
                                            (cartItems) => {
                                                if(cartItems.exceed) {
                                                    alert('Cannot be added to cart. Limited stock!')
                                                } else{
                                                    console.log(cartItems)
                                                    loadCart(cartItems)
                                                }
                                            })
                                        })
                                    }
                                }) 
                                
                                $.get(
                                    `/loadproducts/`,
                                    async (products) => {
                                        productsOnView = products
                                        await loadProducts(products)
                                        checkSession();
                                        let searchValue = location.search.split('=')[1]
                                        $('#searchInput').val(searchValue)
                                        searchHandler()
                                        
                                        $('.addToCart').click((ev) => {
                                            console.log('clicked!')
                                            $.post(
                                                '/addtocart',
                                                {
                                                    id: $(ev.target).closest('.productCard').data('id'),
                                                    userId: sessionStorage['user-id']
                                                },
                                                (cartItems) => {
                                                    if(cartItems.exceed) {
                                                        alert('Cannot be added to cart. Limited stock!')
                                                    } else{
                                                        console.log(cartItems)
                                                        loadCart(cartItems)
                                                    }
                                                })
                                            })
                                        })
                                        
                                        $(".cancel").click((ev) => {
                                            $(ev.target).closest('div.modal').hide()
                                        }) 
                                        
                                        $('#loginButton').click((ev) => {
                                            const loginCredentials = {
                                                username: $('#loginUsername').val(),
                                                password: $('#loginPassword').val()
                                            }
                                            $.post(
                                                '/login',
                                                loginCredentials,
                                                (data) => {
                                                    if(data.success) {
                                                        $(ev.target).closest('div.modal').hide()
                                                        sessionStorage.setItem('user-id', data.id)
                                                        window.location.reload()
                                                        loginSuccessFollowups(data)
                                                    }
                                                    else{
                                                        alert('username or password incorrect')
                                                    }
                                                    $('#loginUsername').val('')
                                                    $('#loginPassword').val('')
                                                }
                                                )
                                            })
                                            $('#signupButton').click((ev) => {
                                                if($('#signupPassword').val() !== $('#confirmPassword').val()) {
                                                    alert("Password didn't match")
                                                } else {
                                                    const signupCredentials = {
                                                        email: $('#signupUsername').val(),
                                                        password: $('#signupPassword').val(),
                                                        name: $('#name').val()
                                                    }
                                                    $.post(
                                                        '/signup',
                                                        signupCredentials,
                                                        (data) => {
                                                            if(data.success) {
                                                                alert('Welcome! Please login to continue.')
                                                                $(ev.target).closest('div.modal').hide()
                                                                
                                                            } else {
                                                                alert('An error occurred on server. Please retry')
                                                            }
                                                        }
                                                        )
                                                    }
                                                })
                                                
                                                
                                              })