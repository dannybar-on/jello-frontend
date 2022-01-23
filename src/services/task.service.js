import reactRouterDom from "react-router-dom";
import {store} from '../store/store'
import { utilService } from "./util-service";

export const taskService = {

    getLabelsById,
    handleDueDateChange,
    getClassByStatus,
    getGroupById,
    getTaskById,
    handleCopyTask
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

function getTaskById(taskId, groupId) {
    const board = store.getState().boardModule.currBoard
    const group = board.groups.find(group => group.id === groupId)
    return group.tasks.find(task => task.id === taskId)
}

function getGroupById(taskId) {
    const board = store.getState().boardModule.currBoard
    return board.groups.find(group => group.tasks.find(task => task.id === taskId))
}

function handleCopyTask(taskId, groupId, idx, title) {
    const initialBoard = store.getState().boardModule.currBoard;
    const initialGroup = initialBoard.groups.find(group => group.tasks.some(task => task.id === taskId))
    const task = getTaskById(taskId, initialGroup.id)
    let newGroup = initialBoard.groups.find(group => group.id === groupId)
    newGroup.tasks.splice(idx, 0, {...task, id: utilService.makeId(), title})
    return initialBoard;

}