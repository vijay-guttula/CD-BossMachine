const express = require('express');
const app = require('../server');
const apiRouter = express.Router();

// Routers
const minionRouter = require('./minionRouter');
const ideasRouter = require('./ideasRouter');
const meetingsRouter = require('./meetingsRouter');

// Bindings
apiRouter.use('/minions', minionRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
