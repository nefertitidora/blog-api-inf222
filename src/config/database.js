// config/database.js
// Ce fichier crée et configure la base de données SQLite

const Database = require('better-sqlite3');
const path = require('path');

// Le fichier de la base de données sera créé dans le dossier racine du projet
const DB_PATH = path.join(__dirname, '../../blog.db');

// Connexion à la base de données (la crée si elle n'existe pas)
const db = new Database(DB_PATH);

// Activation du mode WAL pour de meilleures performances
db.pragma('journal_mode = WAL');

// Création de la table articles si elle n'existe pas encore
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    titre     TEXT    NOT NULL,
    contenu   TEXT    NOT NULL,
    auteur    TEXT    NOT NULL,
    date      TEXT    NOT NULL DEFAULT (date('now')),
    categorie TEXT    NOT NULL DEFAULT 'Général',
    tags      TEXT    NOT NULL DEFAULT '[]'
  )
`);

console.log('✅ Base de données SQLite connectée et prête.');

module.exports = db;
