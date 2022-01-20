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
            console.log('boardToUpdate:', boardToUpdate);

            const updatedBoard = await boardService.save(boardToUpdate);
            dispatch({ type: 'SET_CURR_BOARD', board: updatedBoard });
        } catch (err) {
            console.log('Cannot update board', err);
        }
    };
}

export function setCurrBoard(board) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_CURR_BOARD', board });
        } catch (err) {
            console.log('Couldnt update curr board');
        }
    };
}

export function addGroup(newGroup, board) {
    return async (dispatch) => {
        board.groups.push(newGroup);
        try {
            const updatedBoard = await boardService.save(board);
            dispatch({ type: 'SET_CURR_BOARD', board: updatedBoard });
        } catch (err) {
            console.log(err);
        }
    };
}

//Tasks
export function addTask(task, groupId, board) {
    return async (dispatch) => {
        const group = board.groups.find(group => group.id === groupId);
        task = { ...task, createdAt: Date.now() };
        group.tasks = (group.tasks) ? [...group.tasks, task] : [task];
        let boardToUpdate = { ...board };
        boardToUpdate.groups = [...boardToUpdate.groups.map(currGroup => (currGroup.id === groupId) ? group : currGroup)];
        try {
            const updatedBoard = await boardService.save(boardToUpdate);
            dispatch({ type: 'SET_CURR_BOARD', board: updatedBoard });
        } catch (err) {
            console.log(err);
        }

    };
}


export function updateTask(board, groupToSave, taskToSave) {
    return async (dispatch) => {

        const taskIdx = groupToSave.tasks.findIndex(task => task.id === taskToSave.id);
        groupToSave.tasks.splice(taskIdx, 1, taskToSave);
        let boardToUpdate = { ...board };
        boardToUpdate.groups = [...boardToUpdate.groups.map(currGroup => (currGroup.id === groupToSave.id) ? groupToSave : currGroup)];

        try {
            const updatedBoard = await boardService.save(boardToUpdate);
            dispatch({ type: 'SET_CURR_BOARD', board: updatedBoard });
        } catch (err) {

        }

    };

}

