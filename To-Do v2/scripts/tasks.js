//! SEGURIDAD: Si no se encuentra en localStorage info del usuariolocalStorage.getItem no lo deja acceder a la página, redirigiendo al login inmediatamente.
const token = localStorage.getItem('token');
if(!token) {
  location.replace('../index.html');
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  //FUNCIÓN 1 - Cerrar sesión
  //FUNCIÓN 2 - Obtener nombre de usuario [GET]
  //FUNCIÓN 3 - Obtener listado de tareas [GET]
  //FUNCIÓN 4 - Crear nueva tarea [POST]
  //FUNCIÓN 5 - Renderizar tareas en pantalla
  // si la tarea está pendiente
  // si la tarea está hecha
  //FUNCIÓN 6 - Cambiar estado de tarea [PUT]
  //FUNCIÓN 7 - Eliminar tarea [DELETE]
});

 