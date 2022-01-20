import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; // TEMP
import { Draggable } from 'react-beautiful-dnd';

import { TaskPreviewContent } from './TaskPreviewContent.jsx';

function _TaskPreview({ board, group, task, index }) {
    // if(!board) return <h1>Loading</h1>
    return (
        <div className="task-preview-container">
            <Draggable draggableId={task.id} index={index}>
            {(provided) => {
                return (
                    <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                        <Link to={`${board._id}/${group.id}/${task.id}`} >
                        <TaskPreviewContent task={task} />
                        </Link>
                    </div>
                )
            }}
            </Draggable>
        </div>
    );
}

function mapStateToProps(state) {
    return {

    };
}

export const TaskPreview = connect(mapStateToProps)(_TaskPreview);



