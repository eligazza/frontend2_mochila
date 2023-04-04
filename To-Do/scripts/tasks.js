// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
if(!localStorage.getItem("token")) {
  location.replace('../index.html');
  console.log("Esto se ejecuta primero?");
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const urlTareas = "https://todo-api.ctd.academy/v1/tasks";
  const urlUsuario = "https://todo-api.ctd.academy/v1/users/getMe";

  const btnCerrarSesion = document.querySelector('#closeApp');
  const userName = document.querySelector('.user-info p');
  const descripcion = document.querySelector('#nuevaTarea');
  const formCrearTarea = document.querySelector('.nueva-tarea');

  obtenerNombreUsuario();
  consultarTareas();

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    // Creo un mensaje de alerta con sweetalert2
    Swal.fire({
      title: 'Cerrar sesión',
      text: "¿Seguro que desea cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#94e594",
      cancelButtonColor: '#ef7676',
      confirmButtonText: 'Si, seguro'
    })
    // si se confirma, entonces muestra el mensaje de despedida, borra el token y vuelve al login
    .then((result) => {
      if (result.isConfirmed) {
        Swal.fire ('¡Adios!', 'Vuelva prontos.',);
        localStorage.clear();
        location.replace('./index.html');    
      }
    })
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {

    // obtengo el nombre del usuario haciendo fetch (GET) pero pasandole autorización en el header
    const carga = {
      method : "GET",
      headers : {
        authorization : localStorage.getItem('token')
      },
    }
        
    fetch(urlUsuario, carga)
      .then(response => response.json())
      .then(data => userName.innerText = `${data.firstName} ${data.lastName}`)
      .catch(e => console.log(e))
  }

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    
    const carga = {
      "method": "GET",
      "headers": {
        "authorization": localStorage.getItem('token'),
      }
    }
    
    fetch(urlTareas, carga)
    .then(response => response.json())
    .then(objetos => {
      console.log("Esto es la consulta de tareas");
      console.log(objetos)
    })
    .catch(e => console.log(e))
  };

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    
    event.preventDefault();
    
    const objeto = {
      "description": descripcion.value,
      "completed": false,
    }
    console.log(objeto);
    
    const carga = {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "authorization": localStorage.getItem('token'),
      },
      "body": JSON.stringify(objeto)
    }

    fetch(urlTareas, carga)
    .then(response => response.json())
    .then(tareas => {
      
    })
    .catch(e => console.log(e))
  
    // al crear una tarea, tengo que borrar el input, refrescar la lista de tareas y enviar la animación
    descripcion.value = '';
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '¡Tarea creada!',
      showConfirmButton: false,
      timer: 1000
    })
    consultarTareas();
  });
/* #################################### HASTA ACA LLEGUE ######################################## */
});


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {







  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    
    



  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
   
    

    

  };

