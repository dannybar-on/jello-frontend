import { boardService } from "../services/board.service.js";

export function loadBoards() {
    return async (dispatch) => {
        try {
            const boards = await boardService.query()
            dispatch({type: 'SET_BOARDS', boards})
        } catch (err) {
            console.log('Cannot load boards', err);
        }
    }
}