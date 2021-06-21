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

// Get '/api/meetings' - get an array of all meetings
meetingsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('meetings'));
});

// POST /api/meetigns - post a new meeting
meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = addToDatabase('meetings', createMeeting());
  res.status(201).send(newMeeting);
});

// Delete /api/meetings - delete all meetings
meetingsRouter.delete('/', (req, res, next) => {
  const deleted = deleteAllFromDatabase('meetings');
  if (!deleted.length) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});

module.exports = meetingsRouter;
