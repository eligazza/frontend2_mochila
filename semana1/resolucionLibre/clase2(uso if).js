let opciones = ["null","piedra", "papel", "tijera"];

// USUARIO //
function pedirJugada() {
    let eleccion = 0;
    
    // redefino elección con el numero que diga el usuario
    do {eleccion = parseInt(prompt("Ingrese 1 para piedra, 2 para papel o 3 para tijera"))}
    
    // valido que sea un numero y que esté entre 1 y 3
    while (isNaN(eleccion) || eleccion < 1 || eleccion > 3);
    
    // imprimo por consola la elección y retorno su valor
    console.log(`Usuario eligió: ${opciones[eleccion]}`);
    return eleccion;
}

// COMPUTADORA //
function jugadaRandom() {
    
    // genero un número aleatorio entre 1 y 3
    let random = parseInt(Math.random() * 3 + 1);
    
    // imprimo por consola la eleccion random y retorno su valor
    console.log(`La consola saca: ${opciones[random]}`);
    return random;
}


// COMPARACION //
/**function compararJugadas() {
    
    // casos donde el usuario pierde
    if ((usuario === 1 && computadora === 2) || 
        (usuario === 2 && computadora === 3) || 
        (usuario === 3 && computadora === 1)) {
            console.log("El usuario perdió.");
            alert(`Vos elegiste ${opciones[usuario]} y la computadora eligió ${opciones[computadora]}. Por lo tanto perdiste, lo siento.`);
        }

    // casos donde el usuario gana
    else if ((usuario === 1 && computadora === 3) || 
        (usuario === 2 && computadora === 1) || 
        (usuario === 3 && computadora === 2) ) {
            console.log("El usuario ganó.");
            alert(`Vos elegiste ${opciones[usuario]} y la computadora eligió ${opciones[computadora]}. Por lo tanto ganaste, genio.`);
            }
    else {
        console.log("Esto fue un empate.");
        alert(`Vos elegiste ${opciones[usuario]} y la computadora también eligió ${opciones[computadora]}. Por lo tanto fue un empate. Intenta de nuevo.`);
    }

}

compararJugadas();**/

function compararJugadas() {
    const opciones = ['¡Genial, ganaste!', 'Esto fue un empate.', 'Una lástima, perdiste.'];

    const usuario = pedirJugada();
    const computadora = jugadaRandom();

    let resultadoRonda = opciones[0];
    if (usuario === computadora) {
        resultadoRonda = opciones[1];
    } else if ((usuario === 1 && computadora === 2) || 
                (usuario === 2 && computadora === 3) || 
                (usuario === 3 && computadora === 1)) {
        resultadoRonda = opciones[2];
    }
    console.log(`El usuario eligió ${usuario} y la computadora eligió ${computadora}`)
    return resultadoRonda;
}
