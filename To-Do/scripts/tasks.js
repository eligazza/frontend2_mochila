// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
  if(!localStorage.getItem("token")) {
    location.replace('../index.html');
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
  botonesCambioEstado();
  botonBorrarTarea();

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
    .then(listado => {
      console.log("Esta es la consulta de tareas:");
      console.table(listado);
      // tendría que renderizar las tareas
      renderizarTareas(listado);
    })
    .catch(e => console.log(e))
  };

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    
      event.preventDefault();
      
      const objeto = {
        "description": descripcion.value.trim(),
        "completed": false,
      }
      
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
      .then(tarea => {
        console.log("Tarea enviada")
        consultarTareas();
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

    }
  );

});

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    
    const listaPendientes = document.querySelector('.tareas-pendientes');
    const listaTerminados = document.querySelector('.tareas-terminadas');
    
    listado.forEach(tarea => {
      
      // si la tarea está pendiente
      if(!tarea.completed) {
        listaPendientes.innerHTML += `
          <li class="tarea"> 
            <button class="change" id="${tarea.id}">
              <i class= "fa-regular fa-circle"></i>
            </button>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <p class="timestamp">${tarea.createdAt}</p>
            </div> 
          </li>
        `
      } 
      // si la tarea está hecha
      else {
        listaTerminados.innerHTML += `
          <li class="tarea">
            <div class="hecha">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <div class="cambios-estados">
                <button class="change incompleta" id="${tarea.id}">
                  <i class="fa-solid fa-rotate-left"></i>
                </button>
                <button class="borrar" id="${tarea.id}">
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>
          </li>
        `
      }
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    
    // capturo todas las tareas pendientes
    // const tareasPendientes = document.querySelectorAll('.fa-circle');

    // me fijo en cual hicieron click y obtengo el id
    // tareasPendientes.addEventListener('click', function(event) {
    //   console.log(event);
      
    //   const tareaClickeada = event.target;
    //   const id = tareaClickeada.getAttribute('id');
    //   console.log("La tarea clickeada tiene el id:");
    //   console.log(id);
      
    //   // le cambio el estado con PUT  
    //   const carga = {
    //     "method": "PUT",
    //     "headers": {
    //       "content-type": "application/json",
    //       "authorization": localStorage.getItem('token')
    //     },
    //     "body": {"completed": true}
    //   }
    //   fetch(`${urlTareas}${id}`,carga)
    //   .then(response => {
    //     console.log(response.json());
    //     return response.json()
    //   })
    //   .then(consultarTareas())
    //   .catch(error => console.log(error))
    })
      
  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
   
    

    

  };

