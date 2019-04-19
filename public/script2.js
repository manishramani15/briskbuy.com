$(() => {
    $(".cancel").click((ev) => {
        $(ev.target).closest('div.modal').hide()
    })
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
                        name: $('#vendorName').val(),
                        lat: $('#lat').text(),
                        lon: $('#lon').text()
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
                    $.post('/addproduct', productCredentials)
                    $.get(
                        '/addproduct',
                        (products) => {
                            appendProducts(products.products)
                        })
                    })
                    //location script
                    $('#vendorSignupFormButton').click(async () => {
                        if (navigator.geolocation) {
                            await navigator.geolocation.getCurrentPosition(async (position) => {
                                $('#lat').text(await position.coords.latitude)
                                $('#lon').text(await position.coords.longitude)
                                $('#id02').show()
                            }, 
                            async (error) => {
                                if(error.PERMISSION_DENIED) {
                                    alert('Location permission should be allowed to sign up.')
                                    location.reload(true) //how to hard refresh
                                }
                            }
                            )
                        } else { 
                            alert("Geolocation is not supported by this browser.")
                        }
                    })
                })