
// clase Artistas
contador = 2;
class Artista {
    constructor(nombre, disciplina, pais, anioNacimiento, puntuacion, activo){
        this.nombre = nombre;
        this.disciplina = disciplina;
        this.pais = pais;
        this.anioNacimiento = anioNacimiento;
        this.puntuacion = puntuacion;
        this.activo = activo;
    }
}

// obtener string de los elementos del objeto artista
Artista.prototype.valor = function (texto){
    switch(texto){
        case "nombre": 
            return this.nombre; 
        case "disciplina": 
            return this.disciplina;
        case "pais": 
            return this.pais;
        case "anioNacimiento": 
            return this.anioNacimiento;
        case "puntuacion": 
            return this.puntuacion;
        case "activo": 
            return this.activo;
        default:
            //console.log("no se obtuvo un valor adecuado")
            break;
    }
}

// pasar un toString con todos los valores del objeto
Artista.prototype.toString = function(){
    return this.nombre + " " + this.disciplina + " " + this.pais +
    " " + this.anioNacimiento + " " + this.puntuacion + " " + this.activo;
}
// array con los artistas
let artistas = [
    new Artista("Pepe Gonzalez", "Pintura", "Francia", 1906, 7, true),
    new Artista("Sonia Garcia", "Danza", "España", 1990, 4, false),
    new Artista("Lorenzini Peperonni", "Música", "Italia", 2010, 9, true),
    new Artista("Maria Coscorrones marilole", "Escultura", "Noruega", 2000, 4, true),
    new Artista("Oscar Wilde", "Literatura", "Alemania", 1870, 10, false),
];

// objetos del documento, tabla, botones e inputs
const tabla = document.getElementById("tablaArtistas");
const cuerpoTabla = document.getElementById("tbodyArtistas");
const cabeceraTabla = document.getElementById("theadArtistas");
const buscador = document.getElementById("buscar");

const guardar = document.getElementById("btnGuardar");
const actualizar = document.getElementById("btnActualizar");

const entradasDatos = document.querySelectorAll(".dato");

// mostrar datos
function mostrarTabla(cualTabla) {

    let tablaMostrar;
    if (cualTabla == 'todos') {
        tablaMostrar = artistas;
    } else {
        tablaMostrar = listaBusqueda;
    }
    cuerpoTabla.innerHTML = ""; // vaciamos la tabla
    tablaMostrar.forEach((artista, indice)=> {
        const tr = document.createElement("tr");
        
        // creamos las celdas
        const tdId = document.createElement("td");
        tdId.textContent = indice;

        const tdNombre = document.createElement("td");
        tdNombre.textContent = artista.nombre;

        const tdDisciplina = document.createElement("td");
        tdDisciplina.textContent = artista.disciplina;

        const tdPais = document.createElement("td");
        tdPais.textContent = artista.pais;

        const tdAnio = document.createElement("td");
        tdAnio.textContent = artista.anioNacimiento;

        const tdPuntuacion = document.createElement("td");
        tdPuntuacion.textContent = artista.puntuacion;

        const tdActivo = document.createElement("td");
        tdActivo.textContent = artista.activo;

        // botones
        const tdBotones = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";

        const btnBorrar = document.createElement("button"); 
        btnBorrar.textContent = "Borrar";

        tdBotones.appendChild(btnEditar);
        tdBotones.appendChild(btnBorrar);

        // funcionalidad botones
        // borrar elemento
        btnBorrar.addEventListener("click", (ev) => {
            ev.preventDefault();
            artistas.splice(indice,1);
            mostrarTabla("todos");
        }) 

        btnEditar.addEventListener("click", (ev) => {
            ev.preventDefault();

            // Mostrar boton actualiza y ocultar el guardar
            actualizar.removeAttribute("hidden");
            guardar.setAttribute("hidden", true);
            // pasar al atributo oculto el id
            document.getElementById("id").value = btnEditar.parentElement.parentElement.firstChild.innerHTML;

            // pasar datos al formulario
            datosActualizar(document.getElementById("id").value);
        })


        // añadimos todo al tr
        tr.appendChild(tdId);
        tr.appendChild(tdNombre);
        tr.appendChild(tdDisciplina);
        tr.appendChild(tdPais);
        tr.appendChild(tdAnio);
        tr.appendChild(tdPuntuacion);
        tr.appendChild(tdActivo);
        tr.appendChild(tdBotones);

        // y finalmente a la tabla
        cuerpoTabla.appendChild(tr);
    });
}

// crear nuevo artista
guardar.addEventListener("click", (ev) => {

    ev.preventDefault();
    // nombre
    const nuevoNombre = entradasDatos[0].value;

    // disciplina
    const nuevoDisciplina = entradasDatos[1].value;

    // pais
    const nuevoPais = entradasDatos[2].value;

    // año de nacimiento
    const nuevoAnio = entradasDatos[3].value;

    // puntuacion
    const nuevoPuntuacion = entradasDatos[4].value;

    // activo
    let nuevoActivo;
    if (entradasDatos[5].checked) {
        nuevoActivo = true;
    } else {
        nuevoActivo = false;
    }

    // comprobar datos
    const comprobarNombre = validar(nuevoNombre);
    const comprobarDisciplina = validar(nuevoDisciplina);
    const comprobarPais = validar(nuevoPais);
    const comprobarAnio = validar(nuevoAnio);
    const comprobarPuntuacion = validar(nuevoPuntuacion);


    // crear nuevo artista con los datos si estan llenos, si falta algo avisar
    if (!comprobarAnio || !comprobarDisciplina || !comprobarNombre || !comprobarPais || !comprobarPuntuacion) {
        document.getElementById("avisos").innerHTML = "Te faltan datos";
    } else {
        const nuevoArtista = new Artista(nuevoNombre, nuevoDisciplina, nuevoPais,
            nuevoAnio,nuevoPuntuacion,nuevoActivo);
        artistas.push(nuevoArtista);
        document.getElementById("avisos").innerHTML = "";
    }
    // pintar de nuevo la tabla
    mostrarTabla("todos");
})

