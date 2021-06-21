const meetingsRouter = require('express').Router();

const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require('./db');

meetingsRouter.get('/', (req, res, next) => {});

module.exports = meetingsRouter;
