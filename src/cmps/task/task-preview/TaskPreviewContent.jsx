import React from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { TaskPreviewHeader } from './TaskPreviewHeader.jsx';
import { TaskPreviewFooter } from './TaskPreviewFooter.jsx';
import { taskService } from '../../../services/task.service.js';

export class TaskPreviewContent extends React.Component {

    state = {

    }



    render() {
        const { board, task, toggleEditOpen, isTaskLabelListOpen, toggleTaskLabelList } = this.props;

        const taskLabels = taskService.getLabelsById(board, task);
        
        return (
            <>
                <TaskPreviewHeader board={board} task={task} toggleEditOpen={toggleEditOpen} />

                <div className="task-preview">
                    <ul className={`task-labels clean-list flex ${isTaskLabelListOpen ? 'open' : 'close'}`} onClick={(event) => toggleTaskLabelList(event)}>
                        {taskLabels && taskLabels.map((label, idx) => <li className='label-bar' key={idx} style={{ backgroundColor: label.color }}>{label.title && <span>{label.title}</span>}</li>)}
                    </ul>
                    <p>{task.title}</p>

                    {!task.style && <button className='edit-btn ' onClick={(event) => toggleEditOpen(event)}><MdOutlineEdit /></button>}

                </div>
                <TaskPreviewFooter board={board} task={task} />
            </>
        );

    }
}