// verificar datos
function validar(dato){
    let valor = dato.trim();
    if(valor != ""){
        return valor;
    } else {
        return "";
    }
}

// pasar al formulario datos del artista a actualizar, 
function datosActualizar(id){
    entradasDatos[0].value = artistas[id].nombre;
    entradasDatos[1].value = artistas[id].disciplina;
    entradasDatos[2].value = artistas[id].pais;
    entradasDatos[3].value = artistas[id].anioNacimiento;
    entradasDatos[4].value = artistas[id].puntuacion;
    entradasDatos[5].value = artistas[id].activo;
}


// actualizar un artista,
actualizar.addEventListener("click", (ev) => {
    ev.preventDefault();


    // buscar el artista que coincide con el id
    artistas.forEach((artista, indice)=>{
        if (indice == document.getElementById("id").value) {
            // nombre
            const nuevoNombre = entradasDatos[0].value;

            // disciplina
            const nuevoDisciplina = entradasDatos[1].value;

            // pais
            const nuevoPais = entradasDatos[2].value;

            // año de nacimiento
            const nuevoAnio = entradasDatos[3].value;

            // puntuacion
            const nuevoPuntuacion = entradasDatos[4].value;

            // activo
            let nuevoActivo;
            if (entradasDatos[5].checked) {
                nuevoActivo = true;
            } else {
                nuevoActivo = false;
            }

            // actualizar datos del artista
            artista.nombre = nuevoNombre;
            artista.disciplina = nuevoDisciplina;
            artista.pais = nuevoPais;
            artista.anioNacimiento = nuevoAnio;
            artista.puntuacion = nuevoPuntuacion;
            artista.activo = nuevoActivo;
        }
    })
    
    // volver a ocultar actualizar y mostrar guardar
    actualizar.setAttribute("hidden", true);
    guardar.removeAttribute("hidden");

    // pintar la tabla
    mostrarTabla("todos");
})

let listaBusqueda = [];
// filtro de busqueda
function buscarArtistas (){
    //console.log("Ejecutado");
    listaBusqueda = [];

    // recoger datos y dividirlos en palabras
    let datosBusqueda = buscador.value.trim();

    let listaPalabras = datosBusqueda.split(" ");

    // a filtrar
    if (datosBusqueda != "") {
        listaPalabras.forEach((palabra) => {
            artistas.forEach((artista) => {
                if (artista.toString().toLowerCase().includes(palabra.toLowerCase())) {
                    listaBusqueda.push(artista);
                }
            })
        })
    }

    // comprobar si hay resultados
    if (listaBusqueda.length > 0) {
        mostrarTabla("busqueda");
    } else {
        mostrarTabla("todos");
    }
    // informar de cuantos resultados se ha encontrado
    document.getElementById("mensajeBuscador").innerText = "Encontrados: " + listaBusqueda.length;
}

// ordenar tabla
function ordenarTabla(id) {
    const texto = String(id);
    console.log(texto);
    //console.log(texto);
    // recorremos la lista artistas
    artistas.sort((a, b) => {
        const aValor = a.valor(texto);
        const bValor = b.valor(texto);
        if (typeof aValor === "number" && typeof bValor === "number") {
            if (ordenado == "ascendente") {
                return aValor - bValor;
            } else {
                return bValor - aValor;
            }
        }

        if (ordenado == "ascendente") {
            return String(aValor).localeCompare(String(bValor), "es", { sensitivity: "base" });
        } else {
            return String(bValor).localeCompare(String(aValor), "es", { sensitivity: "base" });
        }
        
    })

}

let ordenado = "ascendente";
// documento del formulario, cargar tabla desde el principio
document.addEventListener("DOMContentLoaded", function() {
    //console.log(entradasDatos);
    // cargamos datos del array
    mostrarTabla("todos");

    // funcionalidad al thead para la busqueda
    const columnasTabla = Array.from(document.getElementsByClassName("sortable"));

    // asignar funcion a cada encabezado de columna
    columnasTabla.forEach(columna => {
        columna.addEventListener("click", (ev) =>{
            ev.preventDefault();

            ordenarTabla(columna.getAttribute("data-key"));
            // intercalar entre ascendente y descentente
            if (ordenado == "ascendente") {
                ordenado = "descendente";
            } else {
                ordenado = "ascendente";
            }

            // repintar la tabla
            mostrarTabla("todos");
        })
    })

    // funcionalidad de la caja de busqueda
    buscador.addEventListener("keyup", (ev) => {
        ev.preventDefault();
        //console.log(buscador.value);
        buscarArtistas();
    })
})
