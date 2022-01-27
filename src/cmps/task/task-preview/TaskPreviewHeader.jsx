import React from 'react';
import { MdOutlineEdit } from 'react-icons/md';

export class TaskPreviewHeader extends React.Component {






    render() {
        const { task, toggleEditOpen, isFull } = this.props;
        let {position} = this.props
        return (
            <>

                {task.style && <div className={`task-cover ${(isFull) ? 'full-mod' : ''}`}
                    style={(task.style.bgImg) ? { backgroundImage: task.style.bgImg, height: '245px' } : { backgroundColor: task.style.bgColor }}>
                    <button className='edit-btn icon-sm' onClick={(event) => { toggleEditOpen(event, task); position = event.target.getBoundingClientRect(); }}><MdOutlineEdit /></button>
                </div>}

            </>

        );
    }
}



