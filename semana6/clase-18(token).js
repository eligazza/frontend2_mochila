let URL =  "https://todo-api.ctd.academy/v1/users";

let objeto = {
    "firstName": "Gercito",
    "lastName": "Miquere",
    "email": "chiqui@digital.com",
    "password": "elMasFacilDelMundo"
}

let carga = {
    "method" : "POST",
    "headers" : {
        "content-type" : "application/json", //porque lo que mandamos es un json
        },
    "body" : JSON.stringify(objeto)
    }

fetch(URL, carga)
    .then( function(response) {
        let datos = response.json();
        console.log(datos);
        return datos;
    })
    .then(function(datos) {
        let token = datos.jwt;
        console.log(token);
        localStorage.setItem("token", token);
        })
    .catch(function (error) {
        console.log(error);
    })