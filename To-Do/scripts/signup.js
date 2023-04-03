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

    function mostrarError(elemento, error) {
        elemento.setAttribute('id', 'errores');
        elemento.style = 'color: red; margin-bottom: 2rem';
        elemento.innerText = error;
    }

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
                
        if (!validarTexto(nombre.value)) {
            mostrarError(errorNombre, "Utilice solo letras");
        }
        if (!validarTexto(apellido.value)) {
            mostrarError(errorApellido, "Utilice solo letras");
        }
        if (!validarEmail(email.value)) {
            mostrarError(errorEmail, "No escribió un email válido");
        }
        if (!validarContrasenia(contrasenia.value)) {
            mostrarError(errorPassword, "Debe contener 8 caracteres, una minúscula, una mayúscula y un número");
        }
        if (!compararContrasenias(contrasenia.value, contraseniaRepetida.value)) {
            mostrarError(errorPasswordRepetida, "Las contraseñas no coinciden");
        }
        
        
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
                location.replace("./mis-tareas.html");
            })
            .catch(error => console.log(error))
    
        }

    }
)