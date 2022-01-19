import { boardService } from "../services/board.service.js";

export function loadBoards() {
    return async (dispatch) => {
        try {
            const boards = await boardService.query();
            dispatch({ type: 'SET_BOARDS', boards });
        } catch (err) {
            console.log('Cannot load boards', err);
        }
    };
}


export function removeBoard(boardId) {
    return async (dispatch) => {
        try {
            await boardService.remove(boardId);
            dispatch({ type: 'REMOVE_BOARD', boardId });
        } catch (err) {
            console.log('Cannot remive board', err);
        }
    };
}

export function addBoard(board) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(board);
            dispatch({ type: 'ADD_BOARD', board: savedBoard });
        } catch (err) {
            console.log('Cannot add board', err);
        }
    };
}

export function updateBoard(boardToUpdate) {
    return async (dispatch) => {
        try {
            const updatedBoard = await boardService.save(boardToUpdate);
            dispatch({ type: 'UPDATE_BOARD', updatedBoard });
        } catch (err) {
            console.log('Cannot update board', err);
        }
    };
}



//Tasks
export function onAddTask(task, groupId, board) {
    return async (dispatch) => {
        const group = board.groups.find(group => group.id === groupId);
        task = { ...task, createdAt: Date.now() };
        group.tasks = (group.tasks) ? [...group.tasks, task] : [task];
        // board.group = group;
        let boardToUpdate = { ...board };
        boardToUpdate.groups = [...boardToUpdate.groups.map(currGroup => (currGroup.id === groupId) ? group : currGroup)];
        console.log(boardToUpdate);
    };
}