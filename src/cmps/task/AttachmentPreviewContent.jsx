import React, {useRef, useState} from 'react';
import {taskService} from '../../services/task.service'
import {CgCreditCard} from 'react-icons/cg';
import {connect} from 'react-redux';
import {updateTask} from '../../store/board.action';
import { DynamicModal } from '../DynamicModal';

function _AttachmentPreviewContent({attachment, currTask, board, updateTask}){
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
        return currTask?.style?.bgImg === attachment.null
    }

    const onRemoveAttachment = () => {
        const updatedTask = taskService.handleFileRemove(attachment.id)
        updateTask(...updatedTask)
    }

    return (
        <div className="attachment-preview flex">
            <a href={attachment.url} target="_blank" rel="noreferrer"><div className="image-container">
                <img src={attachment.url} alt={attachment.title} />
            </div></a>

            <div className="right-section flex column">
                <span className="attachment-title">{attachment.title}</span>
                <div className="middle-line">
                    <span className="added-at">{addedAt}</span>-
                    <span>Comment</span>-
                    <span onClick={onRemoveAttachment}>Delete</span>-

                    <div ref={editRef} className="pos-relative">
                        <span onClick={() => setIsEditOpen(!isEditOpen)}>Edit</span>
                        {isEditOpen && <DynamicModal item={'Edit Attachment'} attachment={attachment} toggleDynamicModal={toggleDynamicModal}>
                        </DynamicModal>}
                    </div>

                </div>
                <div className="attachment-cover">
                    <span><CgCreditCard /></span>
                    <span onClick={toggleCover}>{checkIfCover() ? 'Make cover' : 'Remove cover'}</span>
                </div>
            </div>

        </div>
    )
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

export const AttachmentPreviewContent = connect(mapStateToProps, mapDispatchToProps)(_AttachmentPreviewContent);