# Projet CaloryCount - ESGI

## 📋 Description

CaloryCount est une application web de suivi des calories et nutriments conçue dans le cadre du projet ESGI. Elle permet aux utilisateurs de suivre leur consommation alimentaire quotidienne.

### 🛠️ Technologies utilisées

- **Vue.js**
- **Vuetify** : Framework UI.
- **Axios** : Client HTTP pour les appels API.
- **Pinia** : Gestion d'état de l'application via un store.
- **Vue Router** : Gestion des routes pour les pages.

## 📋 Prérequis

Pour exécuter ce projet, assurez-vous d'avoir déjà installé les outils suivants :

- Node.js

## 🚀 Guide d'installation

Pour lancer l'application complète, ouvrez un terminal.

### 1️⃣ Cloner le dépôt

Ouvrez un terminal et exécutez les commandes suivantes :

```bash
- git clone https://github.com/NicolasOsborne/CaloryCount.git
- cd CaloryCount

```

### 2️⃣ Installer les dépendances :

```bash
- npm intall
```

### 3️⃣ Configurer les variables d'environnement :

Créer un fichier .env.local à la racine du projet, et renseigner la clé API de l'USDA (pour créer une clé, suivre les instructions via ce lien : https://fdc.nal.usda.gov/api-guide) :

```
- VITE_USDA_API_KEY=votre_clé_api
```

### 4️⃣ Lancer le projet :

```bash
- npm run dev
```

## 🌐 Accéder à l'application

L'application sera accessible à l'URL : http://localhost:5173
