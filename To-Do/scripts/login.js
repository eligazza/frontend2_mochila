window.addEventListener('load', function () {
    
    // obtenemos variables globales 
    const URL = "https://todo-api.ctd.academy/v1/users/login"; 
    const form = document.querySelector("form");
    const email = document.querySelector("#inputEmail");
    const contrasenia = document.querySelector("#inputPassword");
    const errorEmail = document.querySelector("#errorEmail");
    const errorContrasenia = document.querySelector("#errorContrasenia");

    // realizamos las comprobaciones del lado del cliente
    email.addEventListener('blur', function() {
        if(!validarEmail(email.value)) {
            mostrarError(errorEmail, "Email inválido");
            resaltarCampo(email);
        }
        else {
            borrarError(errorEmail);
            desresaltar(email);
        }
    })
    contrasenia.addEventListener('blur', function() {
        if(!validarContrasenia(contrasenia.value)) {
            mostrarError(errorContrasenia, "La contraseña incluía mayúsculas, minúsculas y números");
            resaltarCampo(contrasenia);
        } else {
            borrarError(errorContrasenia);
            desresaltar(contrasenia);
        }
    })
    // FUNCIÓN 1: Escuchamos el submit y preparamos el envío
    form.addEventListener('submit', function (event) {
        
        event.preventDefault();
                
        if (validarEmail(email.value) && validarContrasenia(contrasenia.value)) {
            
            const objeto = {
                "email": email.value,
                "password": contrasenia.value
            }
            console.log(objeto);
            const carga = {
                "method": "POST",
                "headers": {
                    "content-type": "application/json"
                },
                "body": JSON.stringify(objeto),
            }
            
            realizarLogin(carga);
            
            form.reset();
        }
    });


    //FUNCIÓN 2: Realizar el login [POST]
    function realizarLogin(param) {
        
        fetch(URL, param)
            .then(res => {
                if(!res.ok) {
                    alert("Error al intentar login, algunos datos son incorrectos")
                }
                return res.json();
            })
            .then(data => {
                localStorage.setItem("token",data.jwt);
                location.replace("./mis-tareas.html");
            })
            .catch(error => console.log(error))
        
    };

});