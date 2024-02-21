window.validateFormContact = function() {
    // Récupération des éléments du formulaire
    const nomInput = document.querySelector('#entreprise');
    const email = document.querySelector('#email');
    const tel = document.querySelector('#tel');
    const act = document.querySelector('#activity');
    const place = document.querySelector('#place');
    const demande = document.querySelector('#message');
    const error = document.querySelectorAll('.error');
    const success = document.querySelector('#success');

    clearMessages();
    let errorFlag = false;

    if (nomInput.value.length < 1) {
        error[0].innerText = "Il est obligatoire de renseigner le champ ci-dessus !";
        nomInput.classList.add("error-border");
        errorFlag = true;
    }

    if (tel.value.length < 1) {
        error[3].innerText = "Il est obligatoire de renseigner le champ ci-dessus !";
        tel.classList.add("error-border");
        errorFlag = true;
    } else {
        if (!telIsValid(tel.value)) {
            error[3].innerText = "Numero de telephone incorrect !";
            tel.classList.add("error-border");
            errorFlag = true;
        }
    }

    if (email.value.length < 1) {
        error[1].innerText = "Il est obligatoire de renseigner le champ ci-dessus !";
        email.classList.add("error-border");
        errorFlag = true;
    } else {
        if (!emailIsValid(email.value)) {
            error[1].innerText = "Adresse e-mail invalide !";
            email.classList.add("error-border");
            errorFlag = true;
        }
    }

    if (act.value.length < 1) {
        error[2].innerText = "Il est obligatoire de renseigner le champ ci-dessus !";
        act.classList.add("error-border");
        errorFlag = true;
    }

    if (place.value.length < 1) {
        error[4].innerText = "Il est obligatoire de renseigner le champ ci-dessus !";
        place.classList.add("error-border");
        errorFlag = true;
    }

    if (demande.value.length < 1) {
        error[5].innerText = "Il est obligatoire de renseigner le champ ci-dessus !";
        demande.classList.add("error-border");
        errorFlag = true;
    }

    if (!errorFlag) {
        success.innerText = 'Votre Adresse E-mail A Été Envoyée Avec Succès. L\'Équipe Vous Exprime Ses Remerciements !';
        return true;
    } else {
        return false;
    }
}

function resetForm() {
    document.querySelector('#entreprise').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#tel').value = '';
    document.querySelector('#message').value = '';
    document.querySelector('#activity').value = '';
    document.querySelector('#place').value = '';
}

function clearMessages() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.innerText = '');
    const inputs = document.querySelectorAll('.error-border');
    inputs.forEach(input => input.classList.remove('error-border'));
}

function emailIsValid(email) {
    let pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
}

function telIsValid(tel) {
    let pattern = /^0[1-9]([0-9]{8})$/;
    return pattern.test(tel);
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.forms['contact-form'];

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (validateFormContact()) {
            const scriptURL = 'https://script.google.com/macros/s/AKfycbyqWngxmXGWiJT3KjABG2FrrNKbZ-qnJAEYPyeKrSwT0KHScg1MeSif_-D2ymeHzMXF/exec';
            const formData = new FormData(form);

            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => {
                    if (response.ok) {
                        success.innerText = 'Votre Adresse E-mail A Été Envoyée Avec Succès. L\'Équipe Vous Exprime Ses Remerciements !';
                        resetForm();
                    } else {
                        throw new Error('Erreur lors de l\'envoi des données.');
                    }
                })
                .catch(error => console.error('Error!', error.message));
        }
    });
});
