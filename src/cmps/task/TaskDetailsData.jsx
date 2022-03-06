import React from 'react';
import { connect } from 'react-redux';

import { taskService } from '../../services/task.service.js';
import { utilService } from '../../services/util-service.js';
import { updateTask, updateBoard } from '../../store/board.action.js';

import { UserAvatar } from '../UserAvatar';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import {DynamicModal} from '../DynamicModal'


class _TaskDetailsData extends React.Component {

    toggleCompleteStatus = (ev) => {
        ev.preventDefault();
        const { board, currGroup, currTask } = this.props;

        if (currTask.status === 'complete') {
            if (currTask.dueDate - Date.now() > 0 && currTask.dueDate - Date.now() < 1000 * 60 * 60 * 24) currTask.status = 'due soon';
            if (currTask.dueDate - Date.now() < 0) currTask.status = 'over due';
            if (currTask.dueDate - Date.now() > 1000 * 60 * 60 * 24) currTask.status = '';
        } else {
            currTask.status = 'complete';
        }

        this.props.updateTask(board, currGroup, currTask);
    };


    getClassStyle = (currTask) => {
        //complete
        if (currTask.status === 'complete') return 'green';
        //due soon
        else if (
            currTask.dueDate - Date.now() > 0 &&
            currTask.dueDate - Date.now() < 1000 * 60 * 60 * 24
        )
            return 'yellow';
        //overdue
        else if (currTask.dueDate - Date.now() < 0)
            return 'red';
        //none of the above
        return null;
    };

    render() {
        
        const { board, currTask, isEditOpen, toggleIsEditOpen, isLabelsOpen, toggleIsLabelsOpen, isMembersOpen, toggleIsMembersOpen} = this.props;
        if (currTask.labelIds) { var taskLabels = taskService.getLabelsById(board, currTask); }

        return (
            <div className="task-data ml-40">

                {currTask.members && <span className="task-data-members data-container">
                    <h3 className="data-header">Members</h3>

                    <span className="data-member" >
                        {currTask.members.map((member, idx) => <UserAvatar key={idx} fullname={member.fullname} url={member.imgUrl} />)}
                    </span>

                    <button className="data-add-btn round" onClick={(event) => {toggleIsMembersOpen(); position = event.target.getBoundingClientRect()}}>
                        <AiOutlinePlus />
                    </button>

                    {isMembersOpen && <DynamicModal item={'Members'} {...this.props} toggleDynamicModal={toggleIsMembersOpen} position={position}>
                            </DynamicModal>}
                </span>}


                {(taskLabels && !!taskLabels?.length) && <div className="task-data-labels data-container">
                    <h3 className="data-header">Labels</h3>
                    {taskLabels.map((label, idx) => {
                        return <div key={idx} className="data-label" style={(taskLabels) ? { backgroundColor: `${label.color}` } : { backgroundColor: '' }}>
                            {label.title}
                        </div>;

                    })}
                    <button className="data-add-btn" onClick={(event) => {toggleIsLabelsOpen(); position = event.target.getBoundingClientRect()}}>
                        <AiOutlinePlus />
                    </button>
                    
                    {isLabelsOpen && <DynamicModal item={'Labels'} {...this.props} toggleDynamicModal={toggleIsLabelsOpen} position={position}>
                            </DynamicModal>}
                </div>}

                {currTask.dueDate && <div className="task-data-duedate data-container">
                    <h3 className="data-header">Due date</h3>
                    <div className="data-duedate">
                        <input
                            className="duedate-checkbox"
                            type="checkbox"
                            name="checkbox"
                            checked={(currTask.status === 'complete')}
                            onChange={(event) => this.toggleCompleteStatus(event)}
                        />
                        <div className="duedate-date-container flex" onClick={(event) => {toggleIsEditOpen(); position = event.target.getBoundingClientRect()}}>
                            <span>{utilService.handleTimestamp(currTask.dueDate)} at 12:00 AM </span>
                            {currTask.status && <span className={`${this.getClassStyle(currTask)} duedate-status`} >{currTask.status}</span>}
                            <span className="duedate-arrow"><MdKeyboardArrowDown /></span>
                        </div>
                    </div>
                            {isEditOpen && <DynamicModal item={'Dates'} {...this.props} toggleDynamicModal={toggleIsEditOpen} position={position}>
                            </DynamicModal>}

                </div>}


            </div>

        );
    }
}

var position

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.currBoard,
        currTask: boardModule.currTask
    };
}

const mapDispatchToProps = {
    updateTask,
    updateBoard
};

export const TaskDetailsData = connect(mapStateToProps, mapDispatchToProps)(_TaskDetailsData);
