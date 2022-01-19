import {connect} from 'react-redux';

function _TaskPreview({task}) {
    return (
        <p>{task.title}</p>
    )
}

function mapStateToProps(state) {
    return {
      
    };
  }
  
  export const TaskPreview = connect(mapStateToProps)(_TaskPreview);