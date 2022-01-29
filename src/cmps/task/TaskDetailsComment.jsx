import React from 'react';
import { UserAvatar } from '../UserAvatar';
import { taskService } from '../../services/task.service';

export class TaskDetailsComment extends React.Component {

  

    render() {
        const { comment, onDeleteComment} = this.props;
        const addedAt = taskService.getUploadTime(comment.createdAt);
        return <div className="comments-container flex align-center">
            <UserAvatar fullname={comment.createdBy.fullname} />

            <div>
                <span>{comment.createdBy.fullname} </span>
                <span>{addedAt}</span>
                <div className="comment-background">
                    <p>{comment.txt}</p>
                </div>
                <div>
                    <span onClick={() => onDeleteComment(comment.id)}>Delete</span>
                </div>
            </div>

        </div>;
    }
}