// app.js
// Point d'entrée principal de l'application
// C'est ce fichier qu'on lance avec : node src/app.js

const express        = require('express');
const cors           = require('cors');
const swaggerUi      = require('swagger-ui-express');
const YAML           = require('yamljs');
const path           = require('path');

// Initialisation de l'application Express
const app  = express();
const PORT = process.env.PORT || 3000;

// -------------------------------------------------------
// MIDDLEWARES (traitements appliqués à chaque requête)
// -------------------------------------------------------

// Permet les requêtes depuis d'autres origines (ex: frontend)
app.use(cors());

// Permet de lire le JSON dans le body des requêtes POST/PUT
app.use(express.json());

// -------------------------------------------------------
// DOCUMENTATION SWAGGER
// -------------------------------------------------------
const swaggerDoc = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// -------------------------------------------------------
// ROUTES
// -------------------------------------------------------
const articleRoutes = require('./routes/articleRoutes');
app.use('/api/articles', articleRoutes);

// Route racine : message de bienvenue
app.get('/', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  res.json({
    message: '🚀 Bienvenue sur le Blog API - INF222 TAF1',
    demo_url: 'https://blog-api-inf222-kv86.onrender.com/',
    documentation: `${baseUrl}/api-docs`,
    endpoints: {
      'GET    /api/articles'            : 'Lister tous les articles',
      'GET    /api/articles/search'     : 'Rechercher des articles (?query=texte)',
      'GET    /api/articles/:id'        : 'Lire un article',
      'POST   /api/articles'            : 'Créer un article',
      'PUT    /api/articles/:id'        : 'Modifier un article',
      'DELETE /api/articles/:id'        : 'Supprimer un article',
    }
  });
});

// Gestion des routes inexistantes (404)
app.use((req, res) => {
  res.status(404).json({ erreur: `Route "${req.method} ${req.url}" introuvable.` });
});

// -------------------------------------------------------
// DÉMARRAGE DU SERVEUR
// -------------------------------------------------------
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📚 Documentation Swagger : http://localhost:${PORT}/api-docs\n`);
});

module.exports = app;
