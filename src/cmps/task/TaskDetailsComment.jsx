import React from 'react';
import { UserAvatar } from '../UserAvatar';
import { taskService } from '../../services/task.service';

export class TaskDetailsComment extends React.Component {

  

    render() {
        const { comment, onDeleteComment} = this.props;
        const addedAt = taskService.getUploadTime(comment.createdAt);
        return <div>
            <UserAvatar fullname={comment.createdBy.fullname} />

            <div>
                <span>{comment.createdBy.fullname}</span>
                <span>{addedAt}</span>
                <div>
                    <p>{comment.txt}</p>
                </div>
                <div>
                    <span onClick={() => onDeleteComment(comment.id)}>Delete</span>
                </div>
            </div>

        </div>;
    }
}