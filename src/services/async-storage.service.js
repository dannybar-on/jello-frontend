import { utilService } from "./util-service.js";

const STORAGE_KEY = 'boardDB'

export const storageService = {
    query,
    remove,
    get,
    post,
    put,
}

const gBoards = require('../data/board.json');

function query(entityType, delay = 0) {
    var entities = _loadBoardsFromStorage(entityType) || gBoards;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject('OOOOPs')
            resolve(entities)
            _save(entityType, entities)
        }, delay)
    })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}


function post(entityType, newEntity) {
    newEntity._id = utilService.makeId();
    newEntity.createdAt = Date.now();
    newEntity.isStarred = false;
    newEntity.groups = []
    newEntity.labels = getDefaultLabels()
    newEntity.members = [] // should push the logged user 
    newEntity.activities = [] // maybe board was first created by "user" "at"
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    console.log('entityType we are at update:', entityType);

    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}


function getDefaultLabels() {
    return [
        {
            "id": "l101",
            "title": "Done",
            "color": "#61bd4f "
        },
        {
            "id": "l102",
            "title": "In-Progress",
            "color": "#f2d600 "
        },
        {
            "id": "l103",
            "title": "Todo",
            "color": "#ff9f1a "
        },
        {
            "id": "l104",
            "title": "",
            "color": "#eb5a46 "
        },
        {
            "id": "l105",
            "title": "",
            "color": "#c377e0 "
        },
        {
            "id": "l106",
            "title": "",
            "color": "#0079bf "
        }
    ]
}





function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _loadBoardsFromStorage(STORAGE_KEY) {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))

}