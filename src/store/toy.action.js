import { toyService } from '../services/toy-service'
import { swalService } from '../services/swal-service.js'


export function loadToys() {
    return async (dispatch, getState) => {
        const { filterBy } = getState().toyModule

        const toys = await toyService.query(filterBy)

        const action = { type: 'SET_TOYS', toys }
        dispatch(action)

    }
}

export function removeToy(toyId) {
    return async (dispatch) => {
        try {
            await swalService.onDeleteSwal()
            const toy = await toyService.remove(toyId)
            dispatch({ type: 'REMOVE_TOY', toyId: toy })
        } catch (err) {
            console.log('toy remove was canceled');
        }
    }

}

export function setFilterBy(filterBy) {
    if (!filterBy) filterBy = { type: 'all', search: '', label: '', labels: [] }
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER', filterBy })
        return Promise.resolve()
    }
}


export function saveToy(toy) {

    return async (dispatch) => {
        const savedToy = await toyService.save(toy)

        const type = (toy._id) ? 'UPDATE_TOY' : 'ADD_TOY'
        dispatch({ type: type, toy: savedToy })
        swalService.onSaveSwal()
        return

    }
}