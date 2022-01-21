import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; // TEMP
import { Draggable } from 'react-beautiful-dnd';
import { MdOutlineEdit } from 'react-icons/md';
// import { TaskPreviewContent } from './TaskPreviewContent.jsx';

function _TaskPreview({ board, group, task, index, toggleEditOpen }) {
    // if(!board) return <h1>Loading</h1>
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => {
                return (
                    <div className="task-preview-container" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                        <Link to={`${board._id}/${group.id}/${task.id}`} >
                            <div className="task-preview">
                                <p>{task.title}</p>
                                
                                {/* <TaskPreviewContent task={task} toggleEditOpen={toggleEditOpen}/> */}
                            </div>
                        </Link>
                        <button onClick={(event) => toggleEditOpen(event)}><MdOutlineEdit /></button>
                    </div>
                );
            }}
        </Draggable>
    );
}

function mapStateToProps(state) {
    return {

    };
}

export const TaskPreview = connect(mapStateToProps)(_TaskPreview);



