window.addEventListener('load', function () {
    
    //obtenemos variables globales
    const URL = "https://todo-api.ctd.academy/v1/users"; 
    const form = this.document.querySelector("form");
    const nombre = this.document.querySelector("#inputNombre");
    const apellido = this.document.querySelector("#inputApellido");
    const email = this.document.querySelector("#inputEmail");
    const contrasenia = this.document.querySelector("#inputPassword");
    const contraseniaRepetida = this.document.querySelector("#inputPasswordRepetida");

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if( validarTexto(nombre.value) &&
            validarTexto(apellido.value) &&
            validarEmail(email.value) &&
            validarContrasenia(contrasenia.value) &&
            validarContrasenia(contraseniaRepetida.value) &&
            compararContrasenias(contrasenia, contraseniaRepetida.value)) {

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

        }

    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(param) {

        fetch(URL, param)
            .then(res => res.json())
            .then(info => console.log(info))
            .catch(error => console.log(error))
    
        }

    }
)