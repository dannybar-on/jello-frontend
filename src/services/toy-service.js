import { httpService } from './http.service'


export const toyService = {
    // query,
    // remove,
    // getById,
    // save,
    // getLabels,
}


function query(filterBy = null) {
    return httpService.get('toy', filterBy)
}


function getLabels() {
    return httpService.get('toy/labels')
}

function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}


function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}


async function save(newToy) {
    if (newToy._id) {
        return httpService.put(`toy/${newToy._id}`, newToy)
    } else {
        return httpService.post('toy', newToy)
    }
}
