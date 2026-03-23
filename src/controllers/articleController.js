// controllers/articleController.js
// Ce fichier contient la LOGIQUE de chaque endpoint
// Il fait le lien entre les routes (URL) et le modèle (base de données)

const ArticleModel = require('../models/articleModel');

const ArticleController = {

  // GET /api/articles
  getAll(req, res) {
    try {
      const { categorie, auteur, date } = req.query;
      const articles = ArticleModel.findAll({ categorie, auteur, date });
      res.status(200).json({ articles });
    } catch (err) {
      res.status(500).json({ erreur: 'Erreur serveur', details: err.message });
    }
  },

  // GET /api/articles/search?query=texte
  search(req, res) {
    try {
      const { query } = req.query;
      if (!query || query.trim() === '') {
        return res.status(400).json({ erreur: 'Le paramètre "query" est requis.' });
      }
      const articles = ArticleModel.search(query.trim());
      res.status(200).json({ articles });
    } catch (err) {
      res.status(500).json({ erreur: 'Erreur serveur', details: err.message });
    }
  },

  // GET /api/articles/:id
  getOne(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ erreur: 'ID invalide.' });

      const article = ArticleModel.findById(id);
      if (!article) {
        return res.status(404).json({ erreur: `Aucun article trouvé avec l'ID ${id}.` });
      }
      res.status(200).json({ article });
    } catch (err) {
      res.status(500).json({ erreur: 'Erreur serveur', details: err.message });
    }
  },

  // POST /api/articles
  create(req, res) {
    try {
      const { titre, contenu, auteur, date, categorie, tags } = req.body;

      // Validation des champs obligatoires
      if (!titre || titre.trim() === '') {
        return res.status(400).json({ erreur: 'Le champ "titre" est obligatoire.' });
      }
      if (!contenu || contenu.trim() === '') {
        return res.status(400).json({ erreur: 'Le champ "contenu" est obligatoire.' });
      }
      if (!auteur || auteur.trim() === '') {
        return res.status(400).json({ erreur: 'Le champ "auteur" est obligatoire.' });
      }
      if (tags && !Array.isArray(tags)) {
        return res.status(400).json({ erreur: 'Le champ "tags" doit être un tableau.' });
      }

      const article = ArticleModel.create({ titre, contenu, auteur, date, categorie, tags });
      res.status(201).json({
        message: 'Article créé avec succès.',
        article
      });
    } catch (err) {
      res.status(500).json({ erreur: 'Erreur serveur', details: err.message });
    }
  },

  // PUT /api/articles/:id
  update(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ erreur: 'ID invalide.' });

      const { titre, contenu, categorie, tags } = req.body;

      if (tags && !Array.isArray(tags)) {
        return res.status(400).json({ erreur: 'Le champ "tags" doit être un tableau.' });
      }

      const article = ArticleModel.update(id, { titre, contenu, categorie, tags });
      if (!article) {
        return res.status(404).json({ erreur: `Aucun article trouvé avec l'ID ${id}.` });
      }
      res.status(200).json({
        message: 'Article mis à jour avec succès.',
        article
      });
    } catch (err) {
      res.status(500).json({ erreur: 'Erreur serveur', details: err.message });
    }
  },

  // DELETE /api/articles/:id
  delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ erreur: 'ID invalide.' });

      const article = ArticleModel.delete(id);
      if (!article) {
        return res.status(404).json({ erreur: `Aucun article trouvé avec l'ID ${id}.` });
      }
      res.status(200).json({
        message: `Article "${article.titre}" supprimé avec succès.`,
        article
      });
    } catch (err) {
      res.status(500).json({ erreur: 'Erreur serveur', details: err.message });
    }
  }
};

module.exports = ArticleController;
