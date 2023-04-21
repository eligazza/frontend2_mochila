//! SEGURIDAD: Si no se encuentra en localStorage info del usuariolocalStorage.getItem no lo deja acceder a la página, redirigiendo al login inmediatamente.
const token = localStorage.getItem('token');
if(!token) {
  location.replace('../index.html');
}

window.addEventListener('load', function () {

  //^ CONSTANTES
  const url = 'https://todo-api.ctd.academy/v1/'; 
  const botonLogout = document.querySelector('#closeApp');
  const usuario = document.querySelector('.user-info p');

  //^ BOTON DE LOGOUT
  // preguntar si está seguro de salir
  botonLogout.addEventListener('click', () => {
    Swal.fire({
      title: 'Seguro desea salir?',
      text: "Necesitará volver a ingresar sus credenciales",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, salir'
    })
    .then((result) => {
      if (result.isConfirmed) {
        Swal.fire( 
          '¡Adios!',
          'Vuelva pronto.',
          'success'
        )
        // sacar el token
        localStorage.removeItem('token');
        // redirigir al login
        location.replace('./index.html');
      }
    })
  })

  mostrarNombre();  

  //^ OBTENER LISTA DE TAREAS
  //& get
  //& mostrar las tareas en el HTML dependiendo si están hechas o no.
  
  //^ CREAR TAREAS
  //& post
  //& obtener lista de tareas
  
  //^ BORRAR TAREAS
  //& delete
  //& obtener lista de tareas

  //^ MARCAR TAREAS COMO HECHAS
  //& put
  //& obtener lista de tareas
  
  //^ MARCAR TAREAS COMO PENDIENTES
  //& put
  //& obtener lista de tareas
  
  //? FUNCIONES DETALLADAS
  
  function mostrarNombre() {
    const carga = {
    method: 'GET',
    headers: {
      authorization: JSON.parse(token)
    }
  }
  fetch(`${url}users/getMe`, carga)
  .then(res => res.json())
  .then(info => usuario.innerText = info.firstName)
  .catch(e => {
    console.log(e)
  })
}

});

 