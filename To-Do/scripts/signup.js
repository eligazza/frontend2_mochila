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
        // function aniadirError(elemento, error) {
        //     //creo el elemento
        //     let mensaje = document.createElement('p');
        //     // le agrego el mensaje de error
        //     mensaje.innerText = error;
        // }
        
        if (validarTexto(nombre.value)) {console.log("Valido nombre")} else {console.log("No valido nombre")}
        if (validarTexto(apellido.value)) {console.log("Valido apellido")} else {console.log("No valido apellido")}
        if (validarEmail(email.value)) {console.log("Valido email")} else {console.log("No valido email")}
        if (validarContrasenia(contrasenia.value)) {console.log("Valido contraseña")} else {console.log("No valido contraseña")}
        if (compararContrasenias(contrasenia.value, contraseniaRepetida.value)) {console.log("Contraseñas iguales")} else {console.log(`${contrasenia.value} y ${contraseniaRepetida.value} no son iguales`)}
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