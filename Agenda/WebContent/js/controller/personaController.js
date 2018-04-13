class PersonaController {
	static agregar() {
		var txtId = document.querySelector("#txtId").value;
		var txtNombres = document.querySelector("#txtNombres").value;
		var txtApellidos = document.querySelector("#txtApellidos").value;
		var txtTelefono = document.querySelector("#txtTelefono").value;
		var jsonPersona = {"nombres":txtNombres, "apellidos":txtApellidos, "telefono":txtTelefono, "accioines":""};
		var tblPerAgenda = document.querySelector("#tblPerAgenda");
		var jsonListaPersonas = tblPerAgenda.getAttribute("data-registros");
		var btnAgregarPersona = document.querySelector("#btnAgregarPersona");
		if(btnAgregarPersona.innerHTML == "Actualizar") {
			var indice = Number(btnAgregarPersona.getAttribute("data-indice-registro"));
			var elemsTD = document.querySelectorAll("#tblPerAgenda tbody tr:nth-child("+(indice+1)+") td");
			console.log(elemsTD);
			elemsTD[0].innerHTML = txtNombres;
			elemsTD[1].innerHTML = txtApellidos;
			elemsTD[2].innerHTML = txtTelefono;
			
			jsonListaPersonas = JSON.parse("["+tblPerAgenda.getAttribute("data-registros")+"]");
			
			jsonListaPersonas[indice].nombres = txtNombres;
			jsonListaPersonas[indice].apellidos = txtApellidos;
			jsonListaPersonas[indice].telefono = txtTelefono;
			
			jsonListaPersonas = JSON.stringify(jsonListaPersonas).replace("[","").replace("]","");
			
			tblPerAgenda.setAttribute("data-registros", jsonListaPersonas);
						
			PersonaController.limpiar();
			return;
		}
		
		if(jsonListaPersonas.length > 0) {
			jsonListaPersonas = jsonListaPersonas.concat(",");
		}
		tblPerAgenda.setAttribute("data-registros", jsonListaPersonas + JSON.stringify(jsonPersona));

		var tblPerAgenda = document.querySelector("#tblPerAgenda tbody");
		var elemTH = document.querySelectorAll("#tblPerAgenda thead th");
		var indice = document.querySelectorAll("#tblPerAgenda tbody tr").length;
		var newTR = document.createElement("tr");

		elemTH.forEach(function(element) {
			var clave = element.getAttribute("data-agenda");
			var newTD = document.createElement("td");
			var newContent = null;
			if(clave == "acciones") {
				newTD.innerHTML = "<button class='btnSmall success' onclick='fnEditarPerAgenda("+indice+")'>Editar</button>";
				newTD.innerHTML += "<button class='btnSmall success' onclick='fnEliminarPerAgenda("+indice+")'>Eliminar</button>";
			} else {
				newContent = document.createTextNode(jsonPersona[clave]); 
				newTD.appendChild(newContent);
			}
			newTR.appendChild(newTD);
		});
		tblPerAgenda.appendChild(newTR);
		PersonaController.limpiar();
	}
	
	static actualizar(indice) {
		var tblPerAgenda = document.querySelector("#tblPerAgenda");
		var jsonListaPersonas =  JSON.parse("["+tblPerAgenda.getAttribute("data-registros")+"]");

		document.querySelector("#txtId").value = indice;
		document.querySelector("#txtNombres").value = jsonListaPersonas[indice].nombres;
		document.querySelector("#txtApellidos").value = jsonListaPersonas[indice].apellidos;
		document.querySelector("#txtTelefono").value = jsonListaPersonas[indice].telefono;
	}
	
	static borrar(id) {
		var tblPerAgenda = document.querySelector("#tblPerAgenda");
		var jsonListaPersonas = JSON.parse("["+tblPerAgenda.getAttribute("data-registros")+"]");
		console.log(jsonListaPersonas);

		delete jsonListaPersonas[id];
		//jsonListaPersonas.splice(id, 1);
		
		console.log(jsonListaPersonas);
		jsonListaPersonas = JSON.stringify(jsonListaPersonas).replace("[","").replace("]","");
		jsonListaPersonas = jsonListaPersonas.replace(/,null/g , "");
		jsonListaPersonas = jsonListaPersonas.replace(/null,/g , "");
		
		tblPerAgenda.setAttribute("data-registros", jsonListaPersonas);
		
		var elemTR = document.querySelector("#tr"+id);
		elemTR.parentNode.removeChild(elemTR);
	}
	
	static limpiar() {
		document.querySelector("#txtId").value = "-1";
		document.querySelector("#txtNombres").value = "";
		document.querySelector("#txtApellidos").value = "";
		document.querySelector("#txtTelefono").value = "";
		document.querySelector("#btnAgregarPersona").innerHTML = "Agregar";
	}
}