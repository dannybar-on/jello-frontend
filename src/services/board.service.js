import {httpService} from './http.service'

const STORAGE_KEY = 'board';

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
};

function query(){
    return httpService.get('board')
}


function getById(boardId) {
    return httpService.get(`board/${boardId}`)
}


function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}



function save(board) {
    if (board._id) {
        return httpService.put(`board/${board._id}`, board)
    } else { 
        let newBoard = {
            ...getEmptyBoard(),
            ...board
        }
         return httpService.post('board/', newBoard)
    }
}

function getEmptyBoard() {
    return {
        createdAt: Date.now(),
        isStarred: false,
        groups: [],
        labels: getDefaultLabels(),
        members: [], 
        activities: [],
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
