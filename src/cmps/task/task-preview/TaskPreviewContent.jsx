import React from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { TaskPreviewHeader } from './TaskPreviewHeader.jsx';
import { TaskPreviewFooter } from './TaskPreviewFooter.jsx';
import { taskService } from '../../../services/task.service.js';

export class TaskPreviewContent extends React.Component {

    state = {
        // isEditOpen: false,
    };



    render() {
        const { board, task, toggleEditOpen } = this.props;
        // const { isEditOpen } = this.state;
        // console.log(isEditOpen);
        const taskLabels = taskService.getLabelsById(board, task);
        // console.log('taskLabels:', taskLabels); // NEED TO RENDER LABELS FROM BOARD LIKE IN TaskDetailsData
        
        return (
            <>
                <TaskPreviewHeader board={board} task={task} toggleEditOpen={toggleEditOpen} />

                <div className="task-preview">
                    {/* <ul className="tas"> </ul> */}
                    {/* <ul className='task-labels clean-list flex ' >
                        {(taskLabels) && taskLabels.map((label, idx) => <li key={idx} style={{ backgroundColor: label.color }}></li>)}
                    </ul> */}
                    <p>{task.title}</p>

                    {!task.style && <button className='edit-btn ' onClick={(event) => toggleEditOpen(event)}><MdOutlineEdit /></button>}

                </div>
                <TaskPreviewFooter board={board} task={task} />
            </>
        );

    }
}