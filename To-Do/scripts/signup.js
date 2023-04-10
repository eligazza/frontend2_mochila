window.addEventListener('load', function () {
    
    //obtenemos variables globales
    const URL = "https://todo-api.ctd.academy/v1/users"; 
    const form = this.document.querySelector("form");
    const nombre = this.document.querySelector("#inputNombre");
    const apellido = this.document.querySelector("#inputApellido");
    const email = this.document.querySelector("#inputEmail");
    const contrasenia = this.document.querySelector("#inputPassword");
    const contraseniaRepetida = this.document.querySelector("#inputPasswordRepetida");
    // obtenemos lugares donde irian los errores
    const errorNombre = this.document.querySelector("#errorNombre");
    const errorApellido = this.document.querySelector("#errorApellido");
    const errorEmail = this.document.querySelector("#errorEmail");
    const errorPassword = this.document.querySelector("#errorPassword");
    const errorPasswordRepetida = this.document.querySelector("#errorPasswordRepetida");

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    // Hago comprobaciones individuales cuando saco el foco del elemento, para que parezca en real time
    nombre.addEventListener('blur', function() {
        if (!validarTexto(nombre.value)) {
            mostrarError(errorNombre, "Utilice solo letras");
            resaltarCampo(nombre);
        } else {
            borrarError(errorNombre);
            desresaltar(nombre);
        };
    })
    apellido.addEventListener('blur', function() {
        if (!validarTexto(apellido.value)) {
            mostrarError(errorApellido, "Utilice solo letras");
            resaltarCampo(apellido);
        } else {
            borrarError(errorApellido);
            desresaltar(apellido);
        };
    })
    email.addEventListener('blur', function() {
        if (!validarEmail(email.value)) {
            mostrarError(errorEmail, "No escribió un email válido");
            resaltarCampo(email);
        } else {
            borrarError(errorEmail);
            desresaltar(email);
        };
    })
    contrasenia.addEventListener('blur', function() {
        if (!validarContrasenia(contrasenia.value)) {
            mostrarError(errorPassword, "Debe contener 8 caracteres, una minúscula, una mayúscula y un número");
            resaltarCampo(contrasenia);
        } else {
            borrarError(errorPassword);
            desresaltar(contrasenia)
        };
    })
    contraseniaRepetida.addEventListener('blur', function() {
        if (!compararContrasenias(contrasenia.value, contraseniaRepetida.value)) {
            mostrarError(errorPasswordRepetida, "Las contraseñas no coinciden");
            resaltarCampo(contraseniaRepetida);
        } else {
            borrarError(errorPasswordRepetida);
            desresaltar(contraseniaRepetida);
        };
    })
    
    // comprobación final de todo junto antes de enviar datos al servidor
    form.addEventListener('submit', function (event) {
        
        event.preventDefault();     
        
        if( validarTexto(nombre.value) &&
            validarTexto(apellido.value) &&
            validarEmail(email.value) &&
            validarContrasenia(contrasenia.value) &&
            validarContrasenia(contraseniaRepetida.value) &&
            compararContrasenias(contrasenia.value, contraseniaRepetida.value)) {

                const objeto = {
                    "firstName": nombre.value,
                    "lastName": apellido.value,
                    "email": email.value,
                    "password": contrasenia.value
                }
                console.log(objeto);
                
                const carga = {
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json"
                    },
                    "body": JSON.stringify(objeto)
                }
                console.log(carga);
                               
                realizarRegister(carga);

                form.reset();
        }

    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(param) {

        fetch(URL, param)
            .then(res => {
                if (!res.ok) { alert("Algo anduvo mal, intenta de nuevo")};
                return res.json();
            })
            .then(info => {
                console.log("Promesa cumplida");
                console.log(info);
                location.replace("./index.html");
            })
            .catch(error => console.log(error))
    
        }

    }
)