import reactRouterDom from "react-router-dom";
import { store } from '../store/store';
import { utilService } from "./util-service";

export const taskService = {

    getLabelsById,
    handleDueDateChange,
    getGroupById,
    getTaskById,
    handleCopyTask,
    getSearchedMember,
    handleLabelsChange,
    removeLabel,
    handleAttachment,
    handleFileAdd,
    getEmptyChecklist,
};


function getLabelsById(board, task) {
    if (!task.labelIds?.length || !task.labelIds) return null;
    return task.labelIds.map(labelId => board.labels.find(label => label.id === labelId));
}



function handleLabelsChange(newLabel, labels) {

    if (!newLabel.id) {
        newLabel.id = utilService.makeId()
        return labels.push(newLabel)
    } else {
        return labels.map(label => (label.id === newLabel.id) ? newLabel : label)
    }
}


function removeLabel(labelId, labels, currTask, currGroup, board) {
    if (window.confirm('Are you sure you want to delete this label?'))

        currTask.labelIds = currTask.labelIds.filter(label => label !== labelId)
    const taskIdx = currGroup.tasks.findIndex(task => task.id === currTask.id);
    currGroup.tasks.splice(taskIdx, 1, currTask);
    // console.log('currGroup:', currGroup); // GROUP UPDATED!!

    var updatedGroups = board.groups.map(group => (group.id === currGroup.id) ? currGroup : group);
    // console.log('updatedGroups:', updatedGroups);

    var newLabels = labels.filter(label => label.id !== labelId)
    var boardToUpdate = {
        ...board,
        groups: [...updatedGroups],
        labels: [...newLabels]
    }

    return { boardToUpdate, currTask }

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
    const initialGroup = initialBoard.groups.find(group => group.tasks.some(task => task.id === taskId))
    const task = getTaskById(taskId, initialGroup.id)
    let newGroup = initialBoard.groups.find(group => group.id === groupId)
    newGroup.tasks.splice(idx, 0, { ...task, id: utilService.makeId(), title })
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
    const task = getTaskById(taskId, group.id);
    if (!task.attachments) task.attachments = [];
    task.attachments.push({ id: utilService.makeId(), url, title, createdAt: Date.now() });
    // console.log(url);
    if (!task.style) task.style = {};
    task.style.bgImg = `url(${url})`;
    return [board, group, task];
}

function handleAttachment(attachmentId, title) {
    if (!attachmentId) return;
    const taskId = store.getState().boardModule.currTask.id;
    const board = store.getState().boardModule.currBoard;
    const groupId = getGroupId(taskId);
    const task = getTaskById(taskId, groupId);
    const attachment = task.attachments.find(attachment => attachment.id === attachmentId);
    attachment.title = title;
    return [board, groupId, task];
}


function getEmptyChecklist() {
    return {
        id: utilService.makeId(),
        title: '',
        todos: []
    };
}