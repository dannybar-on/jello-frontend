import React from 'react';
import {connect} from 'react-redux'
import { TaskPreviewHeader } from './task/task-preview/TaskPreviewHeader';
import { taskService } from '../services/task.service.js';

class _QuickEditor extends React.Component {

    render() {
        const { board, currTask, toggleEditOpen, toggleTaskLabelList, isTaskLabelListOpen } = this.props;
        const taskLabels = taskService.getLabelsById(board, currTask);
        // console.log(task);
        return <section className='quick-edit-container'>
            <h1>EDITORRRRR</h1>
            {currTask.style && <TaskPreviewHeader board={board} task={currTask} toggleEditOpen={toggleEditOpen} />}
            <ul className={`task-labels clean-list flex ${isTaskLabelListOpen ? 'open' : 'close'}`} onClick={(event) => toggleTaskLabelList(event)}>
                {board.labels && taskLabels && taskLabels.map((label, idx) => <li className='label-bar' key={idx} style={label.color && { backgroundColor: label.color }}>{label.title && <span>{label.title}</span>}</li>)}
            </ul>
            <p>{currTask.title}</p>
        </section >;
    }
}

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.currBoard,
        currTask: boardModule.currTask
    };
}

const mapDispatchToProps = {
    // setCurrBoard,
    // updateBoard,
    // unMountBoard,
    // updateGroup,
    // onSetCurrTask,
};

export const QuickEditor = connect(mapStateToProps, mapDispatchToProps)(_QuickEditor);
