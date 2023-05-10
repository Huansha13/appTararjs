class TareaModelo {
    constructor() {
        this.tareas = [];
        this.loadTareas();
    }

    // Metodo para la cargar la lista de tareas desde el almacenamiento local
    loadTareas() {
        const tareasLocal = localStorage.getItem('tareas');
        console.log("🚀 ~ file: tarea.js:10 ~ TareaModelo ~ loadTareas ~ tareasLocal:", tareasLocal)
        if (tareasLocal) {
            this.tareas = JSON.parse(tareasLocal);
            console.log("🚀 ~ file: tarea.js:13 ~ TareaModelo ~ loadTareas ~ this.tareas:", this.tareas)
        }
    }

    // Metodo para guardar la lista de tareas en el almacenamiento local
    guardarTareasInLocal() {
        const tareasLocal = JSON.stringify(this.tareas);
        console.log("🚀 ~ file: tarea.js:17 ~ TareaModelo ~ guardarTareasInLocal ~ tareasLocal:", tareasLocal)
        localStorage.setItem('tareas', tareasLocal);
    }

    // Metodo agregar tarea
    agregarTarea(tarea) {
        this.tareas.push(tarea);
        this.guardarTareasInLocal();
    }

    // Metodo editar
    editarTarea(index, nuevaTarea) {
        this.tareas[index] = nuevaTarea;
        this.guardarTareasInLocal();
    }

    // Metodo eliminar
    eliminarTarea(index) {
        this.tareas.splice(index, 1);
        this.guardarTareasInLocal();
    }

    // Metodo para la fecha del dia
    getFechaHoy() {
        const date = new Date();
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }
        return new Intl.DateTimeFormat('es-Es', options).format(date);
    }
}