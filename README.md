# 🎯 Gestion des Suivis de Carrière des Agents SRSP Atsimo Andrefana

## 📝 Description du projet

L'application **Gestion des Suivis de Carrière** a été conçue pour les besoins du **SRSP Atsimo Andrefana**. Elle permet de gérer, de manière centralisée et efficace, les informations relatives aux carrières des agents, leurs affectations, décisions, et compétences.

Le système utilise le **stack MERN (MongoDB, Express, React, Node.js)** pour garantir une application robuste, évolutive, et conviviale.

## 🚀 Fonctionnalités principales

- 🧑‍💼 **Gestion des Employés** : Ajouter, modifier ou supprimer des employés.
- 📊 **Suivi des Carrières** : Gestion des affectations, diplômes, et suivi des évolutions de carrière.
- 🗒️ **Journalisation des Actions** : Enregistrer et visualiser les actions effectuées par les administrateurs.
- 🔔 **Automatisation des Notifications** : Envoyer des notifications automatisées en fonction des changements de carrière.

## 📦 Installation

1. Clonez le repository :
   ```bash
   git clone https://github.com/tonrepo/gestion-carriere-srsp.git

    Installez les dépendances server et client :

    bash

cd server
npm install
cd ../client
npm install

Configurez les variables d'environnement (fichier confing.js) :

javascript

export default {
    JWT_SECRET: "FXQKYFjkGQATPEWdyF0bLB6VukFadm6t+No3UFSb3a0=",
    EMAIL: "votreEmail@gmail.com",
    PASSWORD: "VotreMotDePasseDApplication",
    ATLAS_URI: "mongodb+srv://admin:admin123@cluster0.io5lc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
}

Lancez le serveur backend et frontend :

bash

    # Backend
    cd server
    npm start

    # Frontend
    cd ../client
    npm start

💡 Technologies utilisées

    🍃 MongoDB : Base de données NoSQL pour le stockage des informations.
    🚀 Express.js : Serveur backend permettant de gérer les API.
    ⚛️ React.js : Interface utilisateur pour une expérience fluide et interactive.
    🟢 Node.js : Exécution du backend JavaScript côté serveur.

🛠️ Contribuer

Les contributions sont les bienvenues ! Voici comment vous pouvez contribuer :

    Forkez le projet.
    Créez votre branche : git checkout -b feature/NouvelleFonctionnalite.
    Commitez vos modifications : git commit -m 'Ajouter nouvelle fonctionnalité'.
    Pushez sur la branche : git push origin feature/NouvelleFonctionnalite.
    Ouvrez une Pull Request.

© 2024 Gestion des Carrières SRSP | Développé par Lionel
