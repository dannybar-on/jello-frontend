import React from 'react'
import { connect } from 'react-redux';
import { taskService } from '../../../services/task.service.js'
import { updateTask } from '../../../store/board.action';
import { FiPaperclip } from 'react-icons/fi';

function _AddAttachment({}) {
    return <h1>Attachment</h1>
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

export const AddAttachment = connect(mapStateToProps, mapDispatchToProps)(_AddAttachment);