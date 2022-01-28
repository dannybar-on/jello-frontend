import React from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { TaskPreviewHeader } from './TaskPreviewHeader.jsx';
import { TaskPreviewFooter } from './TaskPreviewFooter.jsx';
import { taskService } from '../../../services/task.service.js';


export class TaskPreviewContent extends React.Component {

    // state = {
    //     isEditOpen: false,
    // };

    // toggleEditOpen = (ev, task) => {
    //     ev.preventDefault();
    //     ev.stopPropagation();
    //     const { isEditOpen } = this.state;
    //     this.setState({ isEditOpen: !isEditOpen });
    //     this.props.onSetCurrTask(task);
    // };

    getPos = () => {

    };

    render() {
        const { board, task, toggleEditOpen, isTaskLabelListOpen, toggleTaskLabelList } = this.props;
        // const { isEditOpen } = this.state;
        let { position } = this.props;
        const taskLabels = task.labelIds && taskService.getLabelsById(board, task);

        return (
            <>

                {!task.isFull && (task?.style?.bgColor || task?.style?.bgImg) && <TaskPreviewHeader board={board} task={task} toggleEditOpen={toggleEditOpen} isFull={task.isFull} position={position} />}

                <div style={(task?.isFull) ? { backgroundColor: task?.style?.bgColor } : { backgroundColor: 'inherit' }} className="task-preview">
                    {!task.isFull && <ul className={`task-labels clean-list flex ${isTaskLabelListOpen ? 'open' : 'close'}`} onClick={(event) => toggleTaskLabelList(event)}>
                        {board.labels && taskLabels && taskLabels.map((label, idx) => <li className='label-bar' key={idx} style={label.color && { backgroundColor: label.color }}>{label.title && <span>{label.title}</span>}</li>)}
                    </ul>}
                    <p className={`${(task.isFull) ? 'title-full-mod' : ''}`}>{task.title}</p>

                    <button className='edit-btn ' onClick={(event) => { toggleEditOpen(event, task); position = event.target.getBoundingClientRect(); event.stopPropagation(); }}><MdOutlineEdit /></button>

                </div>
                {!task.isFull && <TaskPreviewFooter board={board} task={task} />}

                {/* {isEditOpen && <QuickEditor board={board} position={position} toggleEditOpen={this.toggleEditOpen}
                    currTask={task}
                />} */}
            </>
        );

    }
}

var position;