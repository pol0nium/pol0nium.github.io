# Mariage Anaïs & Matthias - Site Web

Site web de mariage pour Anaïs et Matthias - 4 juillet 2026

## 🌐 Aperçu

Site web responsive et élégant créé pour annoncer et partager les détails du mariage. Le site est conçu pour être hébergé sur GitHub Pages.

## 🎨 Caractéristiques

- **Design élégant** avec palette de couleurs de mariage (ivoire, rose poudré, or)
- **Carrousel de photos** avec navigation automatique et manuelle
- **Entièrement responsive** - optimisé pour mobile, tablette et desktop
- **Navigation fluide** avec menu hamburger pour mobile
- **Animations douces** au scroll et transitions élégantes
- **Contenu en français**

## 📄 Pages

- **Accueil** (`index.html`) - Carrousel, programme de la journée, lieu et RSVP
- **Hébergement** (`hebergement.html`) - Informations sur les chambres disponibles et hôtels à proximité
- **Enfants** (`enfants.html`) - Informations sur la garde d'enfants
- **Accès** (`acces.html`) - Plan et itinéraire pour rejoindre le lieu

## 🚀 Déploiement sur GitHub Pages

### 1. Créer un repository GitHub

1. Créez un nouveau repository sur GitHub
2. Donnez-lui un nom (ex: `mariage-anais-matthias`)
3. Ne cochez pas "Initialize with README" (nous en avons déjà un)

### 2. Pousser le code vers GitHub

```bash
# Initialisez le repository git
git init

# Ajoutez tous les fichiers
git add .

# Créez le premier commit
git commit -m "Initial commit - Site de mariage"

# Ajoutez le repository distant (remplacez USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/USERNAME/mariage-anais-matthias.git

# Poussez le code
git branch -M main
git push -u origin main
```

### 3. Activer GitHub Pages

1. Allez dans les paramètres du repository (Settings)
2. Cliquez sur "Pages" dans le menu de gauche
3. Sous "Source", sélectionnez la branche `main`
4. Sélectionnez le dossier `/ (root)`
5. Cliquez sur "Save"

Votre site sera disponible à l'adresse : `https://USERNAME.github.io/mariage-anais-matthias/`

### 4. Domaine personnalisé (optionnel)

Si vous souhaitez utiliser un domaine personnalisé :

1. Ajoutez un fichier `CNAME` à la racine du projet contenant votre domaine
2. Configurez les DNS de votre domaine pour pointer vers GitHub Pages
3. Dans les paramètres GitHub Pages, entrez votre domaine personnalisé

## 📝 Personnalisation

### Remplacer les photos du carrousel

1. Ajoutez vos photos dans le dossier `images/`
2. Nommez-les comme vous voulez (ex: `photo1.jpg`, `photo2.jpg`, etc.)
3. Modifiez les références dans `index.html` :

```html
<div class="carousel-slide active">
    <img src="images/votre-photo1.jpg" alt="Photo 1">
</div>
```

### Ajouter les liens de formulaires

1. **RSVP** : Dans `index.html`, remplacez `href="#"` par votre lien Google Form :
```html
<a href="VOTRE_LIEN_GOOGLE_FORM" class="btn-primary" id="rsvpBtn">Confirmer ma présence</a>
```

2. **Réservation hébergement** : Dans `hebergement.html`, même procédure

### Compléter les informations d'hébergement

Dans `hebergement.html`, ajoutez :
- Le nombre de chambres et lits disponibles
- La liste des hôtels à proximité avec leurs coordonnées

### Personnaliser la carte

Dans `acces.html`, remplacez l'URL de l'iframe Google Maps par celle du lieu exact :

1. Allez sur Google Maps
2. Recherchez "9 Rue de l'Église, 27420 Mouflaines"
3. Cliquez sur "Partager" puis "Intégrer une carte"
4. Copiez le code iframe et remplacez celui existant

## 🛠 Structure du projet

```
mariage/
├── index.html              # Page d'accueil
├── hebergement.html        # Page hébergement
├── enfants.html           # Page enfants
├── acces.html             # Page accès
├── css/
│   └── style.css          # Styles CSS
├── js/
│   └── main.js            # JavaScript
├── images/
│   ├── placeholder1.svg   # Photo carrousel 1 (à remplacer)
│   ├── placeholder2.svg   # Photo carrousel 2 (à remplacer)
│   ├── placeholder3.svg   # Photo carrousel 3 (à remplacer)
│   └── placeholder4.svg   # Photo carrousel 4 (à remplacer)
├── .gitignore
└── README.md
```

## 💡 Fonctionnalités techniques

- **Carrousel automatique** : Rotation toutes les 5 secondes
- **Navigation tactile** : Support du swipe sur mobile
- **Navigation clavier** : Flèches gauche/droite pour le carrousel
- **Menu responsive** : Menu hamburger sur mobile
- **Animations au scroll** : Apparition progressive des cartes
- **Optimisé pour le SEO** : Meta tags et structure sémantique

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge (dernières versions)
- ✅ iOS Safari et Chrome
- ✅ Android Chrome
- ✅ Responsive : Mobile, Tablette, Desktop

## 📞 Support

Pour toute question ou modification, contactez-nous !

---

Fait avec ❤️ pour célébrer notre union

