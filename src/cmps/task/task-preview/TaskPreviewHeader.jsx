import React from 'react';
import { MdOutlineEdit } from 'react-icons/md';

export class TaskPreviewHeader extends React.Component {




    render() {
        const { task, toggleEditOpen, isFull } = this.props;
        // const taskLabels = taskService.getLabelsById(board, task);
        // console.log(isFull);
        return (
            <>
                {task.style && <div className={`task-cover ${(isFull) ? 'full-mod' : ''}`}
                    style={(task.style.bgImg) ? { backgroundImage: task.style.bgImg, height: '245px' } : { backgroundColor: task.style.bgColor }}>
                    <button className='edit-btn icon-sm' onClick={(event) => toggleEditOpen(event)}><MdOutlineEdit /></button>
                </div>
                }

            </>
        );
    }
}