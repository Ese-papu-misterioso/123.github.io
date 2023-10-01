document.addEventListener("DOMContentLoaded", function() {
    var listaNombres = obtenerNombresGuardados();
    actualizarListaNombres(listaNombres);
});

function agregarNombre() {
    var nombre = document.getElementById("nombreInput").value;
    var listaNombres = obtenerNombresGuardados();
    listaNombres.push(nombre);
    guardarNombres(listaNombres);
    actualizarListaNombres(listaNombres);
    document.getElementById("nombreInput").value = "";
}

function eliminarNombre() {
    var listaNombres = obtenerNombresGuardados();
    var nombreSeleccionado = document.querySelector(".seleccionado");
    if (nombreSeleccionado) {
        var nombre = nombreSeleccionado.textContent.trim().slice(3);
        var indice = listaNombres.indexOf(nombre);
        if (indice > -1) {
            listaNombres.splice(indice, 1);
            guardarNombres(listaNombres);
            actualizarListaNombres(listaNombres);
        }
    }
}

function obtenerNombresGuardados() {
    var nombres = localStorage.getItem("nombres");
    return nombres ? JSON.parse(nombres) : [];
}

function guardarNombres(nombres) {
    localStorage.setItem("nombres", JSON.stringify(nombres));
}

function actualizarListaNombres(nombres) {
    var listaNombres = document.getElementById("listaNombres");
    listaNombres.innerHTML = "";
    nombres.forEach(function(nombre, indice) {
        var li = document.createElement("li");
        var numero = document.createElement("span");
        numero.textContent = (indice + 1) + ". ";
        li.appendChild(numero);
        li.appendChild(document.createTextNode(nombre));
        li.addEventListener("click", function(event) {
            var nombreSeleccionado = document.querySelector(".seleccionado");
            if (nombreSeleccionado) {
                nombreSeleccionado.classList.remove("seleccionado");
            }
            event.target.classList.add("seleccionado");
        });
        listaNombres.appendChild(li);
    });
}