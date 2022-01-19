import { connect } from 'react-redux';
import { Link } from 'react-router-dom' // TEMP


import { TaskPreviewContent } from './TaskPreviewContent.jsx'

function _TaskPreview({ board, group, task }) {
    return (
        <div className="task-wrapper">
            <TaskPreviewContent task={task} />
            <Link to={`${board._id}/${group.id}/${task.id}`}>Link</Link>
            {/* <p>{task.title}</p> */}
        </div>
    )
}

function mapStateToProps(state) {
    return {

    };
}

export const TaskPreview = connect(mapStateToProps)(_TaskPreview);



  