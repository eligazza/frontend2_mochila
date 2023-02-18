/* -------------------------------------------------------------------------- */
/*                                  FUNCION 1                                 */
/* -------------------------------------------------------------------------- */
function iniciarJuego() {

    alert("Bienvenido al piedra papel o tijera de Frontend II.");
    
    let nombre = prompt("Ingrese su nombre por favor:");
    nombre.toUpperCase();
    while (nombre.length < 3 || nombre === "") {
        alert("Su nombre tiene que estar en letras y tener mas de 3 caracteres");
        nombre = prompt("Ingrese su nombre por favor:");
    }
    alert(`Gracias por jugar ${nombre} ¡Mucha suerte!`);

    // mostramos los datos por consola
    console.log(`El jugador es: ${nombre}`)
    return nombre;
}


// creamos una variable a nivel global para guardar el nombre del jugador que nos devuelve la función
// const nombreJugador = iniciarJuego();

// console.log(`Nombre utilizado: ${nombreJugador}`)
/* -------------------------------------------------------------------------- */
/*                          CONSIGNA MESA DE TRABAJO                          */
/* -------------------------------------------------------------------------- */
// 1- Modificar la funcion de iniciarJuego(), validar si ingresa un dato válido como nombre.
// 2- Si no ingresa un texto, o tiene menos de 3 caracteres debemos volverle a pedir que lo ingrese.
// 3- Finalmente el nombre devuelto debe estar todo en mayúsculas.


