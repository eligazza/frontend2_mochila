function iniciarJuego() {
    
    alert("Bienvenido al piedra papel o tijera de Frontend II.");
    
    let nombre = (prompt("Ingrese su nombre por favor:")).toUpperCase();
    while (nombre.length < 3 || nombre === "" || nombre === NaN) {
        alert("Su nombre tiene que escribirse en letras y tener más de 3 caracteres");
        nombre = (prompt("Ingrese nuevamente su nombre por favor:")).toUpperCase();
    }
    alert(`Gracias por jugar ${nombre} ¡Mucha suerte!`);
    console.log(`El jugador es: ${nombre}`);
    return nombre;
}