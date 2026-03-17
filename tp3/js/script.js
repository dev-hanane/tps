// ==========================================
// Script JavaScript pour TechNova
// ==========================================

// Smooth scroll au chargement
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    setupNavigationActive();
    console.log('Site TechNova chargé avec succès');
});

/**
 * Met à jour la navigation active en fonction de la page courante
 */
function setupNavigationActive() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('header.navbar nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            href.endsWith(currentPage)) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialise la validation du formulaire de contact
 */
function initializeForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(form)) {
            // Afficher un message de succès
            showNotification('Merci ! Votre message a été envoyé avec succès.', 'success');
            
            // Réinitialiser le formulaire
            setTimeout(() => {
                form.reset();
            }, 1000);
        }
    });

    // Validation en temps réel
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

/**
 * Valide un champ individuel
 */
function validateField(field) {
    let isValid = true;
    const formGroup = field.closest('.form-group');
    
    // Supprimer les anciens messages d'erreur
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(field.value);
        if (!isValid) {
            showFieldError(formGroup, 'Veuillez entrer une adresse email valide');
        }
    } else if (field.type === 'tel') {
        if (field.value && !/^[\d\s\-\(\)]+$/.test(field.value)) {
            isValid = false;
            showFieldError(formGroup, 'Numéro de téléphone invalide');
        }
    } else if (field.required && !field.value.trim()) {
        isValid = false;
        showFieldError(formGroup, 'Ce champ est obligatoire');
    }
    
    if (isValid) {
        formGroup.classList.remove('has-error');
    } else {
        formGroup.classList.add('has-error');
    }
    
    return isValid;
}

/**
 * Affiche un message d'erreur pour un champ
 */
function showFieldError(formGroup, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #f44336;
        font-size: 0.85rem;
        margin-top: 0.25rem;
    `;
    formGroup.appendChild(errorElement);
}

/**
 * Valide le formulaire entièrement
 */
function validateForm(form) {
    const fields = form.querySelectorAll('[required]');
    let isFormValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

/**
 * Affiche une notification à l'utilisateur
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background-color: #4caf50; color: white;' : 'background-color: #ff9800; color: white;'}
    `;
    
    document.body.appendChild(notification);
    
    // Retirer la notification après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Animations CSS pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .form-group.has-error input,
    .form-group.has-error select,
    .form-group.has-error textarea {
        border-color: #f44336 !important;
        background-color: #ffebee;
    }
`;
document.head.appendChild(style);

/**
 * Fonction pour scroller vers un élément
 */
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Affiche/Cache le menu mobile (si nécessaire)
 */
function toggleMobileMenu() {
    const nav = document.querySelector('header.navbar nav');
    if (nav) {
        nav.classList.toggle('mobile-open');
    }
}

// Export des fonctions pour usage externe
window.TechNova = {
    validateForm,
    validateField,
    showNotification,
    scrollToElement,
    toggleMobileMenu
};
