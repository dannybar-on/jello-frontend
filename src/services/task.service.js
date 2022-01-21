

export const taskService = {

    getLabelsById,

};


function getLabelsById(board, task) {

    if (!task.labelIds?.length || !task.labelIds) return null

    return task.labelIds.map(labelId => board.labels.find(label => label.id === labelId))

}


