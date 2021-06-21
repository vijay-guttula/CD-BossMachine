const ideasRouter = require('express').Router();

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

// requests
// GET /api/ideas - array of all ideas
ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});

// POST /api/ideas - post a new idea to the db
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

// GET /api/ideas/:ideaId - get an idea of the given id
ideasRouter.get('/:ideaId', (req, res, next) => {
  res.status(200).send(req.idea);
});

// PUT /api/ideas/:ideaId - update the idea with the given id
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  const updatedIdea = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdea);
});

// DELETE /api/ideas/:ideaId - delete the idea with the id
ideasRouter.delete('/:ideaId', (req, res, next) => {
  const isDeleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (isDeleted) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});

module.exports = ideasRouter;
