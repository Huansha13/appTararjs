class TareasView {
    constructor() {
        this.formularioTarea = $('#form-tarea');
        this.inputTarea = $('#input-tarea');
        this.listaTarea = $('#list-tarea');

        //*Boton eliminar tarea -> <li>
        this.listaTarea.on('click', '.delete-button', (event) => {
            const index = parseInt($(event.target).attr('data-index'));
            controller.handleEliminarTarea(index);                
        });

        //*Boton editar tarea -> <li>
        this.listaTarea.on('click', '.edit-button', (event) => {
            const index = parseInt($(event.target).attr('data-index'));
            controller.tareaByIndex(index);
        });
    }

    // Agregar tarea a la vista
    agregarTareaToVista(tarea, index) {
        this.listaTarea.append(this.crearElementoTarea(tarea, index)); //?Pendiente
    }

    // Eliminar terea de la vista
    eliminarTareFromView(index) {
        $(`#list-tarea li:nth-child(${index + 1})`).remove();
    }

    // Limpiar campos de entrada
    limpiarCamposEntrada() {
        this.inputTarea.val('');
    }

    manejoEvento(controller) {
        this.formularioTarea.on('submit', (event) => {
            event.preventDefault();

            const tarea = this.inputTarea.val().trim();

            const submitButton = event.target.querySelector("button[type='submit']:focus");
            if (!submitButton) {
                return;
            }
            
            const action = submitButton.dataset.action;

            switch(action) {
                case 'add':
                    if (tarea != '') {
                        controller.handleAgregarTarea(tarea);
                        this.limpiarCamposEntrada();
                    }
                    break;
                case 'edit':
                    const index = parseInt(submitButton.dataset.index);
                    controller.editarTarea(index, tarea);
                    this.showBtnAgregar();
                    this.limpiarCamposEntrada();
            }
        });
    }

    // RENDER
    render(tareas) {
        this.listaTarea.empty();
        tareas.forEach((tarea, index) => {
            this.listaTarea.append(this.crearElementoTarea(tarea, index));
        });
    }

    setTareaInput(tarea, index) {
        $('#input-tarea').val(tarea);
        $('#btn-actualizar').attr('data-index', index);
        this.showBtnActualizar();
    }

    showBtnActualizar() {
        $('#btn-actualizar').show();
        $('#btn-agregar').hide();
    }

    showBtnAgregar() {
        $('#btn-agregar').show();
        $('#btn-actualizar').hide();
    }

    loadFechaHoy(fecha) {
        $('#fechaHoy').append(fecha);
    }

    crearElementoTarea(tarea, index) {
        const li = $('<li></li>');
        li.addClass('list-group-item d-flex justify-content-between align-items-center');
        li.html(`
            ${tarea}
            <div class="btn-group" role="group">
                <button class="btn btn-warning edit-button" data-index="${index}"> Editar </button>
                <button class="btn btn-danger delete-button" data-index="${index}"> Eliminar </button>
            </div>
        `);
        return li;
    }
}