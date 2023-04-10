// SEGURIDAD: Si no se encuentra en localStorage info del usuariolocalStorage.getItem
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
  const token = localStorage.getItem('token');
  if(!token) {
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
  console.log("Nombre de usuario consultado");
  consultarTareas();
  console.log("Tareas consultadas");

  // botonesCambioEstado();
  // botonBorrarTarea();

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
        authorization : token
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
        "authorization": token,
      }
    }
    
    fetch(urlTareas, carga)
    .then(response => response.json())
    .then(listado => {
      renderizarTareas(listado);
      // botonesCambioEstado();
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
          "authorization": token,
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



  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    
    const listaPendientes = document.querySelector('.tareas-pendientes');
    const listaTerminados = document.querySelector('.tareas-terminadas');
    listaPendientes.innerHTML = "";
    listaTerminados.innerHTML = "";

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
    
    // tengo que capturar todas las tareas
    const tareas = document.querySelectorAll('.change');

    // a cada uno de los botones le pongo un escuchador y extraigo el ID del clickeado
    tareas.forEach(tarea => {
      
      tarea.addEventListener('click', function(event) {
        const id = event.target.id;
        
        // tengo que hacer el PUT usando la información del ID para la URL
        let estadoCambiado = true;
        
        if(tarea.classList.contains('incompleta')) {
          estadoCambiado = false;
        }

        const objeto = {
          completed : estadoCambiado,
        }

        const carga = {
          "method": "PUT",
          "headers": {
            "content-type": "application/json",
            "authorization": token,  
          },
          "body": JSON.stringify(objeto)
        }

        // despues de cambiar de estado, debería refrescar la lista de tareas y renderizarlas en pantalla
        fetch(`${urlTareas}/${id}`, carga)
        .then(res => {
          // consultarTareas();
          console.log("Enviando actualización de tareas")
          return res.json();
        })
        .then(data => console.log(data))
        .catch(error => console.log(error))

      })
    });
    
  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
   
    

    

  };
});
