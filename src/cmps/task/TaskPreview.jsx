import {connect} from 'react-redux';

import {TaskPreviewContent} from './TaskPreviewContent.jsx'

function _TaskPreview({task}) {
    return (
        <div className="task-wrapper">
            <TaskPreviewContent task={task} />
            {/* <p>{task.title}</p> */}
        </div>
    )
}

function mapStateToProps(state) {
    return {
      
    };
  }
  
  export const TaskPreview = connect(mapStateToProps)(_TaskPreview);