// LocalStorage Management
const STORAGE_KEYS = {
    LOST_PETS: 'lostPets',
    FOUND_PETS: 'foundPets'
};

// Initialize data if not exists
function initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.LOST_PETS)) {
        localStorage.setItem(STORAGE_KEYS.LOST_PETS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FOUND_PETS)) {
        localStorage.setItem(STORAGE_KEYS.FOUND_PETS, JSON.stringify([]));
    }
}

// Get pets from localStorage
function getLostPets() {
    const data = localStorage.getItem(STORAGE_KEYS.LOST_PETS);
    return data ? JSON.parse(data) : [];
}

function getFoundPets() {
    const data = localStorage.getItem(STORAGE_KEYS.FOUND_PETS);
    return data ? JSON.parse(data) : [];
}

// Save pet to localStorage
function saveLostPet(petData) {
    const pets = getLostPets();
    petData.id = Date.now().toString();
    petData.dateAdded = new Date().toISOString();
    pets.unshift(petData);
    localStorage.setItem(STORAGE_KEYS.LOST_PETS, JSON.stringify(pets));
}

function saveFoundPet(petData) {
    const pets = getFoundPets();
    petData.id = Date.now().toString();
    petData.dateAdded = new Date().toISOString();
    pets.unshift(petData);
    localStorage.setItem(STORAGE_KEYS.FOUND_PETS, JSON.stringify(pets));
}

// Render pet card
function renderPetCard(pet, type) {
    const imageSrc = pet.image ? `data:image/jpeg;base64,${pet.image}` : '';
    const petIcon = pet.petType === 'Cat' ? 'cat' : (pet.petType === 'Dog' ? 'dog' : 'paw');
    const imageDisplay = imageSrc 
        ? `<img src="${imageSrc}" alt="${pet.name || 'Pet'}">`
        : `<i class="fas fa-${petIcon}"></i>`;
    
    const name = pet.name || (type === 'found' ? 'Found Pet' : 'Unknown');
    const breed = pet.breed || 'Unknown';
    const location = pet.lostLocation || pet.foundLocation || 'Unknown';
    const description = pet.description || 'No description available';
    
    // Truncate description to 2 lines
    const truncatedDesc = description.length > 100 
        ? description.substring(0, 100) + '...' 
        : description;

    return `
        <div class="pet-card">
            <div class="pet-image">
                ${imageDisplay}
            </div>
            <div class="pet-info">
                <h3 class="pet-name">${name}</h3>
                <p class="pet-details"><i class="fas fa-paw"></i> ${pet.petType || 'Unknown'} - ${breed}</p>
                <p class="pet-details"><i class="fas fa-map-marker-alt"></i> ${location}</p>
                ${pet.dateLost ? `<p class="pet-details"><i class="fas fa-calendar"></i> Lost: ${formatDate(pet.dateLost)}</p>` : ''}
                ${pet.dateFound ? `<p class="pet-details"><i class="fas fa-calendar"></i> Found: ${formatDate(pet.dateFound)}</p>` : ''}
                <p class="pet-description">${truncatedDesc}</p>
            </div>
        </div>
    `;
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Load and display pets on homepage
function loadHomePagePets() {
    const lostPetsGrid = document.getElementById('lostPetsGrid');
    const foundPetsGrid = document.getElementById('foundPetsGrid');
    
    if (lostPetsGrid) {
        const lostPets = getLostPets().slice(0, 6); // Show first 6
        if (lostPets.length > 0) {
            lostPetsGrid.innerHTML = lostPets.map(pet => renderPetCard(pet, 'lost')).join('');
        } else {
            lostPetsGrid.innerHTML = '<p style="text-align: center; color: var(--text-light); grid-column: 1/-1;">No lost pets reported yet.</p>';
        }
    }
    
    if (foundPetsGrid) {
        const foundPets = getFoundPets().slice(0, 6); // Show first 6
        if (foundPets.length > 0) {
            foundPetsGrid.innerHTML = foundPets.map(pet => renderPetCard(pet, 'found')).join('');
        } else {
            foundPetsGrid.innerHTML = '<p style="text-align: center; color: var(--text-light); grid-column: 1/-1;">No found pets reported yet.</p>';
        }
    }
}

// Load all pets for listing pages
function loadAllPets(type) {
    const petsGrid = document.getElementById('petsGrid');
    if (!petsGrid) return;
    
    const pets = type === 'lost' ? getLostPets() : getFoundPets();
    
    if (pets.length > 0) {
        petsGrid.innerHTML = pets.map(pet => renderPetCard(pet, type)).join('');
    } else {
        petsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fas fa-search"></i>
                <p>No ${type} pets found. Be the first to report one!</p>
            </div>
        `;
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeStorage();
    initMobileMenu();
    
    // Check which page we're on
    const path = window.location.pathname;
    if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
        loadHomePagePets();
    } else if (path.includes('lost-pets.html')) {
        loadAllPets('lost');
    } else if (path.includes('found-pets.html')) {
        loadAllPets('found');
    }
});

// Image to Base64 converter
function convertImageToBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const base64 = e.target.result.split(',')[1];
        callback(base64);
    };
    reader.readAsDataURL(file);
}

