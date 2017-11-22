/*
TP 1 ex_1
Web Storage – Liste des visiteurs en local
Créer par:
	Birnaz Denis - étudiant
	Jonathan Brûlé - étudiant
Toutes les informations sont utilisées uniquement pour les études
*/
window.onload = function(){

// verifie si browser supporte localstorage
	if (typeof(Storage) !== "undefined") {

// prendre les données de localstorage
		var allStorage = localStorage.getItem("donnesStorage");

		if (allStorage != null) {

// creer une array de toutes les données
			var donneAll = creeTabel(allStorage);

// affiche les données
			afficheDonne(donneAll);

// Supprimer toutes les données localstorage
			document.getElementById('effaceTouts').onclick = function() {
				localStorage.removeItem("donnesStorage");
				location.reload();
			}
		}
	}

// prendre à nouveau les données et ajouter au localstorage
	document.getElementById('submitF').onclick = function() {
			let formaSubmit = document.querySelector('#formDonnes');

			let p = verifiefFormulaire();

			if (p) {
				document.getElementById('eror').innerHTML ='';
				tempStorage = localStorage.getItem("donnesStorage");
				let element = '';
				element = element + document.getElementById('prenom').value + ',';
				element = element + document.getElementById('nom').value + ',';
				element += document.getElementById('courriel').value;
				if (tempStorage == null) {
					localStorage.setItem("donnesStorage",element);
				} else {
						localStorage.setItem("donnesStorage",tempStorage+'|'+element);
					}
				tempStorage = localStorage.getItem("donnesStorage");
				formaSubmit.submit();
			} else {
				document.getElementById('eror').innerHTML ='Introdui touts le donne corectement !!!<br><br>';
				formaSubmit.onsubmit = function() {return false;}
			}
	}

// reset le formulaire
	document.getElementById('ressetF').onclick = function() {
		document.getElementById('eror').innerHTML ='';
	}

// annuler la modification des données
	document.getElementById('ressetFM').onclick = function() {
		document.getElementById('formModifie').style.display = 'none';
	}

// enregistrer le modification de données
	document.getElementById('submitFM').onclick = function() {
		let p = verifiefFormulaireM();

		if (p) {
			let allStorage = localStorage.getItem("donnesStorage");
			let donneAll = creeTabel(allStorage);
			let idM = document.getElementById('idM').value;
			let prenomM = document.getElementById('prenomM').value;
			let nomM = document.getElementById('nomM').value;
			let courrielM = document.getElementById('courrielM').value;
			console.log(courrielM);
			donneAll[idM][0] = prenomM;
			donneAll[idM][1] = nomM;
			donneAll[idM][2] = courrielM;
			creeStorage(donneAll);
			location.reload();
		}else {
				document.getElementById('erorM').innerHTML ='Introdui touts le donne corectement !!!<br><br>';
			}
	}

} // end onload

/**
* Vérifie si le formulaire a été rempli correctement
* @return boolean true si tout est correct
*/
function verifiefFormulaire() {
	let formulaireCorect = true;
	let prenom = document.getElementById('prenom').value;
	let nom = document.getElementById('nom').value;
	let courriel = document.getElementById('courriel').value;
	if (prenom == '' || nom == '' || courriel == '') formulaireCorect = false;

	let expr1 = new RegExp(/^[a-z]+$/,"i");
	let resultat = expr1.test(prenom);
	if (!resultat) formulaireCorect = false;
	resultat = expr1.test(nom);
	if (!resultat) formulaireCorect = false;
	let expr2 = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}$/,"");
	resultat = expr2.test(courriel);
	if (!resultat) formulaireCorect = false;

	return formulaireCorect;
}

/**
* Verifie si le formulaire de modification a été rempli correctement
* @return boolean true si tout est correct
*/
function verifiefFormulaireM() {
	let formulaireCorect = true;
	let prenom = document.getElementById('prenomM').value;
	let nom = document.getElementById('nomM').value;
	let courriel = document.getElementById('courrielM').value;
	if (prenom == '' || nom == '' || courriel == '') formulaireCorect = false;

	let expr1 = new RegExp(/^[A-Z][a-z]+$/,"");
	let resultat = expr1.test(prenom);
	if (!resultat) formulaireCorect = false;
	resultat = expr1.test(nom);
	if (!resultat) formulaireCorect = false;
	let expr2 = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}$/,"");
	resultat = expr2.test(courriel);
	if (!resultat) formulaireCorect = false;

	return formulaireCorect;
}

/**
*Transforme la string en array de données
* @param string
* @return array
*/
function creeTabel(str) {
	let resultat = [];
	let userStr = str.split('|');
	for (let i = 0; i<userStr.length; i++) {
		let userArray = userStr[i].split(',');
		resultat.push(userArray);
	}
	return resultat;
}

/**
* Affiche toutes les données
* @param array données
*/
function afficheDonne(donne) {
	let affiche = document.getElementById('tableDonne');
	let str = '<tr><th>ID</th><th>Prenom</th><th>Nom</th><th>Courriel</th><th>Modifie</th><th>Souprime</th></tr>';
	
	for(let i=0; i<donne.length; ++i) {
		str += '<tr><td>'+ (parseInt(i)+1) +'</td>';
		for (let j=0; j<donne[i].length; j++) {
			str+='<td>'+donne[i][j]+'</td>';
		}
		str += '<td><span onclick="modifieUser('+i+')" class="glyphicon glyphicon-pencil" aria-hidden="true"></span></td><td><span onclick="souprimeUser('+i+')" class="glyphicon glyphicon-trash" aria-hidden="true"></span></td></tr>';
	}
	affiche.innerHTML = str;
	document.getElementById('efface').innerHTML = '<button type="button" id="effaceTouts" class="btn btn-danger col-md-4 col-md-offset-8">EFFACE TOUTS</button>';
}

/**
* Transforme toutes les données en string et l'enregistre dans localstorage
* @param array les donnees
*/
function creeStorage(tab) {
	let str = '';
	if (tab.length == 0) {
		localStorage.removeItem("donnesStorage");
	} else {
		str = tab[0][0] +','+ tab[0][1] + ',' + tab[0][2];
		if (tab.length > 1) {
			for (let i=1; i<tab.length; i++) {
				str = str + '|' + tab[i][0] +','+ tab[i][1] + ',' + tab[i][2];
			}
		}
		localStorage.setItem("donnesStorage",str);
	}
}

/**
* Supprimer utilisateur 'n' dans localstorage
* prendre le string dans localstorage et le transformer en array, 
* effacer le user 'n', transformer en string et enregistrer dans localstorage
* @param int id_utilisateur
*/
function souprimeUser(n) {
	let allStorage = localStorage.getItem("donnesStorage");
	let donneAll = creeTabel(allStorage);
	donneAll.splice(n,1);
	creeStorage(donneAll);
	location.reload();
}

/**
* Remplir le formulaire avec les données
* de utilisateur pour le modifier
* @param int id_utilisateur
*/
function modifieUser(n) {
	let allStorage = localStorage.getItem("donnesStorage");
	let donneAll = creeTabel(allStorage);
	document.getElementById('idM').value = n;
	document.getElementById('prenomM').value = donneAll[n][0];
	document.getElementById('nomM').value = donneAll[n][1];
	document.getElementById('courrielM').value = donneAll[n][2];
	document.getElementById('formModifie').style.display = 'block';
}


