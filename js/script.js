/* =============================================
   DOKKAN BATTLE - SCRIPT JAVASCRIPT
   Fichier: script.js
   ============================================= */

// ========================================
// PARTIE 1 : LES DONNÉES (notre "base de données")
// ========================================

// Tableau qui contient toutes nos équipes
let equipes = [
    {
        nom: "Puissance Divine",
        categorie: "Super",
        leader: "Goku Ultra Instinct",
        personnages: [
            "Vegeta Ultra Ego",
            "Gohan Beast",
            "Piccolo Orange",
            "Broly Super Saiyan",
            "Freezer Golden"
        ],
        puissance: "950K"
    },
    {
        nom: "Forces du Mal",
        categorie: "Extrême",
        leader: "Freezer Black",
        personnages: [
            "Cell Perfect",
            "Majin Buu",
            "Zamasu Fusionné",
            "Goku Black",
            "Broly Légendaire"
        ],
        puissance: "920K"
    },
    {
        nom: "Guerriers Fusionnés",
        categorie: "Fusion",
        leader: "Gogeta Blue",
        personnages: [
            "Vegito Blue",
            "Gotenks SSJ3",
            "Kefla SSJ2",
            "Zamasu Fusionné",
            "Super Buu Gohan"
        ],
        puissance: "980K"
    }
];

// ========================================
// PARTIE 2 : SÉLECTION DES ÉLÉMENTS HTML
// ========================================

// On récupère les éléments de la page dont on a besoin
const equipesGrid = document.getElementById('equipesGrid');
const btnAjouter = document.getElementById('btnAjouter');
const modal = document.getElementById('modal');
const btnAnnuler = document.getElementById('btnAnnuler');
const formEquipe = document.getElementById('formEquipe');
const filtresBtns = document.querySelectorAll('.filtre-btn');

// ========================================
// PARTIE 3 : FONCTION POUR AFFICHER LES ÉQUIPES
// ========================================

function afficherEquipes(categorieFiltre = 'toutes') {
    // On vide d'abord la grille
    equipesGrid.innerHTML = '';

    // On filtre les équipes selon la catégorie choisie
    const equipesFiltrees = categorieFiltre === 'toutes' 
        ? equipes 
        : equipes.filter(eq => eq.categorie === categorieFiltre);

    // Si aucune équipe, on affiche un message
    if (equipesFiltrees.length === 0) {
        equipesGrid.innerHTML = '<div class="message-vide">Aucune équipe dans cette catégorie</div>';
        return;
    }

    // Pour chaque équipe, on crée une carte
    equipesFiltrees.forEach((equipe, index) => {
        const carteHTML = `
            <div class="carte-equipe" style="animation-delay: ${index * 0.1}s">
                <span class="badge-categorie">${equipe.categorie}</span>
                <h3>${equipe.nom}</h3>
                <div class="leader">
                    <strong>👑 Leader :</strong> ${equipe.leader}
                </div>
                <ul class="personnages">
                    ${equipe.personnages.map(p => `<li>⚡ ${p}</li>`).join('')}
                </ul>
                <div class="stats">
                    💪 Puissance moyenne : <strong>${equipe.puissance}</strong>
                </div>
            </div>
        `;
        equipesGrid.innerHTML += carteHTML;
    });
}

// ========================================
// PARTIE 4 : GESTION DES FILTRES
// ========================================

filtresBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // On retire la classe "actif" de tous les boutons
        filtresBtns.forEach(b => b.classList.remove('actif'));
        
        // On ajoute "actif" au bouton cliqué
        this.classList.add('actif');
        
        // On récupère la catégorie et on affiche les équipes
        const categorie = this.dataset.categorie;
        afficherEquipes(categorie);
    });
});

// ========================================
// PARTIE 5 : GESTION DU MODAL (fenêtre popup)
// ========================================

// Ouvrir le modal
btnAjouter.addEventListener('click', function() {
    modal.classList.add('actif');
});

// Fermer le modal
btnAnnuler.addEventListener('click', function() {
    modal.classList.remove('actif');
    formEquipe.reset();
});

// Fermer si on clique en dehors du modal
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('actif');
        formEquipe.reset();
    }
});

// ========================================
// PARTIE 6 : AJOUTER UNE NOUVELLE ÉQUIPE
// ========================================

formEquipe.addEventListener('submit', function(e) {
    // On empêche le rechargement de la page
    e.preventDefault();

    // On récupère les valeurs du formulaire
    const nouvelleEquipe = {
        nom: document.getElementById('nomEquipe').value,
        categorie: document.getElementById('categorie').value,
        leader: document.getElementById('leader').value,
        personnages: document.getElementById('personnages').value
            .split('\n')
            .filter(p => p.trim() !== ''), // On enlève les lignes vides
        puissance: Math.floor(Math.random() * 100 + 850) + 'K' // Puissance aléatoire
    };

    // On ajoute l'équipe au tableau
    equipes.push(nouvelleEquipe);

    // On rafraîchit l'affichage
    afficherEquipes('toutes');

    // On réinitialise les filtres
    filtresBtns.forEach(b => b.classList.remove('actif'));
    filtresBtns[0].classList.add('actif');

    // On ferme le modal et on vide le formulaire
    modal.classList.remove('actif');
    formEquipe.reset();

    // Message de confirmation (optionnel)
    alert('✅ Équipe ajoutée avec succès !');
});

// ========================================
// PARTIE 7 : INITIALISATION
// ========================================

// On affiche toutes les équipes au chargement de la page
afficherEquipes('toutes');