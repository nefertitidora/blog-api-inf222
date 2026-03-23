// models/articleModel.js
// Ce fichier contient TOUTES les interactions avec la base de données
// (On parle de "modèle" car il représente la structure des données)

const db = require('../config/database');

const ArticleModel = {

  // Récupérer tous les articles (avec filtres optionnels)
  findAll({ categorie, auteur, date } = {}) {
    let query = 'SELECT * FROM articles WHERE 1=1';
    const params = [];

    if (categorie) {
      query += ' AND categorie = ?';
      params.push(categorie);
    }
    if (auteur) {
      query += ' AND auteur = ?';
      params.push(auteur);
    }
    if (date) {
      query += ' AND date = ?';
      params.push(date);
    }

    query += ' ORDER BY id DESC';
    const rows = db.prepare(query).all(...params);

    // Convertir les tags (stockés en JSON string) en tableau JS
    return rows.map(row => ({ ...row, tags: JSON.parse(row.tags) }));
  },

  // Récupérer un seul article par son ID
  findById(id) {
    const row = db.prepare('SELECT * FROM articles WHERE id = ?').get(id);
    if (!row) return null;
    return { ...row, tags: JSON.parse(row.tags) };
  },

  // Rechercher des articles par mot-clé dans titre ou contenu
  search(query) {
    const rows = db.prepare(
      "SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ? ORDER BY id DESC"
    ).all(`%${query}%`, `%${query}%`);
    return rows.map(row => ({ ...row, tags: JSON.parse(row.tags) }));
  },

  // Créer un nouvel article
  create({ titre, contenu, auteur, date, categorie, tags }) {
    const tagsJson = JSON.stringify(tags || []);
    const articleDate = date || new Date().toISOString().split('T')[0];

    const result = db.prepare(
      'INSERT INTO articles (titre, contenu, auteur, date, categorie, tags) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(titre, contenu, auteur, articleDate, categorie || 'Général', tagsJson);

    // Retourner l'article créé
    return this.findById(result.lastInsertRowid);
  },

  // Mettre à jour un article existant
  update(id, { titre, contenu, categorie, tags }) {
    const existing = this.findById(id);
    if (!existing) return null;

    // On garde les anciennes valeurs si de nouvelles ne sont pas fournies
    const newTitre    = titre     ?? existing.titre;
    const newContenu  = contenu   ?? existing.contenu;
    const newCategorie= categorie ?? existing.categorie;
    const newTags     = tags      ? JSON.stringify(tags) : JSON.stringify(existing.tags);

    db.prepare(
      'UPDATE articles SET titre = ?, contenu = ?, categorie = ?, tags = ? WHERE id = ?'
    ).run(newTitre, newContenu, newCategorie, newTags, id);

    return this.findById(id);
  },

  // Supprimer un article
  delete(id) {
    const existing = this.findById(id);
    if (!existing) return null;

    db.prepare('DELETE FROM articles WHERE id = ?').run(id);
    return existing; // On retourne l'article supprimé pour confirmation
  }
};

module.exports = ArticleModel;
