'use strict';
const mongoose = require('mongoose'),
    Todo = mongoose.model('todo');

/**
 * Returns a promise for search results.
 *
 * @param search param.
*/
exports.search = (params) => {
    const promise = Todo.find(params).exec();
    return promise;
};

/**
 * Saves the new todo object.
 *
 * @param todo
*/
exports.save = (todo) => {
    const newTodo = new Todo(todo);
    return newTodo.save();
};

/**
 * Returns the todo object by id.
 *
 * @param todoId
*/
exports.get = (todoId) => {
    const todoPromise = Todo.findById(todoId).exec();
    return todoPromise;
};

/**
 * Updates an existing todo.
 *
 * @param updatedTodo
*/
exports.update = (updatedTodo) => {
    const promise = Todo.findByIdAndUpdate(updatedTodo.id, updatedTodo).exec();
    return promise;
};

/**
 * Deletes an existing todo.
 *
 * @param todoId
*/
exports.delete = (todoId) => {
    const promise = Todo.findByIdAndRemove(todoId).exec();
    return promise;
};