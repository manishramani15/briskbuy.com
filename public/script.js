$(() => {
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