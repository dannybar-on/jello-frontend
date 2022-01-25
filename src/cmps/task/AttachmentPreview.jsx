import React from 'react';
import { connect } from 'react-redux';
import {taskService} from '../../services/task.service.js';
import {updateTask} from '../../store/board.action'
import { FiPaperclip } from 'react-icons/fi';
import {AttachmentPreviewContent} from './AttachmentPreviewContent.jsx'

class _AttachmentPreview extends React.Component { 
    state = {
        currTask: {}
    }

    componentDidMount(){
        this.setState({currTask: {...this.props.currTask}})
    }

    render() {
        const {currTask} = this.state;
        return (
            <>
            <div className="attachment-container flex align-center">
                <span><FiPaperclip /></span>
                <h3>Attachments</h3>
            </div>
            <div className="task-attachments">
                {currTask?.attachments?.map((attachment, idx) => <AttachmentPreviewContent key={attachment.title + idx} attachment={attachment} />)}
            </div>
            </>
        )
    }
}

const mapStateToProps = ({boardModule}) => {
    return {
        board: boardModule.currBoard,
        currTask: boardModule.currTask
    }
}

const mapDispatchToProps = {
    updateTask
}

export const AttachmentPreview = connect(mapStateToProps, mapDispatchToProps)(_AttachmentPreview);