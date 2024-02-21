require("dotenv").config();
const postgres = require("postgres");

function conectar() {
    return postgres({
        host: process.env.DB_HOST,
        database :process.env.DB_NAME,
        user : process.env.DB_USER,
        password: process.env.DB_PASSWORD
    })
}

function getTareas() {
    return new Promise( async (ok,ko) => {
        let conexion = conectar();

        try{
            let tareas = await conexion`SELECT * FROM tareas`;

            ok(tareas);

        }catch(error){
            ko({error : " error en base de datos"});
        }


    })
    
}
function crearTareas({tarea}) {
    return new Promise(async (ok,ko) => {
        let conexion = conectar();

        try{
            let [{id}] = await conexion`INSERT INTO tareas (tarea) VALUES ${tarea}) RETURNING id`;

            conexion.end();

            ok(id);
        }catch(error){
            ko({error : "error en base de datos"});
        }
    })
}
function borrarTarea(id){
    return new Promise( async (ok,ko) => {
        let conexion = conectar();

        try{
            let {count} = await conexion`DELETE FROM tareas WHERE id = ${id}`;

            ok(count);

        }catch(error){
            ko({error : " error en base de datos"});
        }


    })
}
function actualizarEstado(id){
    return new Promise( async (ok,ko) => {
        let conexion = conectar();

        try{
            let {count} = await conexion`UPDATE tareas SET terminada = NOT terminada WHERE id = ${id}`;

            ok(count);

        }catch(error){
            ko({error : " error en base de datos"});
        }


    })
}
function actualizarTexto(id,tarea){
    return new Promise( async (ok,ko) => {
        let conexion = conectar();

        try{
            let {count} = await conexion`UPDATE tareas SET tarea = ${tarea} WHERE id = ${id}`;

            ok(count);

        }catch(error){
            ko({error : " error en base de datos"});
        }


    })
}
module.exports = {getTareas,crearTareas,borrarTarea,actualizarEstado,actualizarTexto};