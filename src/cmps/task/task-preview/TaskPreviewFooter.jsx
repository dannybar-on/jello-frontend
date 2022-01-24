import React from 'react';
import { DueDate } from './DueDate.jsx';
import {ImAttachment} from 'react-icons/im';
import { GrTextAlignFull } from 'react-icons/gr';
import { FaRegComment } from 'react-icons/fa';
import { Checklists } from './Checklists.jsx';
import {UserAvatar} from '../../UserAvatar.jsx'

export class TaskPreviewFooter extends React.Component {

    render() {
        const { board, task } = this.props;
        return (
            <div className='task-footer flex align-center'>
                {task.dueDate && <DueDate task={task} />}
                
                {task.description && (
                    <div className='description-footer flex align-center'>
                        <span className="flex align-center"><GrTextAlignFull title='This task has a description.'/></span>
                    </div>
                )}
                
                {task.comments && task.comments.length > 0 && (
                    <div className="comments-footer flex align-center">
                        <span className="flex align center"><FaRegComment /></span>
                        <span>{task.comments.length}</span>
                    </div>
                )}

                {task.attachments && task.attachments.length > 0 && (
                    <div className="attachment-footer flex align-center">
                        <span className='flex align-center'><ImAttachment /></span>
                        <span>{task.attachments.length}</span>
                    </div>
                )}

                {task.checklists && <Checklists checklists={task.checklists} />}

                {task.members && (
                    <div className="members-footer">
                        {task.members.map((member) => {
                            return <UserAvatar fullname={member.fullname} url={member.imgUrl} />
                        })}
                    </div>
                )}
                {/* {task.dueDate && <div><FiClock /> {utilService.handleTimestamp(task.dueDate)}</div>} */}
            </div>
        );
    }
}