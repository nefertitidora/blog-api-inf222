// src/config/swagger.js
// Configuration de la documentation Swagger

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API – INF222 TAF1',
      version: '1.0.0',
      description: 'API Backend pour la gestion d\'un blog simple. Développée avec Node.js, Express et SQLite.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur local de développement',
      },
    ],
    components: {
      schemas: {
        Article: {
          type: 'object',
          properties: {
            id:        { type: 'integer',       example: 1 },
            titre:     { type: 'string',        example: 'Introduction au Web' },
            contenu:   { type: 'string',        example: 'Le web est composé de HTML, CSS et JavaScript...' },
            auteur:    { type: 'string',        example: 'Charles' },
            date:      { type: 'string', format: 'date', example: '2026-03-22' },
            categorie: { type: 'string',        example: 'Technologie' },
            tags:      { type: 'array', items: { type: 'string' }, example: ['web', 'html'] },
          },
        },
        ArticleInput: {
          type: 'object',
          required: ['titre', 'contenu', 'auteur'],
          properties: {
            titre:     { type: 'string',        example: 'Mon premier article' },
            contenu:   { type: 'string',        example: 'Contenu de l\'article...' },
            auteur:    { type: 'string',        example: 'Alice' },
            date:      { type: 'string', format: 'date', example: '2026-03-22' },
            categorie: { type: 'string',        example: 'Développement' },
            tags:      { type: 'array', items: { type: 'string' }, example: ['node', 'api'] },
          },
        },
        ArticleUpdate: {
          type: 'object',
          properties: {
            titre:     { type: 'string',        example: 'Titre modifié' },
            contenu:   { type: 'string',        example: 'Contenu mis à jour...' },
            categorie: { type: 'string',        example: 'Backend' },
            tags:      { type: 'array', items: { type: 'string' }, example: ['express', 'sqlite'] },
          },
        },
      },
    },
  },
  // Où chercher les annotations JSDoc pour les routes
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
