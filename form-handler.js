// Breed options based on pet type
const BREED_OPTIONS = {
    Dog: ['Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'French Bulldog', 'Bulldog', 'Beagle', 'Poodle', 'Rottweiler', 'Yorkshire Terrier', 'Dachshund', 'Siberian Husky', 'Great Dane', 'Boxer', 'Shih Tzu', 'Border Collie', 'Other'],
    Cat: ['Persian', 'Maine Coon', 'British Shorthair', 'Ragdoll', 'Bengal', 'Siamese', 'American Shorthair', 'Scottish Fold', 'Sphynx', 'Russian Blue', 'Abyssinian', 'Norwegian Forest Cat', 'Other']
};

// Initialize form handlers
document.addEventListener('DOMContentLoaded', () => {
    // Lost Pet Form
    const lostPetForm = document.getElementById('lostPetForm');
    if (lostPetForm) {
        initLostPetForm();
    }

    // Found Pet Form
    const foundPetForm = document.getElementById('foundPetForm');
    if (foundPetForm) {
        initFoundPetForm();
    }

    // File upload handlers
    initFileUpload();
});

// Initialize Lost Pet Form
function initLostPetForm() {
    const form = document.getElementById('lostPetForm');
    const petTypeSelect = document.getElementById('petType');
    const breedGroup = document.getElementById('breedGroup');
    const breedSelect = document.getElementById('breed');
    const colorSelect = document.getElementById('color');
    const customColorGroup = document.getElementById('customColorGroup');
    const customColorInput = document.getElementById('customColor');
    const sizeSelect = document.getElementById('size');
    const customSizeGroup = document.getElementById('customSizeGroup');
    const customSizeInput = document.getElementById('customSize');
    const contactNumberInput = document.getElementById('contactNumber');

    // Pet Type change handler
    petTypeSelect.addEventListener('change', (e) => {
        const petType = e.target.value;
        if (petType === 'Dog' || petType === 'Cat') {
            breedGroup.style.display = 'block';
            breedSelect.innerHTML = '<option value="">Select Breed</option>';
            BREED_OPTIONS[petType].forEach(breed => {
                const option = document.createElement('option');
                option.value = breed;
                option.textContent = breed;
                breedSelect.appendChild(option);
            });
            breedSelect.required = true;
        } else {
            breedGroup.style.display = 'none';
            breedSelect.required = false;
            breedSelect.value = '';
        }
    });

    // Color change handler
    colorSelect.addEventListener('change', (e) => {
        if (e.target.value === 'Other') {
            customColorGroup.style.display = 'block';
            customColorInput.required = true;
        } else {
            customColorGroup.style.display = 'none';
            customColorInput.required = false;
            customColorInput.value = '';
        }
    });

    // Size change handler
    sizeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'Other') {
            customSizeGroup.style.display = 'block';
            customSizeInput.required = true;
        } else {
            customSizeGroup.style.display = 'none';
            customSizeInput.required = false;
            customSizeInput.value = '';
        }
    });

    // Contact number validation (numbers only, 10 digits)
    contactNumberInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        if (e.target.value.length > 10) {
            e.target.value = e.target.value.slice(0, 10);
        }
    });

    // Form submission
    form.addEventListener('submit', handleLostPetSubmit);
}

