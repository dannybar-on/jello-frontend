import { storageService } from './async-storage.service.js';
import { utilService } from './util-service.js';

const STORAGE_KEY = 'board';

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
};

function query() {
    return storageService.query(STORAGE_KEY);
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId);
}

function remove(boardId) {
    return storageService.remove(STORAGE_KEY, boardId);
}

function save(board) {
    console.log('board:', board);
    
    if (board._id) return storageService.put(STORAGE_KEY, board);

    let newBoard = getEmptyBoard();
    newBoard.title = board.title;
    console.log('newBoard', newBoard);
    return storageService.post(STORAGE_KEY, newBoard);
}



function getEmptyBoard() {
    return {
        createdAt: Date.now(),
        isStarred: false,
        groups: [],
        labels: getDefaultLabels(),
        members: [], // should push the logged user 
        activities: [], // maybe board was first created by "user" "at"
        isArchived: null,
    };
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
    ];
}
