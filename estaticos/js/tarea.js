class Tarea{
    constructor(id,textoTarea,estado,contenedor){
        this.id = id;
        this.textoTarea = textoTarea;
        this.DOM = null;
        this.editando = false;
        this.crearComponente(estado,contenedor);
    }
    crearComponente(estado,contenedor){
        this.DOM = document.createElement("div");
        this.DOM.classList.add("tarea");

        //texto
        let textoTarea = document.createElement("h2");
        textoTarea.classList.add("visible");
        textoTarea.innerText = this.textoTarea;

        //input
        let inputTarea = document.createElement("input");
        inputTarea.setAttribute("type","text");
        inputTarea.value = this.textoTarea;


        //boton editar
        let botonEditar = document.createElement("button");
        botonEditar.classList.add("boton");
        botonEditar.innerText = "Editar";

        botonEditar.addEventListener("click",() => this.editarTarea());

        //boton borrar
        let botonBorrar = document.createElement("button");
        botonBorrar.classList.add("boton");
        botonBorrar.innerText = "Borrar";


        botonBorrar.addEventListener("click",  () => this.borrarTarea())

         //boton estado
         let botonEstado = document.createElement("button");
         botonEstado.classList.add("estado", estado ? "terminada" : null);
         botonEstado.appendChild(document.createElement("span"));

         botonEstado.addEventListener("click", () => {
            this.toggleEstado().then(() => botonEstado.classList.toggle("terminada"));
         })


         this.DOM.appendChild(textoTarea);
         this.DOM.appendChild(inputTarea);
         this.DOM.appendChild(botonEditar);
         this.DOM.appendChild(botonBorrar);
         this.DOM.appendChild(botonEstado);
        contenedor.appendChild(this.DOM);
    }

    borrarTarea (){
        this.DOM.remove();
    }
    toggleEstado(){
        return new Promise(callback => {
            callback();
        })
    }
    /*borrarTarea =() => {
        this.DOM.remove();
    }*/

    editarTarea(){
        if(this.editando){

            let textoTemporal = this.DOM.children[1].value;


            if (textoTemporal.trim() != "" && textoTemporal.trim() != this.textoTarea) {
                this.textoTarea = textoTemporal;
            }

            this.DOM.children[0].innerText = this.textoTarea;
            this.DOM.children[0].classList.add("visible");
            this.DOM.children[1].classList.remove("visible");
            this.DOM.children[2].innerText = "editar";
            this.editando = false;
        }else{
            this.DOM.children[0].classList.remove("visible");
            this.DOM.children[1].value = this.textoTarea;
            this.DOM.children[0].classList.add("visible");
            this.DOM.children[2].innerText = "guardar";
            this.editando = true;
        }
    }
}