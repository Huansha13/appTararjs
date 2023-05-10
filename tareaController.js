class TareaController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.manejoEvento(this);

        this.updateView()
    }

    loadFechaHoy() {
        this.view.loadFechaHoy(this.model.getFechaHoy());
    }

    //Manejar el agrgar tarea
    handleAgregarTarea(tarea) {
        this.model.agregarTarea(tarea);
        const index = this.model.tareas.length - 1;
        this.view.agregarTareaToVista(tarea, index);
        this.updateView();
    }

    // Manejar eliminar tarea
    handleEliminarTarea(index) {
        this.model.eliminarTarea(index);
        this.view.eliminarTareFromView(index);
        this.updateView();
    }

    // Metodo para editar una tarea existente
    editarTarea(index, nuevaTarea) {
        this.model.editarTarea(index, nuevaTarea);
        this.updateView();
    }

    // Metodo para obtener una tarea de la lista de tareas
    tareaByIndex(index) {
        this.view.setTareaInput(this.model.tareas[index], index);
    }

    updateView() {
        const tareas = this.model.tareas;
        this.view.render(tareas);
    }
}