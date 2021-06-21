const ideasRouter = require('express').Router();

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');
ideasRouter.param('ideaId', (req, res, next, id) => {});

// requests
ideasRouter.get('/');

module.exports = ideasRouter;
