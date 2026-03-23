// routes/articleRoutes.js
// Ce fichier définit les URLs (endpoints) et les associe aux fonctions du contrôleur

const express = require('express');
const router  = express.Router();
const ArticleController = require('../controllers/articleController');

// IMPORTANT : La route /search doit être AVANT /:id
// sinon Express interpréterait "search" comme un ID

// GET /api/articles/search?query=texte
router.get('/search', ArticleController.search);

// GET /api/articles  (avec filtres optionnels : ?categorie=...&auteur=...&date=...)
router.get('/', ArticleController.getAll);

// GET /api/articles/:id
router.get('/:id', ArticleController.getOne);

// POST /api/articles
router.post('/', ArticleController.create);

// PUT /api/articles/:id
router.put('/:id', ArticleController.update);

// DELETE /api/articles/:id
router.delete('/:id', ArticleController.delete);

module.exports = router;
