import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; // TEMP
import { Draggable } from 'react-beautiful-dnd';
// import { MdOutlineEdit } from 'react-icons/md';
import { TaskPreviewContent } from '../TaskPreviewContent.jsx';


class _TaskPreview extends React.Component {
    render() {
        const { board, group, task, index, toggleEditOpen } = this.props;
        if (!board) return <h1>Loading</h1>;
        return (
            <Draggable draggableId={task.id} index={index}>
                {(provided) => {
                    return (
                        <div className="task-preview-container" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                            <Link to={`${board._id}/${group.id}/${task.id}`} >
                                <TaskPreviewContent board={board} task={task} toggleEditOpen={toggleEditOpen} />
                            </Link>
                        </div>
                    );
                }
                }
            </Draggable >
        );

    }
}

function mapStateToProps(state) {
    return {

    };
}

export const TaskPreview = connect(mapStateToProps)(_TaskPreview);



