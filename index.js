require("dotenv").config()
const express = require("express");
const {getTareas,crearTareas} = require("./db")
const {json} = require("body-parser");


let servidor = express();

servidor.use(json());

servidor.use("/pruebas", express.static("./pruebas_api"));

servidor.get("/api-todo",async (peticion, respuesta) => {
    try{
        let tareas = await getTareas(); 

        respuesta.json(tareas);


    }catch(error){
        respuesta.status(500);

        respuesta.json(error);
    }
})

servidor.post("/api-todo/crear",async (peticion, respuesta,siguiente) => {
        let {tarea} = peticion.body;

        if(tarea && tarea.trim() != ""){
            try{
                let id = await crearTareas({tarea});
                respuesta.json({id});
            }catch(error){
                respuesta.status(500);

                return respuesta.json(error);
            }
           
        }        
  
        siguiente({error : "...no me enviaste nada"})

})

servidor.put("/api-todo", (peticion, respuesta) => {
       
        respuesta.send("metodo put")
    
})

servidor.delete("/api-todo", (peticion, respuesta) => {
    
        respuesta.send("metodo delete")
    
});

servidor.use((peticion,respuesta) => {
    respuesta.status(404);
    respuesta.json({error : "not found"})
})

servidor.use((error,peticion,respuesta,siguiente) =>{
    respuesta.estatus(400);
    respuesta.send(error);
})

servidor.listen(process.env.PORT)