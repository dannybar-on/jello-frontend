import { utilService } from "./util-service.js";

const STORAGE_KEY = 'boardDB';

export const storageService = {
    query,
    remove,
    get,
    post,
    put,
};

const gBoards = require('../data/board.json');

function query(entityType, delay = 0) {
    var entities = _loadBoardsFromStorage(entityType) || gBoards;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject('OOOOPs')
            resolve(entities);
            _save(entityType, entities);
        }, delay);
    });
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId);
            entities.splice(idx, 1);
            _save(entityType, entities);
        });
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId));
}


function post(entityType, newEntity) {
    newEntity._id = utilService.makeId();

    return query(entityType)
        .then(entities => {
            entities.push(newEntity);
            _save(entityType, entities);
            return newEntity;
        });
}

function put(entityType, updatedEntity) {

    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id);
            entities.splice(idx, 1, updatedEntity);
            _save(entityType, entities);
            return updatedEntity;
        });
}







function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities));
}

function _loadBoardsFromStorage(STORAGE_KEY) {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));

}