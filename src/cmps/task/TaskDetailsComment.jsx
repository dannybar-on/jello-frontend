import React from 'react';
import { UserAvatar } from '../UserAvatar';
import { taskService } from '../../services/task.service';

export class TaskDetailsComment extends React.Component {

    render() {
        const { comment, onDeleteComment } = this.props;
        const addedAt = taskService.getUploadTime(comment.createdAt);
        return <div className="comments-container flex align-center">

                <UserAvatar sx={{ width: 20, height: 20 }} fullname={comment.createdBy.fullname} />

            <div className="comment-box">
                <span className="comment-creator">{comment.createdBy.fullname} </span>
                <span className="comment-time">{addedAt}</span>
                <div className="comment-background">
                    <p className="comment-txt">{comment.txt}</p>
                </div>
                <div>
                    <span className="delete-span" onClick={() => onDeleteComment(comment.id)}>Delete</span>
                </div>
            </div>

        </div>;
    }
}