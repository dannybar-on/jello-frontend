import Axios from 'axios'

const API_KEY = '_VDiISmmuxixvpYO1nf6ZfG_nnZoJM7VpwYu5tasWIg'

export const unsplashService = {
    search,
    getPreviewImgs
}

async function query(keyword) {
    const res = await Axios.get(`https://api.unsplash.com/search/photos?query=${keyword}&orientation=landscape&client_id=${API_KEY}`)
    return res.data
}

async function search(keyword) {
    const {results} = await query(keyword)
    return Promise.resolve(
        results.map(pic => {
            return {id: pic.id, preview: pic.urls.small, full: pic.urls.full}
        })
    )
}

async function getPreviewImgs(keyword) {
    const {results} = await query(keyword)
    return Promise.resolve(
        results.map(pic => {
            return { id: pic.id, preview: pic.urls.small, full: pic.urls.full }
        })
    )
}