// Initialize Found Pet Form
function initFoundPetForm() {
    const form = document.getElementById('foundPetForm');
    const petTypeSelect = document.getElementById('petType');
    const breedGroup = document.getElementById('breedGroup');
    const breedSelect = document.getElementById('breed');
    const colorSelect = document.getElementById('color');
    const customColorGroup = document.getElementById('customColorGroup');
    const customColorInput = document.getElementById('customColor');
    const contactNumberInput = document.getElementById('contactNumber');

    // Pet Type change handler
    petTypeSelect.addEventListener('change', (e) => {
        const petType = e.target.value;
        if (petType === 'Dog' || petType === 'Cat') {
            breedGroup.style.display = 'block';
            breedSelect.innerHTML = '<option value="">Select Breed</option>';
            BREED_OPTIONS[petType].forEach(breed => {
                const option = document.createElement('option');
                option.value = breed;
                option.textContent = breed;
                breedSelect.appendChild(option);
            });
            breedSelect.required = true;
        } else {
            breedGroup.style.display = 'none';
            breedSelect.required = false;
            breedSelect.value = '';
        }
    });

    // Color change handler
    colorSelect.addEventListener('change', (e) => {
        if (e.target.value === 'Other') {
            customColorGroup.style.display = 'block';
            customColorInput.required = true;
        } else {
            customColorGroup.style.display = 'none';
            customColorInput.required = false;
            customColorInput.value = '';
        }
    });

    // Contact number validation (numbers only, 10 digits)
    contactNumberInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        if (e.target.value.length > 10) {
            e.target.value = e.target.value.slice(0, 10);
        }
    });

    // Form submission
    form.addEventListener('submit', handleFoundPetSubmit);
}

// Handle Lost Pet Form Submission
function handleLostPetSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Clear previous errors
    clearFormErrors(form);
    
    // Validate form
    if (!validateLostPetForm(form)) {
        return;
    }
    
    // Get form values
    const petData = {
        name: formData.get('petName'),
        petType: formData.get('petType'),
        breed: formData.get('breed') || 'Unknown',
        color: formData.get('color') === 'Other' ? formData.get('customColor') : formData.get('color'),
        size: formData.get('size') === 'Other' ? formData.get('customSize') : formData.get('size'),
        gender: formData.get('gender') || 'Unknown',
        dateLost: formData.get('dateLost'),
        lostLocation: formData.get('lostLocation'),
        petIdentifier: formData.get('petIdentifier') || '',
        contactNumber: formData.get('contactNumber'),
        description: formData.get('description')
    };
    
    // Handle image
    const imageFile = formData.get('petImage');
    if (imageFile && imageFile.size > 0) {
        convertImageToBase64(imageFile, (base64) => {
            petData.image = base64;
            saveAndRedirect(petData, 'lost');
        });
    } else {
        saveAndRedirect(petData, 'lost');
    }
}

// Handle Found Pet Form Submission
function handleFoundPetSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Clear previous errors
    clearFormErrors(form);
    
    // Validate form
    if (!validateFoundPetForm(form)) {
        return;
    }
    
    // Get form values
    const petData = {
        petType: formData.get('petType'),
        breed: formData.get('breed') || 'Unknown',
        color: formData.get('color') === 'Other' ? formData.get('customColor') : formData.get('color'),
        foundLocation: formData.get('foundLocation'),
        dateFound: formData.get('dateFound'),
        contactNumber: formData.get('contactNumber'),
        description: formData.get('description')
    };
    
    // Handle image
    const imageFile = formData.get('petImage');
    if (imageFile && imageFile.size > 0) {
        convertImageToBase64(imageFile, (base64) => {
            petData.image = base64;
            saveAndRedirect(petData, 'found');
        });
    } else {
        saveAndRedirect(petData, 'found');
    }
}

