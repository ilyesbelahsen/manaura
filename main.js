document.addEventListener('DOMContentLoaded', function() {
    const email = document.querySelector('#email');
    const success = document.querySelector('#success');
    const error = document.querySelectorAll('.error');

    window.validateForm = function() { 
        clearMessages();
        let errorFlag = false;
    
        if(email.value.length < 1){
            error[0].innerText = "Il Est Obligatoire De Renseigner Le Champ !";
            email.classList.add("error-border");
            errorFlag = true;
        }else{
            if(!emailIsValid(email.value)){
                error[0].innerText = "Adresse E-Mail Invalide !";
                email.classList.add("error-border");
                errorFlag = true;
            }
        }
    
        if (!errorFlag) {
            success.innerText = 'Votre Adresse E-mail A Eté Envoyé Avec Succès. L\'Equipe Vous Exprime Ses Remerciements !';
            resetForm();
            return true; 
        } else {
            return false; 
        }
    }

    function emailIsValid(email){
        let pattern = /\S+@\S+\.\S+/;
        return pattern.test(email);
    }

    function resetForm() {
        email.value = '';
    }
    
    function clearMessages(){
        if (error.length > 0) {
            for(let i = 0; i < error.length; i++){
                error[i].innerText = '';
            }
        }
        if (success) {
            success.innerText = '';
        }
        if (email) {
            email.classList.remove('error-border');
        }
    }
});

const toggleBtn =  document.querySelector('.hamb');
const toggleBtnIcon = document.querySelector('.hamb i');
const navbarResp = document.querySelector('.navbar-title.resp');

toggleBtn.onclick = function() {
    navbarResp.classList.toggle('open')
    const isOpen = navbarResp.classList.contains('open')
    toggleBtnIcon.classList = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars'
};


