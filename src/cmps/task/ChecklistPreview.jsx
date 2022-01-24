import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { taskService } from '../../services/task.service.js';


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
        return <section>
            {(!isEditOpen) ? <h3 onClick={() => this.toggleEditOpen(checklist)}>{checklist.title}</h3>
                :
                <div>
                    <textarea name="checklistTitle" value={checklistTitle}
                        onChange={this.handleChecklistChange} />
                    <button className='btn-style1' onClick={() => this.onEditCheckList(checklist.id)}>Save</button>
                    <button onClick={() => this.toggleEditOpen()}><IoMdClose /></button>
                </div>}
            <button className="btn-style2" onClick={() => this.onDeleteChecklist(checklist.id)}>Delete</button>
        </section>;
    }
}



