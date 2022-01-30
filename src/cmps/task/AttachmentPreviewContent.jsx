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
            <a className="attachment-img " href={attachment.url} target="_blank" rel="noreferrer">

                <img src={attachment.url} alt={attachment.title} />

            </a>

            <div className="attachment-thumbnail-details flex column">
                <span className="attachment-title">{attachment.title}</span>
                <div className="middle-line">
                    <span className="added-at ">{addedAt}</span> -&ensp;
                    <span className="under-line">Comment</span> -&ensp;
                    <span className="under-line" onClick={onRemoveAttachment}>Delete</span> -&ensp;

                    <span ref={editRef} className="pos-relative">
                        <span className="under-line" onClick={(event) => {setIsEditOpen(!isEditOpen); position = event.target.getBoundingClientRect()}}>Edit</span>
                        {isEditOpen && <DynamicModal item={'Edit Attachment'} attachment={attachment} toggleDynamicModal={toggleDynamicModal} position={position}>
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

var position