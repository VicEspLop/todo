const contenedorTareas = document.querySelector(".tareas");

fetch("http://localhost;3000/api-todo")
.then(repsuesta => repsuesta.json())
.then(tareas => {
    tareas.forEach(({id,tareas,terminada}) => {
        new tareas(id,tarea,terminada,contenedorTareas);
    });
    console.log(tareas);
})