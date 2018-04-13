window.onload = function() {
	AgendaController.limpiar();
	PersonaController.limpiar();
	AgendaController.buscar();
}

function nuevaAgenda() {
	var elem = document.querySelector("#stCrearAgenda");
	elem.setAttribute("class", "");
	document.querySelector("#btnGuardar").innerHTML = "Guardar";
}

function fnEditarAgenda(id) {
	var elem = document.querySelector("#stCrearAgenda");	
	elem.setAttribute("class", "");
	AgendaController.actualizar(id);
	document.querySelector("#btnGuardar").innerHTML = "Actualizar";
	document.querySelector("#btnGuardar").setAttribute("data-indice-registro", id);
}

function fnEliminarAgenda(id) {
	AgendaController.borrar(id);
	location.reload();
}

function fnCancelar(ventana) {
	AgendaController.limpiar();
	PersonaController.limpiar();
	var elem = document.querySelector(ventana);
	elem.setAttribute("class", "invisible");
}

function fnGuardarAgenda() {
	var elem = document.querySelector("#stCrearAgenda");
	AgendaController.insertar();
	elem.setAttribute("class", "invisible");
	location.reload();
}

function fnAgregarPersona() {
	PersonaController.agregar();
}

function fnEditarPerAgenda(indice) {
	PersonaController.actualizar(indice);
	document.querySelector("#btnAgregarPersona").innerHTML = "Actualizar";
	document.querySelector("#btnAgregarPersona").setAttribute("data-indice-registro", indice);
}

function fnEliminarPerAgenda(indice) {
	PersonaController.borrar(indice);
}
