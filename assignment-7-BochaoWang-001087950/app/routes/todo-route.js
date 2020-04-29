'use strict';

const todoController = require('../controllers/todo-controller');

module.exports = (app) => {
    app.route('/todos')
        .get(todoController.list)
        .post(todoController.save);

    app.route('/todos/:id')
        .get(todoController.get)
        .put(todoController.update)
        .delete(todoController.delete);
};