import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; // TEMP


import { TaskPreviewContent } from './TaskPreviewContent.jsx';

function _TaskPreview({ board, group, task }) {
    // if(!board) return <h1>Loading</h1>
    return (
        <div className="task-preview-container">
            <Link to={`${board._id}/${group.id}/${task.id}`} >
            <TaskPreviewContent task={task} />
            </Link>
        </div>
    );
}

function mapStateToProps(state) {
    return {

    };
}

export const TaskPreview = connect(mapStateToProps)(_TaskPreview);



