
const STORAGE_KEY = 'boardDB'


export const storageService = {
    query,
    remove,
    get,
    post,
    put,
    // createTodos,

}



function query(entityType, filterBy, delay = 0) {
    // if (!filterBy) filterBy = { type: 'all', search: '', labels: [] }    
    var entities = _loadToysFromStorage(entityType) || []

    // if (!entities.length) _createToys();
    const filteredToys = _getFilteredToys(entities, filterBy)


    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject('OOOOPs')
            resolve(filteredToys)
        }, delay)
    })
    // return Promise.resolve(entities)
}



function _getFilteredToys(entities, filterBy) {
    if (!filterBy) filterBy = {}
    console.log('filterBy:', filterBy);


    if (filterBy.search) {
        entities = entities.filter(toy => toy.name.toLowerCase().includes(filterBy.search.toLowerCase()))
    }

    if (filterBy.type === 'instock') {
        entities = entities.filter(toy => toy.inStock);
    }

    if (filterBy.type === 'outofstock') {
        entities = entities.filter(toy => !toy.inStock);
    }

    if (filterBy.labels?.length) {
        entities = entities.filter(toy => toy.labels.includes(filterBy.labels.join(',')))

    }


    return entities;
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
    
    newEntity._id = utilService.makeId()
    newEntity.createdAt = Date.now()
    newEntity.isStock = true
    newEntity.reviews=[]
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


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}



// function _createToys() {

//     let toys = _loadToysFromStorage() || []
//     if (!toys.length) {
//         toys = [
//             {
//                 "_id": "t101",
//                 "name": "Talking Doll",
//                 "price": 123,
//                 "labels": ["Doll", "Battery Powered", "Baby"],
//                 "reviews": [
//                     { "_id": "r101", "by": "Elad", "at": 1641831343770, "txt": "Bad Toy", "rate": 1 },
//                     { "_id": "r102", "by": "Daniel", "at": 1641831343770, "txt": "Good Toy", "rate": 5 },
//                     { "_id": "r103", "by": "Barak", "at": 1641831343770, "txt": "Doesnt work after some time ", "rate": 3 },
//                 ],
//                 "createdAt": 1631031801011,
//                 "inStock": true
//             },
//             {
//                 "_id": "t102",
//                 "name": "Settlers of Catan",
//                 "price": 123,
//                 "labels": ["Puzzle", "Puzzle", "Box game"],
//                 "reviews": [
//                     { "_id": "r101", "by": "Bibi", "at": 1641831343770, "txt": "Like the  Toy", "rate": 1 },
//                     { "_id": "r102", "by": "Shlomo", "at": 1641831343770, "txt": "Good defective toy", "rate": 5 },
//                     { "_id": "r103", "by": "Susi", "at": 1641831343770, "txt": "Doesnt work after some time ", "rate": 3 },
//                 ],
//                 "createdAt": 1631031801011,
//                 "inStock": false
//             },
//             {
//                 "_id": "t103",
//                 "name": "Buzz Lightyears",
//                 "price": 123,
//                 "labels": ["Doll", "Battery Powered", "Action figure"],
//                 "reviews": [
//                     { "_id": "r101", "by": "Rori", "at": 1641831343770, "txt": "Veryy bags Toy", "rate": 1 },
//                     { "_id": "r102", "by": "Lala", "at": 1641831343770, "txt": "Good very good Toy", "rate": 5 },
//                     { "_id": "r103", "by": "Elad", "at": 1641831343770, "txt": "Doesnt work This isnt working some time ", "rate": 3 },
//                 ],
//                 "createdAt": 1631031801011,
//                 "inStock": true
//             },

//         ]



//     }
//     _saveToysToStorage(toys)
//     return toys
// }


function _saveToysToStorage(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

}

function _loadToysFromStorage(STORAGE_KEY) {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))

}








// function _getFilterToys(filterBy, toys) {
//     if (!filterBy) filterBy = { type: 'all', search: '', labels: [] }

//     let { type, search, labels } = filterBy
//     if (type){
//         return toys.filter(toy => {

//             switch (type) {
//                 case 'all':
//                     if(labels.length) return (toy  && toy.labels.includes(labels.join(',')) && (toy.name.toLowerCase().includes(search.toLowerCase())))
//                     // return (toy && (toy.name.toLowerCase().includes(search.toLowerCase())))
//                     // return (toy && toy.labels.includes(labels.join(',')) && (toy.name.toLowerCase().includes(search.toLowerCase())))

//                 case 'instock':
//                     return (toy.inStock && (toy.name.toLowerCase().includes(search.toLowerCase())))
//                 case 'outofstock':
//                     return (!toy.inStock && (toy.name.toLowerCase().includes(search.toLowerCase())))
//                     default: 
//             }

//         })
//     }
// }