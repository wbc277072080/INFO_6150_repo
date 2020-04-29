'use strict';

const todoRoute = require('./todo-route');

module.exports = (app) => {
    todoRoute(app);
};