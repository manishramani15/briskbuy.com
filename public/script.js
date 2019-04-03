$(() => {
    function appendProducts(products) {
        $('#productList').empty().append(`
        <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        </tr>
        `)
        products.forEach((product) => {
            $('#productList').append(`
            <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            </tr>
            `)
        })
    }
    
    function loadProducts(products) {
        products.forEach((product) => {
            $('#productsContainer').append(`
            <div class='productCard' data-id='${product.id}'>
            <h2>${product.name}</h2>
            <h6>Price : ${product.price}</h6>
            <button class="btn btn-default addToCart">Add to Cart 🛒</button>
            </div>
            `)
        })
    }

    function loadCart(cartItems) {
        $('#cart').empty().append(`<h1><b><i>Cart</i></b></h1>`)
        cartItems.forEach((cartItem) => {
            $('#cart').append(`
            <div class='cartCard'>
            <p>${cartItem.product.name}</p>
            <p>${cartItem.product.price}</p>
            </div>
            `)
        })
        $('#cart').append(`<button class='btn btn-default'>buy</button>`)
    }

    $('.addToCart').hide()
    $.get(
        '/loadproducts',
        async (products) => {
            await loadProducts(products)
            $('.addToCart').click((ev) => {
                console.log('clicked!')
                // console.log($(ev.target).closest('.productCard').data('id'))
                $.post(
                    '/addtocart',
                    {id: $(ev.target).closest('.productCard').data('id')},
                    (cartItems) => {
                        loadCart(cartItems)
                    })
            })
        })

        $(".cancel").click((ev) => {
            $(ev.target).closest('div.modal').hide()
        }) 

        $('#loginButton').click((ev) => {
            const loginCredentials = {
                loginUsername: $('#loginUsername').val(),
                loginPassword: $('#loginPassword').val()
            }
            $.post(
                '/login',
                loginCredentials,
                (data) => {
                    if(data.success) {
                        $('#welcomeDiv').append(`<div style="color: floralwhite"><h4>Welcome ${data.name}!</h4><br><h6><i>your product is on the way.</i></h6></div>`)
                        $('#loginFormButton').hide()
                        $('#signupFormButton').hide() 
                        $(ev.target).closest('div.modal').hide()
                        $('.addToCart').show()
                        $('#productsContainer').removeClass('col-sm-12').addClass('col-sm-10')
                        $('#cart').show()
                        $.get(
                            '/addtocart',
                            (cartItems) => {
                                loadCart(cartItems)
                            })
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
                
                
                //
                
                $('#vendorLoginButton').click((ev) => {
                    const loginCredentials = {
                        loginUsername: $('#vendorLoginUsername').val(),
                        loginPassword: $('#vendorLoginPassword').val()
                    }
                    $.post(
                        '/vendorlogin',
                        loginCredentials,
                        (data) => {
                            if(data.success) {
                                $('#welcomeDiv').append(`<div style="color: floralwhite"><h4>Welcome ${data.name}!</h4></div>`).data('vendor-id', data.id)
                                $('#vendorLoginFormButton').hide()
                                $('#vendorSignupFormButton').hide() 
                                $(ev.target).closest('div.modal').hide()
                                $('#productForm').show()
                            }
                            else{
                                alert('username or password incorrect')
                            }
                            $('#vendorLoginUsername').val('')
                            $('#vendorLoginPassword').val('')
                            $.get(
                                `/addproduct?id=${data.id}`,
                                (products) => {
                                    appendProducts(products.products)
                                })
                            })
                        })
                        $('#vendorSignupButton').click((ev) => {
                            if($('#vendorSignupPassword').val() !== $('#vendorConfirmPassword').val()) {
                                alert("Password didn't match")
                            } else {
                                const signupCredentials = {
                                    email: $('#vendorSignupUsername').val(),
                                    password: $('#vendorSignupPassword').val(),
                                    name: $('#vendorName').val()
                                }
                                $.post(
                                    '/vendorsignup',
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
                            
                            $('#addProduct').click(() => {
                                let productCredentials = {
                                    name: $('#productName').val(),
                                    price: $('#productPrice').val(),
                                    quantity: $('#productQuantity').val(),
                                    vendorId: $('#welcomeDiv').data('vendor-id')
                                }
                                $.post(
                                    '/addproduct',
                                    productCredentials
                                    // (data) => {
                                    // if(data.success) {
                                    //     alert('Product added!')
                                    // $('#productList').append(`
                                    // <tr>
                                    //     <td>${productCredentials.name}</td>
                                    //     <td>${productCredentials.price}</td>
                                    //     <td>${productCredentials.quantity}</td>
                                    // </tr>
                                    // `)
                                    // }
                                    // }
                                    )
                                    $.get(
                                        '/addproduct',
                                        (products) => {
                                            appendProducts(products.products)
                                        }
                                        )
                                    })
                                })