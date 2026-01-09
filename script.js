const produits = [
    { nom: "Produit A", prix: 7000, image: "https://via.placeholder.com/220x150?text=Produit+A" },
    { nom: "Produit B", prix: 4000, image: "https://via.placeholder.com/220x150?text=Produit+B" },
    { nom: "Produit C", prix: 9000, image: "https://via.placeholder.com/220x150?text=Produit+C" },
];

// Panier
let panier = [];
let total = 0;

// Générer les produits dans HTML
const produitsDiv = document.getElementById('produits');
produits.forEach((p, index) => {
    const div = document.createElement('div');
    div.className = 'produit';
    div.innerHTML = `
        <img src="${p.image}" alt="${p.nom}">
        <h3>${p.nom}</h3>
        <p>Prix: ${p.prix} XOF</p>
        <button onclick="ajouterAuPanier(${index})">Ajouter au panier</button>
    `;
    produitsDiv.appendChild(div);
});

// Ajouter au panier
function ajouterAuPanier(index) {
    const item = produits[index];
    panier.push(item);
    total += item.prix;
    afficherPanier();
}

// Afficher le panier
function afficherPanier() {
    const liste = document.getElementById('listePanier');
    liste.innerHTML = '';
    panier.forEach((item, i) => {
        const li = document.createElement('li');
        li.textContent = `${item.nom} - ${item.prix} XOF`;
        liste.appendChild(li);
    });
    document.getElementById('total').innerText = total;
}

// Commander via WhatsApp
function commander() {
    const nomClient = document.getElementById('nom').value;
    const telClient = document.getElementById('telephone').value;
    const adresseClient = document.getElementById('adresse').value;

    if (!nomClient || !telClient || !adresseClient) {
        alert('Veuillez remplir toutes vos coordonnées.');
        return;
    }

    if (panier.length === 0) {
        alert('Votre panier est vide.');
        return;
    }

    let message = `Bonjour, je souhaite commander:\n`;
    panier.forEach(item => {
        message += `- ${item.nom} : ${item.prix} XOF\n`;
    });
    message += `Total: ${total} XOF\n\n`;
    message += `Nom: ${nomClient}\nTéléphone: ${telClient}\nAdresse: ${adresseClient}`;

    const urlWhatsApp = `https://wa.me/22890114140?text=${encodeURIComponent(message)}`;
    window.open(urlWhatsApp, '_blank');
}