import { storageService } from './async-storage.service.js';
import { utilService } from './util-service.js';

const STORAGE_KEY = 'board';

export const boardService = {
    query,
    getById,
    save,
    remove,
}

function query() {
    return storageService.query(STORAGE_KEY);
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

function remove(boardId) {
    return storageService.remove(STORAGE_KEY, boardId)
}

function save(board) {
    if (board._id) {
        return storageService.put(STORAGE_KEY, board)
    } else {
        return storageService.post(STORAGE_KEY, board)
    }
}