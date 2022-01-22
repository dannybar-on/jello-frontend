

export const taskService = {

    getLabelsById,
    handleDueDateChange,
};


function getLabelsById(board, task) {

    if (!task.labelIds?.length || !task.labelIds) return null

    return task.labelIds.map(labelId => board.labels.find(label => label.id === labelId))

}

function handleDueDateChange(timestamp, task) {
    if (!timestamp) return;
    const res = {...task, dueDate: timestamp}
    return res;
}