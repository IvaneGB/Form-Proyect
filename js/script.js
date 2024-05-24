/*  Función para mostrar el siguiente Formulario*/

// Obtener una referencia al botón
const continueButton = document.getElementById("continueButton");
const continueButton2 = document.getElementById("continueButton2");
const form1 = document.getElementById("myForm1");
const form2 = document.getElementById("myForm2");
const summaryForm = document.getElementById("summary");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let step = 1;
const stepText = document.getElementById("stepText");
let stepCounter = 1;
let summaryName = document.getElementById("summaryName");
let summaryEmail = document.getElementById("summaryEmail");
let stepNumberSpan = document.getElementById('stepNumber');
let checkboxsChecked = document.querySelectorAll('.checkboxStyles');
let summaryTopicsList = document.getElementById('summaryTopics');
let isChecked = false;



document.addEventListener('DOMContentLoaded', function () {
    const confirmButton = document.getElementById('confirmButton');

    confirmButton.addEventListener('click', function () {
        // Mostrar notificación de éxito
        showSuccessMessage('Success! Your information has been submitted.');

        // Recargar la página después de un breve retraso
        setTimeout(function () {
            location.reload();
        }, 3000); //  5 segundos
    });
});

function showSuccessMessage(message) {
    let successMessage = document.createElement('div');
    successMessage.className = 'success-message show';
    successMessage.textContent = message;

    document.body.appendChild(successMessage);

    // Ocultar la notificación después de un tiempo
    setTimeout(function () {
        successMessage.classList.remove('show');
        document.body.removeChild(successMessage);
    }, 2000); //  4 segundos
}

// Agregar event listeners a los botones de continuar para llamar a la función de incremento
continueButton.addEventListener('click', function () {
    switchForms();
});

continueButton2.addEventListener('click', function () {
    switchForms();
});

// Función para incrementar el contador y actualizar el número en el span del indicador de pasos
function incrementStepCounter() {
    stepCounter++; // Incrementar el contador en 1
    stepNumberSpan.textContent = stepCounter; // Actualizar el contenido del span con el nuevo número
}

 //función para saber si el checbo fue marcado y saber que opciones marco

 function processCheckedCheckboxes() {
    summaryTopicsList.innerHTML = ""; // Limpiar la lista antes de agregar nuevos elementos
    checkboxsChecked.forEach(function (checkbox) {
        if (checkbox.checked) {
            isChecked = true;
            // Crea un nuevo elemento <li>
            let listItem = document.createElement('li');
            // Asigna el valor del checkbox como texto al elemento <li>
            listItem.textContent = checkbox.value;
            // Agrega el elemento <li> a la lista <ul>
            summaryTopicsList.appendChild(listItem);
        }
    });

    return isChecked; // Retornar si al menos un checkbox está marcado
}

// Función de validación del email
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

 // Función para validar los datos de los inputs
 function validateInputs() {
    let nameValidation = document.getElementById('nameValidation');
    let emailValidation = document.getElementById('emailValidation');
    let isValid = true;

    if (!nameInput.value) {
        nameValidation.textContent = "Please enter your name";
        isValid = false;
    } else {
        nameValidation.textContent = "";
    }

    if (!emailInput.value) {
        emailValidation.textContent = "Please enter your email";
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        emailValidation.textContent = "Please enter a valid email address.";
        isValid = false;
    } else {
        emailValidation.textContent = "";
    }

    return isValid;
}

// Actualizar clases de los puntos en la caja StepsBox para el siguiente paso
function updateStepDots(step) {

    let stepDots = document.querySelectorAll('.stepDot');

    stepDots.forEach(function (dot, index) {
        if (index === step - 2) { // Primer punto
            dot.classList.add('point-next-step');
            dot.innerHTML = '&#8226;';
            dot.classList.remove('pointActive');
        } else if (index === step - 1) { // Segundo punto
            dot.classList.add('pointActive');
            dot.innerHTML = '';
            dot.classList.remove('point-next-step');
        }
    });
}


//función switchForms() para cambiar entre formularios
function switchForms() {

    // Validar inputs
    if (!validateInputs()) {
        return;
    }

    // Cambiar entre formularios
    if (form1.style.display !== "none") {
        form1.style.display = "none";
        form2.style.display = "block";
        incrementStepCounter();
        step = 2;
        updateStepDots(step);
    } else if (form2.style.display !== "none") {
        if (!processCheckedCheckboxes()) {
            let checkboxValidation = document.getElementById('checkboxValidation');
            checkboxValidation.textContent = "Please selection a option"
            return;
        }
        form2.style.display = "none";
        summaryForm.style.display = "block";
        summaryName.innerHTML = nameInput.value;
        summaryEmail.innerHTML = emailInput.value;
        incrementStepCounter();
        step = 3;
        updateStepDots(step);
    }

    processCheckedCheckboxes();
   

}


