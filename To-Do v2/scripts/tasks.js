//! SEGURIDAD: Si no se encuentra en localStorage info del usuariolocalStorage.getItem no lo deja acceder a la página, redirigiendo al login inmediatamente.
const token = localStorage.getItem('token');
if(!token) {
  location.replace('../index.html');
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  //^ FUNCIONALIDAD AL BOTON DE LOGOUT
  //& preguntar si está seguro de salir
  //& sacar el token
  //& redirigir al login

  //^ MOSTRAR INFORMACION DEL USUARIO
  //& get  
  //& mostrar en el HTML  

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
  

});

 