// Validate Lost Pet Form
function validateLostPetForm(form) {
    let isValid = true;
    const formData = new FormData(form);
    
    // Required fields
    const requiredFields = [
        { id: 'petName', name: 'Pet Name' },
        { id: 'petType', name: 'Pet Type' },
        { id: 'color', name: 'Color' },
        { id: 'size', name: 'Size' },
        { id: 'dateLost', name: 'Date Lost' },
        { id: 'lostLocation', name: 'Lost Location' },
        { id: 'contactNumber', name: 'Contact Number' },
        { id: 'description', name: 'Description' }
    ];
    
    requiredFields.forEach(field => {
        const input = form.querySelector(`#${field.id}`);
        if (!input || !input.value.trim()) {
            showFieldError(input, `${field.name} is required`);
            isValid = false;
        }
    });
    
    // Validate breed if pet type is Dog or Cat
    const petType = formData.get('petType');
    if (petType === 'Dog' || petType === 'Cat') {
        const breed = form.querySelector('#breed');
        if (!breed.value) {
            showFieldError(breed, 'Breed is required');
            isValid = false;
        }
    }
    
    // Validate custom color if Other is selected
    const color = formData.get('color');
    if (color === 'Other') {
        const customColor = form.querySelector('#customColor');
        if (!customColor.value.trim()) {
            showFieldError(customColor, 'Custom color is required');
            isValid = false;
        }
    }
    
    // Validate custom size if Other is selected
    const size = formData.get('size');
    if (size === 'Other') {
        const customSize = form.querySelector('#customSize');
        if (!customSize.value.trim()) {
            showFieldError(customSize, 'Custom size description is required');
            isValid = false;
        }
    }
    
    // Validate contact number (10 digits)
    const contactNumber = formData.get('contactNumber');
    if (contactNumber && contactNumber.length !== 10) {
        const contactInput = form.querySelector('#contactNumber');
        showFieldError(contactInput, 'Contact number must be exactly 10 digits');
        isValid = false;
    }
    
    return isValid;
}

// Validate Found Pet Form
function validateFoundPetForm(form) {
    let isValid = true;
    const formData = new FormData(form);
    
    // Required fields
    const requiredFields = [
        { id: 'petType', name: 'Pet Type' },
        { id: 'color', name: 'Color' },
        { id: 'foundLocation', name: 'Found Location' },
        { id: 'dateFound', name: 'Date Found' },
        { id: 'contactNumber', name: 'Contact Number' },
        { id: 'description', name: 'Description' }
    ];
    
    requiredFields.forEach(field => {
        const input = form.querySelector(`#${field.id}`);
        if (!input || !input.value.trim()) {
            showFieldError(input, `${field.name} is required`);
            isValid = false;
        }
    });
    
    // Validate breed if pet type is Dog or Cat
    const petType = formData.get('petType');
    if (petType === 'Dog' || petType === 'Cat') {
        const breed = form.querySelector('#breed');
        if (!breed.value) {
            showFieldError(breed, 'Breed is required');
            isValid = false;
        }
    }
    
    // Validate custom color if Other is selected
    const color = formData.get('color');
    if (color === 'Other') {
        const customColor = form.querySelector('#customColor');
        if (!customColor.value.trim()) {
            showFieldError(customColor, 'Custom color is required');
            isValid = false;
        }
    }
    
    // Validate contact number (10 digits)
    const contactNumber = formData.get('contactNumber');
    if (contactNumber && contactNumber.length !== 10) {
        const contactInput = form.querySelector('#contactNumber');
        showFieldError(contactInput, 'Contact number must be exactly 10 digits');
        isValid = false;
    }
    
    return isValid;
}

// Show field error
function showFieldError(input, message) {
    if (!input) return;
    
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        formGroup.classList.add('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    }
}

// Clear form errors
function clearFormErrors(form) {
    const errorGroups = form.querySelectorAll('.form-group.error');
    errorGroups.forEach(group => {
        group.classList.remove('error');
    });
}

// Save and redirect
function saveAndRedirect(petData, type) {
    if (type === 'lost') {
        saveLostPet(petData);
        alert('Lost pet report submitted successfully!');
        window.location.href = 'index.html';
    } else {
        saveFoundPet(petData);
        alert('Found pet report submitted successfully!');
        window.location.href = 'index.html';
    }
}

// Initialize file upload
function initFileUpload() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        const fileNameDiv = input.closest('.form-group').querySelector('.file-name');
        
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                if (fileNameDiv) {
                    fileNameDiv.textContent = `Selected: ${file.name}`;
                }
            } else {
                if (fileNameDiv) {
                    fileNameDiv.textContent = '';
                }
            }
        });
    });
}

