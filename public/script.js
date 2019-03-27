$(() => {
    $(".cancel").click((ev) => {
        $(ev.target).closest('div.modal').hide()
    }) 
    $('#loginButton').click(() => {
        const loginCredentials = {
            loginUsername: $('#loginUsername').val(),
            loginPassword: $('#loginPassword').val()
        }
        $.post(
            '/login',
            loginCredentials,
            (data) => {
                if(data.success) {
                    $('#welcomeDiv').append(`<h4>Welcome ${data.name}!</h4><br><h6><i>your product is on the way.</i></h6>`)
                    $('#loginButton').hide() //signup button also hide.
                }
            }
            )
        })
        $('#signupUsername').focusout(() => {
            $.post(
                '/signup',
                {signupUsername: $('#signupUsername').val()},
                (data) => {
                    if(!data.success) {
                        alert('Username already taken.')
                    }
                })
        })
        $('#signupButton').click(() => {
            if($('#signupPassword') !== $('#confirmPassword')) {
                alert("Password didn't match")
            } else {
                const signupCredentials = {
                    signupUsername: $('#signupUsername').val(),
                    signupPassword: $('#signupPassword').val(),
                    signupName: $('#name').val()
                }
                $.post(
                    '/signup',
                    signupCredentials,
                    (data) => {
                        if(data.success) {
                            alert('Welcome! Please login to continue.')
                        } else {
                            alert('An error occurred on server. Please retry')
                        }
                    }
                )
            }
        })
    })