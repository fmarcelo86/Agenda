class AgendaController {
	static buscar() {
		var tblAgenda = document.querySelector("#tblAgenda tbody");
		var elemTH = document.querySelectorAll("#tblAgenda thead th");

		for (var i = 1; i <= localStorage.length; i++) {
			var agenda = JSON.parse(localStorage.getItem("Agenda"+i));
			agenda.personas = JSON.parse(agenda.personas);

			if(agenda) {
				var newTR = document.createElement("tr");

				elemTH.forEach(function(element) {
					var clave = element.getAttribute("data-agenda");
					var newTD = document.createElement("td");
					var newContent = null;
					if(clave == "personas") {
						newTD.innerHTML = agenda[clave].length + " Persona(s)";
					}else if(clave == "acciones") {
						newTD.innerHTML = "<button class='btnSmall success' onclick='fnEditarAgenda("+i+")'>Editar</button>";
						newTD.innerHTML += "<button class='btnSmall success' onclick='fnEliminarAgenda("+i+")'>Eliminar</button>";
					} else {
						newContent = document.createTextNode(agenda[clave]); 
						newTD.appendChild(newContent);
					}
					newTR.appendChild(newTD);
				});
				tblAgenda.appendChild(newTR);
			}
		}
	}

	static insertar() {
		var txtDescripcion = document.querySelector("#txtDescripcion").value;
		var txtFecha = document.querySelector("#txtFecha").value;
		var txtHora = document.querySelector("#txtHora").value;
		var txtAsunto = document.querySelector("#txtAsunto").value;
		
		var tblPerAgenda = document.querySelector("#tblPerAgenda");
		var jsonListaPersonas = "[" + tblPerAgenda.getAttribute("data-registros") + "]";
		var agenda = new Agenda(txtDescripcion, txtFecha, txtHora, txtAsunto, jsonListaPersonas);
		
		var btnGuardar = document.querySelector("#btnGuardar");
		var id = localStorage.length+1;
		if(btnGuardar.innerHTML == "Actualizar") {
			id = Number(btnGuardar.getAttribute("data-indice-registro"));
		}
		localStorage.setItem("Agenda"+id, JSON.stringify(agenda));
		console.log(agenda);
	}

	static actualizar(id) {
		var agenda = JSON.parse(localStorage.getItem("Agenda"+id));
		agenda.personas = JSON.parse(agenda.personas);
		
		document.querySelector("#txtDescripcion").value = agenda.descripcion;
		document.querySelector("#txtFecha").value = agenda.fecha;
		document.querySelector("#txtHora").value = agenda.hora;
		document.querySelector("#txtAsunto").value = agenda.asunto;
		
		var tblPerAgenda = document.querySelector("#tblPerAgenda");
		var tblPerAgendaBody = document.querySelector("#tblPerAgenda tbody");
		var elemTH = document.querySelectorAll("#tblPerAgenda thead th");
		
		if(agenda.personas != undefined && agenda.personas.length > 0) {
			for(var clavePers in agenda.personas) {
				var jsonPersona = agenda.personas[clavePers];
				if(jsonPersona == null)continue;
				
				var jsonListaPersonas = tblPerAgenda.getAttribute("data-registros");
				if(jsonListaPersonas.length > 0) {
					jsonListaPersonas = jsonListaPersonas.concat(",");
				}
				tblPerAgenda.setAttribute("data-registros", jsonListaPersonas + JSON.stringify(jsonPersona));
				
				var newTR = document.createElement("tr");
				newTR.setAttribute("id", "tr"+clavePers);
				elemTH.forEach(function(element) {

					var clave = element.getAttribute("data-agenda");
					var newTD = document.createElement("td");
					var newContent = null;
					if(clave == "acciones") {
						newTD.innerHTML = "<button class='btnSmall success' onclick='fnEditarPerAgenda("+clavePers+")'>Editar</button>";
						newTD.innerHTML += "<button class='btnSmall success' onclick='fnEliminarPerAgenda("+clavePers+")'>Eliminar</button>";
					} else {
						newContent = document.createTextNode(jsonPersona[clave]); 
						newTD.appendChild(newContent);
					}
					newTR.appendChild(newTD);
				});
				tblPerAgendaBody.appendChild(newTR);
			}
		}
	}

	static borrar(id) {
		localStorage.removeItem("Agenda"+id);
	}
	
	static limpiar() {
		document.querySelector("#txtDescripcion").value = "";
		document.querySelector("#txtFecha").value = "";
		document.querySelector("#txtHora").value = "";
		document.querySelector("#txtAsunto").value = "";
		var tblPerAgendaBody = document.querySelector("#tblPerAgenda tbody");
		tblPerAgendaBody.innerHTML = "";
		tblPerAgendaBody.setAttribute("data-registros", "");		
		document.querySelector("#btnGuardar").innerHTML = "Guardar";
	}
}