window.addEventListener('load', function () {
     
    //& en el caso de que exista el token, redirigir a la pagina de tareas
    if(token) {
        realizarLogin()
    }

    //^ VARIABLES GLOBALES
    
    const inputEmail = document.querySelector('#inputEmail');
    const inputPassword = document.querySelector('#inputPassword');
    const formulario = document.querySelector('form');
    const botonIngresar = document.querySelector('form button');


    //^ COMPROBACIONES DEL LADO DEL CLIENTE

    //& campo usuario, validar y agregar estilos
    //& campo contraseña, validar y agregar estilos
    //& habilitar el botón de submit solo cuando pasen las validaciones

    //^ ENVIO DE CREDENCIALES AL SERVIDOR Y ALMACENADO DE TOKEN
    
    //& Evento SUBMIT -> FETCH (POST)
        //& resetear el form
        //& guardar el token
        //& redirigir a la pagina de tareas
        
});
