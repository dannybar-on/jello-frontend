import React from 'react';
import { DueDate } from './DueDate.jsx';
import {ImAttachment} from 'react-icons/im';
import { GrTextAlignFull } from 'react-icons/gr';
import { FaRegComment } from 'react-icons/fa';
import { Checklists } from './Checklists.jsx';
import {UserAvatar} from '../../UserAvatar.jsx'
import AvatarGroup from '@mui/material/AvatarGroup';

export class TaskPreviewFooter extends React.Component {

    render() {
        const { board, task } = this.props;
        return (
            <div  className='task-footer flex align-center'>
                {task.dueDate && <DueDate task={task} />}
                
                {task.description && (
                    <div className="badge-preview ">
                        <span className="icon-sm badge-icon"><GrTextAlignFull title='This task has a description.'/></span>
                    </div>
                )}
                
                {task.comments && task.comments.length > 0 && (
                    <div className="badge-preview" title='Comments'>
                        <span className="icon-sm badge-icon"><FaRegComment  /></span>
                        <span>{task.comments.length}</span>
                    </div>
                )}

                {task.attachments && task.attachments.length > 0 && (
                    <div className="badge-preview" title='Attachments'>
                        <span className='icon-sm badge-icon'><ImAttachment /></span>
                        <span>{task.attachments.length}</span>
                    </div>
                )}

                {task.checklists && <Checklists checklists={task.checklists} />}

                {task.members && (
                    <div className="members-footer flex">
                        <AvatarGroup max={3} >
                        {task.members.map((member, idx) => <UserAvatar key={idx} fullname={member.fullname} url={member.imgUrl} />)}
                         </AvatarGroup>
                    </div>
                )}
            </div>
        );
    }
}