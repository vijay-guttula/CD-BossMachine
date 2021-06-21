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

/// Work

minionRouter.param('workId', (req, res, next, id) => {
  const work = getFromDatabaseById('work', id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});

// GET /api/minions/:minionId/work - sends an array of all work
minionRouter.get('/:minionId/work', (req, res, next) => {
  const workArray = getAllFromDatabase('work').filter((work) => {
    return work.minionId === req.params.minionId;
  });
  res.send(workArray);
});

// POST /work - creates and adds new work
minionRouter.post('/:minionId/work', (req, res, next) => {
  const workToAdd = req.body;
  workToAdd.minionId = req.params.minionId;
  const newWork = addToDatabase('work', workToAdd);
  res.status(201).send(newWork);
});

// PUT /work/:workId - updates a current work
minionRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if (req.work.minionId !== req.params.minionId) {
    res.status(400).send();
  }
  const workToUpdate = updateInstanceInDatabase('work', req.body);
  res.send(workToUpdate);
});

// DELETE /:workId - deletes the work with the given work id
minionRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  const isDeleted = deleteFromDatabasebyId('work', req.params.workId);
  if (isDeleted) {
    res.status(204).send();
  }
  res.status(500).send();
});

module.exports = minionRouter;
