import reactRouterDom from "react-router-dom";
import { store } from '../store/store';
import { utilService } from "./util-service";

export const taskService = {

    getLabelsById,
    handleDueDateChange,
    getGroupById,
    getGroupId,
    getTaskById,
    handleCopyTask,
    getSearchedMember,
    handleLabelsChange,
    removeLabel,
    handleAttachment,
    handleFileAdd,
    handleToggleLabel,
    getEmptyChecklist,
    getEmptyTodo,
    getUploadTime,
    handleFileRemove,
    handleAttachmentEdit
};


function getLabelsById(board, task) {

    if (!task.labelIds) return [];
    return task.labelIds.map(labelId => board.labels && board.labels.find(label => label.id === labelId));


}



function handleLabelsChange(newLabel, board) {
    let updatedLabels

    if (!newLabel.id) {
        newLabel.id = utilService.makeId()
        board.labels.push(newLabel)
        updatedLabels = board.labels
        return board = {
            ...board,
            labels: [...updatedLabels]
        }
    } else {
        updatedLabels = board.labels.map(label => (label.id === newLabel.id) ? newLabel : label)
        return board = {
            ...board,
            labels: [...updatedLabels]
        }
    }


}


function removeLabel(labelId, labels, board) {


    const updatedGroups = board.groups.map(group => {
        const updatedTasks = group.tasks.map(task => {
            if (task.labelIds) {
                const newTaskLabels = task.labelIds.filter(label => label !== labelId)
                task = { ...task, labelIds: newTaskLabels }
            }
            return task
        })
        return { ...group, tasks: updatedTasks }
    })

    var newLabels = labels.filter(label => label.id !== labelId);
    const boardToUpdate = {
        ...board,
        groups: updatedGroups,
        labels: newLabels
    }


    return boardToUpdate

  


}


function handleToggleLabel(labelId, taskToUpdate) {

    if (!taskToUpdate.labelIds) taskToUpdate.labelIds = []
    if (taskToUpdate.labelIds.includes(labelId)) {
        const labelIdx = taskToUpdate.labelIds.findIndex(id => id === labelId)
        taskToUpdate.labelIds.splice(labelIdx, 1)
    }
    else {
        taskToUpdate.labelIds.push(labelId)
    }

    return taskToUpdate
}

function handleDueDateChange(timestamp, task) {
    if (!timestamp) return;
    const res = { ...task, dueDate: timestamp };
    return res;
}

function getGroupId(taskId) {
    const board = store.getState().boardModule.currBoard;
    return board.groups.find(group => group.tasks.some(task => task.id === taskId))?.id;
}

function getTaskById(taskId, groupId) {
    const board = store.getState().boardModule.currBoard;
    const group = board.groups.find(group => group.id === groupId);
    return group.tasks.find(task => task.id === taskId);
}

function getGroupById(taskId) {
    const board = store.getState().boardModule.currBoard;
    return board.groups.find(group => group.tasks.find(task => task.id === taskId));
}

function handleCopyTask(taskId, groupId, idx, title) {
    const initialBoard = store.getState().boardModule.currBoard;
    const initialGroup = initialBoard.groups.find(group => group.tasks.some(task => task.id === taskId));
    const task = getTaskById(taskId, initialGroup.id);
    let newGroup = initialBoard.groups.find(group => group.id === groupId);
    newGroup.tasks.splice(idx, 0, { ...task, id: utilService.makeId(), title });
    return initialBoard;

}


function getSearchedMember(board, txt) {
    let filtered = board.members.filter(member => {
        return member.username.toLowerCase().includes(txt.toLowerCase()) ||
            member.fullname.toLowerCase().includes(txt.toLowerCase());
    });

    return filtered;
}


function handleFileAdd(url, title = 'Attachment') {
    const taskId = store.getState().boardModule.currTask.id;
    const board = store.getState().boardModule.currBoard;
    const group = getGroupById(taskId);
    const task = store.getState().boardModule.currTask
    if (!task.attachments) task.attachments = [];
    task.attachments.push({ id: utilService.makeId(), url, title, createdAt: Date.now() });
    if (!task.style) task.style = {};
    task.style.bgImg = `url(${url})`;
    return [board, group, task];
}

function handleAttachment(attachmentId, title) {
    if (!attachmentId) return;
    const taskId = store.getState().boardModule.currTask.id;
    const board = store.getState().boardModule.currBoard;
    const group = getGroupById(taskId);
    const task = getTaskById(taskId, group);
    const attachment = task.attachments.find(attachment => attachment.id === attachmentId);
    attachment.title = title;
    return [board, group, task];
}

function handleFileRemove(fileId){
    const taskId = store.getState().boardModule.currTask.id;
    const board = store.getState().boardModule.currBoard;
    const group = getGroupById(taskId);
    const task = getTaskById(taskId, group.id);
    const idx = task.attachments.findIndex(file => file.id === fileId)
    task.attachments.splice(idx, 1);
    return [board, group, task]
}

function handleAttachmentEdit(attachmentId, title) {
    if (!attachmentId) return
    const taskId = store.getState().boardModule.currTask.id;
    const board = store.getState().boardModule.currBoard;
    const group = getGroupById(taskId)
    const task = getTaskById(taskId, group.id)
    const attachment = task.attachments.find(attachment => attachment.id === attachmentId)
    attachment.title = title;
    return [board, group, task]
}

function getEmptyChecklist() {
    return {
        id: utilService.makeId(),
        title: '',
        todos: []
    };
}

function getEmptyTodo() {
    return {
        id: utilService.makeId(),
        title: '',
        isDone: false,
    };
}

function getUploadTime(timestamp) {
    const timePassed = Date.now() - timestamp
    if (timePassed < (1000 * 60)) return 'Added a few seconds ago'
    else if (timePassed < (1000 * 60 * 2)) return 'Added 1 minute ago'
    else if (timePassed < 1000 * 60 * 60) {
        const minutes = Math.floor(timePassed / 1000 / 60)
        return `Added ${minutes} minutes ago`
    }
    else if (timePassed < 1000 * 60 * 60 * 13) {
        const hours = Math.floor(timePassed / 1000 / 60 / 60)
        return `Added ${hours} hours ago`
    } else {
        const date = new Date(timestamp)
        const minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes()
        if (timePassed < 1000 * 60 * 60 * 24) {
            return `Added today at ${date.getHours()}:${minutes} `
        } else if (timePassed < 1000 * 60 * 60 * 48) {
            return `Added yesterday at ${date.getHours()}:${minutes}`
        } else {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            const idx = date.getMonth()
            const month = monthNames[idx]
            const day = date.getDate()
            return `Added ${month} ${day} at ${date.getHours()}:${minutes}`
        }
    }
}