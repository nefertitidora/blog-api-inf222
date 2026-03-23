# Blog API – INF222 TAF1

API Backend REST pour gérer les articles d'un blog.  
Développée avec **Node.js + Express + SQLite**.

---

## 🌐 Démo en ligne

L'API est déployée et accessible publiquement ici :  
👉 **[https://blog-api-inf222-kv86.onrender.com/](https://blog-api-inf222-kv86.onrender.com/)**

Vous pouvez tester les endpoints directement ou utiliser la [Documentation Swagger en ligne](https://blog-api-inf222-kv86.onrender.com/api-docs).

---

## 📁 Structure du projet

```
blog-api/
├── src/
│   ├── app.js                  ← Point d'entrée (lancer le serveur)
│   ├── swagger.yaml            ← Documentation Swagger
│   ├── config/
│   │   └── database.js         ← Connexion + création de la base SQLite
│   ├── models/
│   │   └── articleModel.js     ← Requêtes SQL (CRUD)
│   ├── controllers/
│   │   └── articleController.js← Logique métier de chaque endpoint
│   └── routes/
│       └── articleRoutes.js    ← Définition des URLs
├── blog.db                     ← Base de données SQLite (créée automatiquement)
├── package.json
└── README.md
```

---

## 🚀 Installation & Démarrage

### Prérequis
- [Node.js](https://nodejs.org/) version 16 ou supérieure

### Étapes

```bash
# 1. Cloner ou télécharger le projet
cd blog-api

# 2. Installer les dépendances
npm install

# 3. Démarrer le serveur
npm start

# Pour le mode développement (redémarrage automatique)
npm run dev
```

Le serveur démarre sur **http://localhost:3000**

---

## 📚 Documentation Swagger

Accessible à : **http://localhost:3000/api-docs**

---

## 🔌 Endpoints

| Méthode | URL                          | Description                        |
|---------|------------------------------|------------------------------------|
| GET     | /api/articles                | Lister tous les articles           |
| GET     | /api/articles?categorie=Tech | Filtrer par catégorie              |
| GET     | /api/articles?auteur=Alice   | Filtrer par auteur                 |
| GET     | /api/articles?date=2026-03-22| Filtrer par date                   |
| GET     | /api/articles/search?query=js| Rechercher dans titre/contenu      |
| GET     | /api/articles/:id            | Lire un article par son ID         |
| POST    | /api/articles                | Créer un article                   |
| PUT     | /api/articles/:id            | Modifier un article                |
| DELETE  | /api/articles/:id            | Supprimer un article               |

---

## 📝 Exemples d'utilisation

### Créer un article (POST)

```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Introduction à Node.js",
    "contenu": "Node.js est un environnement d exécution JavaScript côté serveur.",
    "auteur": "Charles",
    "categorie": "Technologie",
    "tags": ["nodejs", "javascript", "backend"]
  }'
```

**Réponse (201) :**
```json
{
  "message": "Article créé avec succès.",
  "article": {
    "id": 1,
    "titre": "Introduction à Node.js",
    "contenu": "Node.js est un environnement d exécution JavaScript côté serveur.",
    "auteur": "Charles",
    "date": "2026-03-22",
    "categorie": "Technologie",
    "tags": ["nodejs", "javascript", "backend"]
  }
}
```

### Lister tous les articles (GET)

```bash
curl http://localhost:3000/api/articles
```

### Lire un article (GET)

```bash
curl http://localhost:3000/api/articles/1
```

### Modifier un article (PUT)

```bash
curl -X PUT http://localhost:3000/api/articles/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Introduction à Node.js (mise à jour)",
    "tags": ["nodejs", "javascript", "backend", "express"]
  }'
```

### Supprimer un article (DELETE)

```bash
curl -X DELETE http://localhost:3000/api/articles/1
```

### Rechercher (GET)

```bash
curl "http://localhost:3000/api/articles/search?query=javascript"
```

---

## ✅ Codes HTTP utilisés

| Code | Signification              | Quand                          |
|------|----------------------------|--------------------------------|
| 200  | OK                         | Requête réussie                |
| 201  | Created                    | Article créé avec succès       |
| 400  | Bad Request                | Données manquantes/invalides   |
| 404  | Not Found                  | Article introuvable            |
| 500  | Internal Server Error      | Erreur côté serveur            |

---

## 🛠️ Technologies

- **Node.js** + **Express** : Serveur HTTP
- **better-sqlite3** : Base de données SQLite
- **swagger-ui-express** + **yamljs** : Documentation interactive
- **cors** : Gestion des requêtes cross-origin
