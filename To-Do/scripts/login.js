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
            
            realizarLogin(carga);
            
            form.reset();
        }
    });


    //FUNCIÓN 2: Realizar el login [POST]
    function realizarLogin(param) {
        
        fetch(URL, param)
            .then(res => {
                if(!res.ok) {alert("Error al intentar login, algunos datos son incorrectos")}
                return res.json();
            })
            .then(data => {
                localStorage.setItem("token",data.jwt);
                location.replace("./mis-tareas.html");
            })
            .catch(error => console.log(error))
        
    };

});