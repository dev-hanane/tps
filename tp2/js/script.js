// Définir la date maximale (18 ans avant aujourd'hui)
window.addEventListener('load', function() {
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const formattedDate = maxDate.toISOString().split('T')[0];
  document.getElementById("birthdate").setAttribute("max", formattedDate);
});

document.getElementById("form").addEventListener("submit", function(e){

  // Validation de la date de naissance (âge minimum 18 ans)
  let birthdateInput = document.getElementById("birthdate").value;
  if (!birthdateInput) {
    alert("Veuillez entrer votre date de naissance");
    e.preventDefault();
    return;
  }

  let birthdate = new Date(birthdateInput);
  let today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  let monthDiff = today.getMonth() - birthdate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }

  if(age < 18){
    alert("❌ Vous devez avoir au moins 18 ans pour vous inscrire");
    e.preventDefault();
    return;
  }

  // Validation de la correspondance des mots de passe
  let password = document.getElementById("password").value;
  let confirm = document.getElementById("confirm_password").value;

  if(!password || !confirm){
    alert("❌ Veuillez remplir les deux champs mot de passe");
    e.preventDefault();
    return;
  }

  if(password !== confirm){
    alert("❌ Les mots de passe ne correspondent pas");
    e.preventDefault();
    return;
  }

  // Validation du pattern du mot de passe (au moins 8 caractères, 1 majuscule, 1 chiffre)
  const passwordRegex = /(?=.*[A-Z])(?=.*[0-9]).{8,}/;
  if (!passwordRegex.test(password)) {
    alert("❌ Le mot de passe doit contenir au minimum:\n- 8 caractères\n- 1 majuscule\n- 1 chiffre");
    e.preventDefault();
    return;
  }

  // Validation du téléphone (pattern français)
  let telephone = document.querySelector('input[name="telephone"]').value;
  const phoneRegex = /^0[1-9]([-. ]?[0-9]{2}){4}$/;
  if(telephone && !phoneRegex.test(telephone)){
    alert("❌ Numéro de téléphone invalide. Format attendu: 06 12 34 56 78");
    e.preventDefault();
    return;
  }

  // Validation de l'email
  let email = document.querySelector('input[name="email"]').value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(email && !emailRegex.test(email)){
    alert("❌ Adresse email invalide");
    e.preventDefault();
    return;
  }

  alert("✅ Inscription réussie!");
});