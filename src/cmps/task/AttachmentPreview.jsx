import React from 'react';
import { connect } from 'react-redux';

import { updateTask } from '../../store/board.action'

import { FiPaperclip } from 'react-icons/fi';
import { AttachmentPreviewContent } from './AttachmentPreviewContent.jsx'

class _AttachmentPreview extends React.Component {

    render() {
        const { currTask } = this.props;
        return (
            <>
                <div className="task-attachment">
                    <div className="details-section-header ">
                        <span className="icon-lg header-icon"><FiPaperclip /></span>
                        <h3>Attachments</h3>
                    </div>
                    <div className="ml-40">
                        {currTask?.attachments?.map((attachment, idx) => <AttachmentPreviewContent key={attachment.title + idx} attachment={attachment} />)}
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = ({ boardModule }) => {
    return {
        board: boardModule.currBoard,
        currTask: boardModule.currTask
    }
}

const mapDispatchToProps = {
    updateTask
}

export const AttachmentPreview = connect(mapStateToProps, mapDispatchToProps)(_AttachmentPreview);