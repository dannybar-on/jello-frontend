import React from 'react';

import { taskService } from '../../services/task.service.js';

import { IoMdClose } from 'react-icons/io';
import { BsCheck2Square } from 'react-icons/bs';


export class ChecklistPreview extends React.Component {
    state = {
        isEditOpen: false,
        checklistTitle: '',
    };

    toggleEditOpen = (checklist = null) => {
        const { isEditOpen } = this.state;
        this.setState({ isEditOpen: !isEditOpen });
        if (checklist) this.setState({ checklistTitle: checklist.title });
    };

    onEditCheckList = (checklistId) => {
        const { checklistTitle } = this.state;
        const { currTask, board, updateTask } = this.props;
        const group = taskService.getGroupById(currTask.id);
        const checkToUpdate = currTask.checklists.find(check => check.id === checklistId);
        checkToUpdate.title = checklistTitle;
        updateTask(board, group, currTask);
        this.toggleEditOpen();
    };

    handleChecklistChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });

    };

    onDeleteChecklist = (checklistId) => {
        let { currTask, board } = this.props;
        currTask.checklists = currTask.checklists.filter(checklist => checklist.id !== checklistId);
        const group = taskService.getGroupById(currTask.id);
        this.props.updateTask(board, group, currTask);
    };


    render() {
        const { isEditOpen, checklistTitle } = this.state;
        const { checklist } = this.props;
        return <div className="task-checklist" key={checklist.id}>
            {(!isEditOpen) ?  <div className="details-section-header space-between">
                <span className="icon-lg header-icon t-14">< BsCheck2Square /> </span>
                <h3 onClick={() => this.toggleEditOpen(checklist)}>{checklist.title}</h3>
                <div>
                    <button className="btn-style2" onClick={() => this.onDeleteChecklist(checklist.id)}>Delete</button>
                </div>
            </div>
           
                :
                <div className="details-section-header block">
                    <span className="icon-lg header-icon">< BsCheck2Square /> </span>
                    <textarea className="checklist-edit-textarea" name="checklistTitle" value={checklistTitle}
                        onChange={this.handleChecklistChange} />
                         <div className="form-btns flex">
                    <button className="btn-style1" onClick={() => this.onEditCheckList(checklist.id)}>Save</button>
                    <button className="close-add" onClick={() => this.toggleEditOpen()}><IoMdClose /></button>
                    </div>
                </div>}
        </div>
    }
}



