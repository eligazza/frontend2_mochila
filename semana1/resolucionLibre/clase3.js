let nombreJugador = iniciarJuego();

let contador = {
    usuario: 0,
    computadora: 0,
    empates: 0
};

function partidaSimple() {
    let resultadoParcial = comparaJugadas(jugadaUsuario(),jugadaComputadora());
    if (resultadoParcial === 0) {contador.usuario++}
    else if (resultadoParcial === 1) {contador.empates++}
    else (contador.computadora++)
}

while (contador.computadora < 2 && contador.usuario < 2 ) {
    partidaSimple();
    alert(`Usuario: ${contador.usuario} - Computadora: ${contador.computadora} - Empates: ${contador.empates}`);
    console.table(contador);
}

