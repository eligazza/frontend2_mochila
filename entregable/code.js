/* --------------------------- NO TOCAR DESDE ACÁ --------------------------- */
let datosPersona = {
  nombre: "",
  edad: 0,
  ciudad: "",
  interesPorJs: "",
};

const listado = [{
    imgUrl: "https://huguidugui.files.wordpress.com/2015/03/html1.png",
    lenguajes: "HTML y CSS",
    bimestre: "1er bimestre",
  },
  {
    imgUrl: "https://jherax.files.wordpress.com/2018/08/javascript_logo.png",
    lenguajes: "Javascript",
    bimestre: "2do bimestre",
  },
  {
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png",
    lenguajes: "React JS",
    bimestre: "3er bimestre",
  },
];

const profileBtn = document.querySelector("#completar-perfil");
const materiasBtn = document.querySelector("#obtener-materias");
const verMasBtn = document.querySelector("#ver-mas");
const cambiarTema = document.querySelector('#cambiar-tema');

profileBtn.addEventListener("click", renderizarDatosUsuario);
materiasBtn.addEventListener("click", recorrerListadoYRenderizarTarjetas);
cambiarTema.addEventListener("click", alternarColorTema);
/* --------------------------- NO TOCAR HASTA ACÁ --------------------------- */

function obtenerDatosDelUsuario() {
  /* --------------- PUNTO 1: Escribe tu codigo a partir de aqui --------------- */
  datosPersona.nombre = prompt('Ingrese su nombre:');
  datosPersona.edad = (2023 - (parseInt(prompt('Ingrese el año de su nacimiento:'))));
  datosPersona.ciudad = prompt('Ingrese la ciudad donde vive:');
  datosPersona.interesPorJs = confirm('Describa su interés por JS');
}

function renderizarDatosUsuario() {
  /* ------------------- NO TOCAR NI ELIMINAR ESTA FUNCION. ------------------- */
  obtenerDatosDelUsuario();
  /* --------------- PUNTO 2: Escribe tu codigo a partir de aqui --------------- */
  let nombre = document.querySelector('#nombre');
  let edad = document.querySelector('#edad');
  let ciudad = document.querySelector('#ciudad');
  let interesJS = document.querySelector('#javascript');
  nombre.innerText = datosPersona.nombre;
  edad.innerText = datosPersona.edad;
  ciudad.innerText = datosPersona.ciudad;
  interesJS.innerText = (datosPersona.interesPorJs ? "Si" : "No");
}

function recorrerListadoYRenderizarTarjetas() {
  /* ------------------ PUNTO 3: Escribe tu codigo desde aqui ------------------ */
  const tarjeta = document.querySelector('#fila');
  if (tarjeta.childElementCount < 1) {
    listado.forEach( element => {
      tarjeta.innerHTML += `
        <div class="caja">
          <img src= "${element.imgUrl}" alt="${element.lenguajes}"></img>
          <p class="lenguajes"> ${element.lenguajes} </p>
          <p class="bimestre"> ${element.bimestre} </p>
        </div>
        `
      }
    )
  }
}

function alternarColorTema() {
  /* --------------------- PUNTO 4: Escribe tu codigo aqui --------------------- */
  const sitio = document.querySelector('#sitio');
  sitio.classList.toggle("dark");
}

/* --------------------- PUNTO 5: Escribe tu codigo aqui --------------------- */
document.addEventListener('keypress', function(e) {
  if (e.key === "f") {
    const sobreMi = document.querySelector('#sobre-mi');
    sobreMi.classList.remove('oculto');  
    }
  }
)

