const ELECCIONES = ["Piedra", "Papel", "Tijera"];

/** JUGADA USUARIO **/

function jugadaUsuario() {
    let usuario = parseInt(prompt("Ingrese 1 para Piedra, 2 para Papel o 3 para Tijera"));
    while (isNaN(usuario) || usuario > 3 || usuario < 1) {
        usuario = parseInt(prompt("Debe escribir solo el número. 1 para Piedra, 2 para Papel o 3 para Tijera"));
    }
    alert(`Usted eligió ${ELECCIONES[usuario-1]}`);
    console.log(`El usuario eligió ${ELECCIONES[usuario-1]}`);
    return usuario;
}

/** JUGADA COMPUTADORA **/

function jugadaComputadora() {
    let computadora = parseInt(Math.random() * 3 + 1);
    alert(`La computadora eligió ${ELECCIONES[computadora - 1]}`);
    console.log(`La computadora eligió ${ELECCIONES[computadora - 1]}`);
    return computadora;
}

function comparaJugadas(jugador1, jugador2) {
    
    let posiblesMensajes = ['¡Genial, ganaste!', 'Esto fue un empate.', 'Una lástima, perdiste.']
    let posiblesResultados = ["Ganó el usuario", "Empataron", "Ganó la computadora"];
    
    let resultado = 0; // por defecto gana el usuario
    if (jugador1 === jugador2) {
        resultado = 1; // empate si eligen lo mismo
    }
    else if (jugador1 === 1 && jugador2 === 2 ||
             jugador1 === 2 && jugador2 === 3 ||
             jugador1 === 3 && jugador2 === 1) {
                resultado = 2;
            }
    alert(`${posiblesMensajes[resultado]}`);
    console.log(`${posiblesResultados[resultado]}`);
    return resultado;
}
