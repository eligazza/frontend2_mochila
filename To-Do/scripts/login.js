window.addEventListener('load', function () {
    
    // obtenemos variables globales 
    const URL = "https://todo-api.ctd.academy/v1/users/login"; 
    const form = this.document.querySelector("form");
    const email = this.document.querySelector("#inputEmail");
    const contrasenia = this.document.querySelector("#inputPassword");


    // FUNCIÓN 1: Escuchamos el submit y preparamos el envío
    form.addEventListener('submit', function (event) {
        
        event.preventDefault();
        
        if (validarEmail(email) && validarContrasenia(contrasenia)) {
            
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
            console.log(carga);
            realizarLogin(carga);

        }
    });


    //FUNCIÓN 2: Realizar el login [POST]
    function realizarLogin(param) {
        
        fetch(URL, param)
            .then(res => res.json())
            .then(data => localStorage.setItem("token",data.jwt))
            .catch(error => console.log(error))
        
    };

});