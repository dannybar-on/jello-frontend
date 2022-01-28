import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
// import { MdOutlineEdit } from 'react-icons/md';
import { TaskPreviewContent } from './TaskPreviewContent.jsx';
import { QuickEditor } from '../../QuickEditor.jsx';

class _TaskPreview extends React.Component {

    state = {
        isEditOpen: false,
    };

    toggleEditOpen = (ev, task) => {

        ev.preventDefault();
        position = ev.target.parentNode.parentNode.parentNode.getBoundingClientRect();
        ev.stopPropagation();
        const { isEditOpen } = this.state;
        this.setState({ isEditOpen: !isEditOpen });
        this.props.onSetCurrTask(task);
    };


    render() {
        const { board, group, task, index, isTaskLabelListOpen, toggleTaskLabelList, onSetCurrTask } = this.props;
        const { isEditOpen } = this.state;
        console.log(position);
        if (!board) return <h1>Loading</h1>;
        return (
            <Draggable draggableId={task.id} index={index}>
                {(provided) => {
                    return (
                        <>
                            <div className="task-preview-container" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                <div onClick={() => this.props.history.push(`${board._id}/${group.id}/${task.id}`)}>
                                    <TaskPreviewContent board={board} task={task} toggleEditOpen={this.toggleEditOpen} isTaskLabelListOpen={isTaskLabelListOpen} toggleTaskLabelList={toggleTaskLabelList} onSetCurrTask={onSetCurrTask} position={position} />
                                </div>
                            </div>
                                {isEditOpen && <QuickEditor board={board} position={position} toggleEditOpen={this.toggleEditOpen}
                                    currTask={task}
                                />}
                           
                        </>
                    );
                }
                }
            </Draggable >
        );

    }
}

var position;

function mapStateToProps(state) {
    return {

    };
}

export const TaskPreview = connect(mapStateToProps)(withRouter(_TaskPreview));



