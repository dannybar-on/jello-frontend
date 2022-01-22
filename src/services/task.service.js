import reactRouterDom from "react-router-dom";


export const taskService = {

    getLabelsById,
    handleDueDateChange,
    getClassByStatus,

};


function getLabelsById(board, task) {

    if (!task.labelIds?.length || !task.labelIds) return null;

    return task.labelIds.map(labelId => board.labels.find(label => label.id === labelId));

}

function handleDueDateChange(timestamp, task) {
    if (!timestamp) return;
    const res = {...task, dueDate: timestamp}
    return res;
}

function getClassByStatus(status) {
    switch (status) {
        case 'in-progress':
            return null;
        case 'over-due':
            return 'red';
        case 'complete':
            return 'green';
        case 'due-soon':
            return 'yellow';
    }
}