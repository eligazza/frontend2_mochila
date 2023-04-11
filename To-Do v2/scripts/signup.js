window.addEventListener('load', function () {
    
    //^ VARIABLES GLOBALES 
    
    const url = 'https://todo-api.ctd.academy/v1/';
    const inputNombre = document.querySelector('#inputNombre');
    const inputApellido = document.querySelector('#inputApellido');
    const inputEmail = document.querySelector('#inputEmail');
    const inputPassword = document.querySelector('#inputPassword');
    const inputPasswordRepetida = document.querySelector('#inputPasswordRepetida');
    const errores = document.querySelector('#errores');
    const formulario = document.querySelector('form');

    //^ VALIDACION DEL LADO DEL CLIENTE
    
    pintarRecuadros(inputNombre, validarTexto, "El nombre solo debe contener letras");
    pintarRecuadros(inputApellido, validarTexto, "El apellido solo debe contener letras");
    pintarRecuadros(inputEmail, validarEmail, "Escriba un formato de email válido");
    pintarRecuadros(inputPassword, validarContrasenia, "Debe ser una combinación de mayúsculas, minúsculas y números");
    // la logica de la validación del ultimo recuadro es distinta
    inputPasswordRepetida.addEventListener('change', () => {
        const resultado = compararContrasenias(inputPassword.value, inputPasswordRepetida.value);
        resultado ? marcarVerde(inputPasswordRepetida) : marcarRojo(inputPasswordRepetida);
        resultado ? errores.innerText = '' : errores.innerText = "Las contraseñas no coinciden"; 
    })   
    
    //^ ENVIO DE INFORMACION PARA REGISTRO
    formulario.addEventListener('submit', event => {
        
        event.preventDefault(); // si no hago esto, se envía todo a ningun lado sin hacer comprobaciones ni preparar el pedido a la API como dice el código
        
        if( validarTexto(inputNombre.value) &&
        validarTexto(inputApellido.value) &&
        validarEmail(inputEmail.value) &&
        validarContrasenia(inputPassword.value) &&
        compararContrasenias(inputPassword.value, inputPasswordRepetida.value) ) {
            // si se cumplen las condiciones... 
            realizarRegistro(); // hago el registro
            // formulario.reset(); // borro el formulario
            // location.replace('./index.html'); // redirijo al login
        }
    })     
    
    //& FUNCIONES AUXILIARES
        
    function pintarRecuadros(recuadro, funcionValidadora, mensaje) {
        recuadro.addEventListener('change', () => {
            const resultado = funcionValidadora(recuadro.value); // validamos el valor, no el recuadro
            resultado ? marcarVerde(recuadro) : marcarRojo(recuadro);
            resultado ? errores.innerText = '' : errores.innerText = mensaje;            
        })
    }

    function marcarRojo(elemento) {
        elemento.classList.add('recuadroRojo');  
        elemento.classList.remove('recuadroVerde');  
    }

    function marcarVerde(elemento) {
        elemento.classList.add('recuadroVerde');
        elemento.classList.remove('recuadroRojo');
    }

    function realizarRegistro() {
        
        const objeto = { 
            firstName: inputNombre.value,
            lastName: inputApellido.value,
            email: inputEmail.value,
            password: inputPassword.value
        }
        console.log("Objeto preparado...");
        
        const carga = {
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "body": JSON.stringify(objeto)
        }
        console.log("La carga fue preparada correctamente...");
        
        fetch(`${url}users`, carga)

            .then(res => {
                if (!res.ok) {console.log("Algo anduvo mal, reintente por favor")}
                return res.json()
            })

            .then(data => {
                console.log("Información enviada correctamente:");
                console.log(data);
            })

            .catch(error => alert(error))
    }

});