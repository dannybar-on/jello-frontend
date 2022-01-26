import React from 'react';
import { connect } from 'react-redux';
import { utilService } from '../../../services/util-service.js';
import { taskService } from '../../../services/task.service.js';
import { FiClock } from 'react-icons/fi';
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox, MdTaskAlt } from 'react-icons/md';
import { updateTask } from '../../../store/board.action.js';

class _DueDate extends React.Component {

    state = {
        isHover: false,
        isClicked: false,
    };

    // componentDidMount() {
    //     // this.onGetClassName();
    // }

    toggleHover = () => {
        const { isHover } = this.state;
        this.setState({ isHover: !isHover });
    };

  

    toggleCompleteStatus = (ev) => {
        ev.preventDefault();
        const { board, task } = this.props;
        const group = taskService.getGroupById(task.id)
        const { isClicked } = this.state;
        if (task.status === 'complete') {
            if (task.dueDate - Date.now() > 0 && task.dueDate - Date.now() < 1000 * 60 * 60 * 24) task.status = 'due soon';
            if (task.dueDate - Date.now() < 0) task.status = 'over due';
            if (task.dueDate - Date.now() > 1000 * 60 * 60 * 24) task.status = '';
        } else {
            task.status = 'complete';
        }
        this.props.updateTask(board, group, task);
        this.setState({ isClicked: !isClicked });
    };


    getClassStyle = (task) => {
        //complete
        if (task.status === 'complete') return 'green';
        //due soon
        else if (
            task.dueDate - Date.now() > 0 &&
            task.dueDate - Date.now() < 1000 * 60 * 60 * 24
        )
            return 'yellow';
        //overdue
        else if (task.dueDate - Date.now() < 0)
            return 'red';
        //none of the above
        return null;
    };

    render() {
        const { task } = this.props;
        const { isHover, isClicked } = this.state;
        // if (!className) return <h1>Loading....</h1>;
        // console.log(task ,'in Due Date');
        return <div onMouseLeave={this.toggleHover}>
            {(isHover) ?
                <div onClick={(event) => this.toggleCompleteStatus(event)}
                    className={this.getClassStyle(task) + ' badge-preview flex'} >
                    <span className='icon-sm badge-icon'>
                        {(task.status === 'complete') ? <MdOutlineCheckBox /> : <MdCheckBoxOutlineBlank />}
                    </span>
                    <span>
                        {utilService.handleTimestamp(task.dueDate)}
                    </span>
                </div>
                :
                <div onClick={(event) => this.toggleCompleteStatus(event)}
                    className={this.getClassStyle(task) + '  badge-preview flex-row-center'}>

                    <span className='icon-sm badge-icon' onMouseEnter={this.toggleHover} >
                        <FiClock />
                    </span>
                    <span>{utilService.handleTimestamp(task.dueDate)}
                    </span>
                </div>

            }
        </div>
    }
}

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.currBoard,
        currTask: boardModule.currTask
    };
}

const mapDispatchToProps = {
    updateTask,
};

export const DueDate = connect(mapStateToProps, mapDispatchToProps)(_DueDate);