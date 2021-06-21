const minionRouter = require('express').Router();

// importing all the database util functions
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

minionRouter.param('minionId', (req, res, next, id) => {
  // to check if there's a minion with that id to work with
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

// GET /api/minions
minionRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
});

// POST /api/minions
minionRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

// GET /api/minions/:minionId
minionRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

// PUT /api/minions/:minionId
minionRouter.put('/:minionId', (req, res, next) => {
  const minionToUpdate = updateInstanceInDatabase('minions', req.body);
  res.send(minionToUpdate);
});

// DELETE /api/minions/:minionId
minionRouter.delete('/:minionId', (req, res, next) => {
  const isDeleted = deleteFromDatabasebyId('minions', req.params.minionId);
  if (isDeleted) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});

module.exports = minionRouter;
