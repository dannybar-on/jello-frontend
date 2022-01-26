import React, { useRef, useState } from 'react';
import { taskService } from '../../services/task.service'
import { BsCreditCard } from 'react-icons/bs';
import { connect } from 'react-redux';
import { updateTask } from '../../store/board.action';
import { DynamicModal } from '../DynamicModal';
import { MdLowPriority } from 'react-icons/md';

function _AttachmentPreviewContent({ attachment, currTask, board, updateTask }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const editRef = useRef();

    const group = taskService.getGroupById(currTask.id);
    const addedAt = taskService.getUploadTime(attachment.createdAt);

    const toggleCover = () => {
        if (currTask?.style?.bgImg === `url(${attachment.url})`) currTask.style = null;
        else currTask.style = { bgImg: `url(${attachment.url})` };
        updateTask(board, group, currTask)
    }

    const toggleDynamicModal = () => {
        setIsEditOpen(!isEditOpen)
    }

    const checkIfCover = () => {
        // console.log('imhere', (currTask?.style?.bgImg === `url(${attachment.url})`));
        return (currTask?.style?.bgImg === `url(${attachment.url})`)
    }

    const onRemoveAttachment = () => {
        const updatedTask = taskService.handleFileRemove(attachment.id)
        updateTask(...updatedTask)
    }

    return (
        <div className="attachment-preview flex">
            <a className="attachment-img ml-40" href={attachment.url} target="_blank" rel="noreferrer">
                <div >
                    <img src={attachment.url} alt={attachment.title} />
                </div>
            </a>

            <div className="attachment-thumbnail-details">
                <span className="attachment-title">{attachment.title}</span>
                <div className="middle-line">
                    <span className="added-at">{addedAt}</span> - 
                    <span> Comment</span> -
                    <span onClick={onRemoveAttachment}> Delete</span> -

                    <span ref={editRef} className="pos-relative">
                        <span onClick={() => setIsEditOpen(!isEditOpen)}> Edit </span>
                        {isEditOpen && <DynamicModal item={'Edit Attachment'} attachment={attachment} toggleDynamicModal={toggleDynamicModal}>
                        </DynamicModal>}
                    </span>

                </div>
                <div className="attachment-cover">
                    <span className="icon-sm cover-icon"><BsCreditCard /></span>
                    <span className="cover-txt" onClick={toggleCover}>{checkIfCover() ? 'Remove cover' : 'Make cover'}</span>
                </div>
            </div>

        </div>
    )
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

export const AttachmentPreviewContent = connect(mapStateToProps, mapDispatchToProps)(_AttachmentPreviewContent);