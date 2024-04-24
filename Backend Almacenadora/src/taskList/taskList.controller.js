import TaskList from "./taskList.model.js";

export const createTask = async (req, res) => {
    const {nombreTarea, descripcionTarea, fechaCreacion, fechaFinalizacion} = req.body;
    const {uid} = req.user;
    console.log(uid)


    const task = new TaskList({nombreTarea, descripcionTarea, fechaCreacion, fechaFinalizacion, empleadoAsignado: uid});
    console.log(task)

    await task.save();

    return res.status(200).json({
        msg: "Tarea creada con éxito",
        task
    });
}

export const getTasksIncomplete = async (req, res) => {
    const query = {estado: false, empleadoAsignado: req.user.uid};

    const [incompleteTasks, total] = await Promise.all([
        TaskList.find(query),
        TaskList.countDocuments(query)
    ]);

    res.status(200).json({
        msg: "Tareas incompletas",
        total,
        incompleteTasks
    });
}

export const getTasksComplete = async (req, res) => {
    const query = {estado: true, empleadoAsignado: req.user.uid};

    const [completeTasks, total] = await Promise.all([
        TaskList.find(query),
        TaskList.countDocuments(query)
        ]);

    res.status(200).json({
        msg: "Tareas completas",
        total,
        completeTasks
    });    
}

export const updateMyTask = async (req, res) => {
    const {id} = req.params;
    const {uid} = req.user;

    const task = await TaskList.findById(id);

    if (task.empleadoAsignado === undefined) {
        return res.status(404).json({
            msg: "No hay ninguna persona a cargo de esta tarea"
        });
    }
    
    if(task.empleadoAsignado.toString() === uid){
        const {_id, estado, empleadoAsignado, ...rest} = req.body;
        await TaskList.findByIdAndUpdate(id, rest);
        const taskUpdated = await TaskList.findById(id);
        
        res.status(200).json({
            msg: "Tarea actualizada con éxito",
            taskUpdated
        });
    } else {
        return res.status(401).json({
            msg: "No tienes permisos para editar esta tarea"
        });
    }
}

export const deleteTask = async (req, res) => {
    const {id} = req.params;
    const {uid} = req.user;

    const task = await TaskList.findById(id);

    if (task.empleadoAsignado === undefined) {
        return res.status(404).json({
            msg: "No hay ninguna persona a cargo de esta tarea"
        });
    }

    if(task.empleadoAsignado.toString() === uid){
        await TaskList.findByIdAndDelete(id);
        res.status(200).json({
            msg: "Tarea eliminada con éxito"
        });
    } else {
        return res.status(401).json({
            msg: "No tienes permisos para eliminar esta tarea"
        });
    }
}

export const completeTask = async (req, res) => {
    const {id} = req.params;
    const {uid} = req.user;

    const task = await TaskList.findById(id);

    if (task.empleadoAsignado === undefined) {
        return res.status(404).json({
            msg: "No hay ninguna persona a cargo de esta tarea"
        });
    } 

    if(task.empleadoAsignado.toString() === uid){
        await TaskList.findByIdAndUpdate(id, {estado: true});
        const taskCompleted = await TaskList.findById(id);
        res.status(200).json({
            msg: "Tarea completada con éxito",
            taskCompleted
        });
    } else {
        return res.status(401).json({
            msg: "No tienes permisos para completar esta tarea"
        });
    }
}

