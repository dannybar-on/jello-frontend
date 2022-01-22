import React from 'react';
import { MdOutlineEdit } from 'react-icons/md';

export class TaskPreviewHeader extends React.Component {




    render() {
        const { task, toggleEditOpen } = this.props;
        // const taskLabels = taskService.getLabelsById(board, task);
        // console.log(taskLabels);
        return (
            <>
                {task.style && <div className='task-cover'
                    style={{ backgroundColor: task.style.bgColor }}>
                    <button className='edit-btn icon-sm' onClick={(event) => toggleEditOpen(event)}><MdOutlineEdit /></button>
                </div>
                }
              
            </>
        );
    }
}