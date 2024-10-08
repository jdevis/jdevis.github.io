/** Retrieving datas **/

const signup = document.getElementById("signup"); // form id
const confirmation = document.getElementById("confirmation"); // confirmation step id
const dataForm = document.querySelectorAll(".formData input");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const textRegex = /^[a-zA-Z]{2,}$/;
const email = document.getElementById("email");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const dob = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const isTournament = document.getElementById("location1"); // for parentNode of radio buttons
const tournament = document.querySelectorAll('input[name="location"]');
const cgu = document.getElementById("checkbox1");
const errorMessages = {
	firstLastName: "Veuillez entrer 2 caractères minimum",
	email: "Veuillez saisir une adresse email valide",
	birthdate: "Veuillez entrer votre date de naissance",
	legalAge: "Vous devez être majeur",
	quantity: "Veuillez saisir un chiffre entre 0 et 99",
	tournament: "Veuillez selectionner un tournoi",
	cgu: "Vous devez accepter les conditions d'utilisation",
};

/** toggle class for error */

function toggleClassError(item, message, bool) {
	let attr = "data-error";
	let attrVisible = "data-error-visible";

	if (!bool || bool === "false") {
		item.parentNode.setAttribute(attr, message);
		item.parentNode.setAttribute(attrVisible, true);
	} else {
		item.parentNode.removeAttribute(attr);
		item.parentNode.removeAttribute(attrVisible);
	}
}

/** legal age **/
function validateBirthDate(inputDate) {
	const currentDate = new Date();
	const userDate = new Date(inputDate);

	// Check if userDate is a valid date and is not in the future
	if (isNaN(userDate) || userDate > currentDate) {
		return false;
	}
	// Ensure the user is at least 18 years old
	const minAgeDate = new Date();
	minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);
	if (userDate > minAgeDate) {
		return false;
	}
	return true;
}

/*** form validation ***/

function validateForm(event) {
	event.preventDefault();
	let errors = 0; // count numbers of error

	// Name  (min. 2 letters)
	let firstNameLenght = firstName.value.trim();
	if (!textRegex.test(firstNameLenght)) {
		toggleClassError(firstName, errorMessages.firstLastName, false);
		errors++;
	} else {
		toggleClassError(firstName, errorMessages.firstLastName, true);
	}

	// Lastname  (min. 2 letters)
	let lastNameLenght = lastName.value.trim();
	if (!textRegex.test(lastNameLenght)) {
		toggleClassError(lastName, errorMessages.firstLastName, false);
		errors++;
	} else {
		toggleClassError(lastName, errorMessages.firstLastName, true);
	}

	// Email
	let emailValid = email.value.trim();
	if (!emailRegex.test(emailValid)) {
		toggleClassError(email, errorMessages.email, false);
		errors++;
	} else {
		toggleClassError(email, errorMessages.email, true);
	}

	// Birthdate
	let dobValid = dob.value;
	if (dobValid === "") {
		toggleClassError(dob, errorMessages.birthdate, false);
		errors++;
	}
	if (!validateBirthDate(dobValid)) {
		toggleClassError(dob, errorMessages.legalAge, false);
		errors++;
	} else {
		toggleClassError(dob, errorMessages.birthdate, true);
	}

	// Number of participations ( min 0, max 99)
	let participations = quantity.value;
	if (
		participations === "" ||
		isNaN(participations) ||
		participations < 0 ||
		participations > 99
	) {
		toggleClassError(quantity, errorMessages.quantity, false);
		errors++;
	} else {
		toggleClassError(quantity, errorMessages.quantity, true);
	}

	// Tournaments
	let selected = false;
	// input radio checked
	for (let i = 0; i < tournament.length; i++) {
		if (tournament[i].checked) {
			selected = true;
		}
	}
	if (!selected) {
		toggleClassError(isTournament, errorMessages.tournament, false);
		errors++;
	}
	if (selected) {
		toggleClassError(isTournament, errorMessages.tournament, true);
	}

	// CGU
	if (!cgu.checked) {
		toggleClassError(cgu, errorMessages.cgu, false);
		errors++;
	} else {
		toggleClassError(cgu, errorMessages.cgu, true);
	}

	// Number of error
	if (errors > 0) {
		return false;
	}

	confirmation.classList.remove("hidden"); // show confirmation
	signup.classList.add("hidden"); // hide form
	return true;
}

signup.addEventListener("submit", validateForm);
