import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import { taskService } from '../../../services/task.service';
import { updateTask } from '../../../store/board.action';

function _EditAttachment({attachment, updateTask, toggleDynamicModal}) {
    const [title, setTitle] = useState(attachment.title);
    const titleRef = useRef();

    useEffect(() => {
        titleRef?.current?.select()
    }, [])

    const handleSetAttachmentTitle = () => {
        if (!title) return;
        const updatedTask = taskService.handleAttachmentEdit(attachment.id, title)
        updateTask(...updatedTask)
        toggleDynamicModal()
    }

    return (
        <div onClick={handleSetAttachmentTitle} className="edit-attachment">
            <label>Link Name:</label>
            <input ref={titleRef} className="input-style" value={title} onChange={(ev) => setTitle(ev.target.value)} />
            <button className="btn-style1">Update</button>
        </div>
    )
}

const mapStateToProps = ({boardModule}) => {
    return {
        boards: boardModule.boards,
        board: boardModule.currBoard,
        currTask: boardModule.currTask
    }
}

const mapDispatchToProps = {
    updateTask
}

export const EditAttachment = connect(mapStateToProps, mapDispatchToProps)(_EditAttachment)