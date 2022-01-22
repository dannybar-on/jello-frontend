import React from 'react';
import { DueDate } from './DueDate.jsx';
export class TaskPreviewFooter extends React.Component {

    render() {
        const { board, task } = this.props;
        return (
            <div className='task-footer'>
                {task.dueDate && <DueDate task={task} />}

                {/* {task.dueDate && <div><FiClock /> {utilService.handleTimestamp(task.dueDate)}</div>} */}
            </div>
        );
    }
}