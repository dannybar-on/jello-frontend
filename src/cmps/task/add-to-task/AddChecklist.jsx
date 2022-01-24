import React from 'react';
import { connect } from 'react-redux';
import { updateTask } from '../../../store/board.action.js';
import { taskService } from '../../../services/task.service';


class _AddChecklist extends React.Component {

    state = {
        title: '',
    };

    handleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ ...prevState, [name]: value }));
    };

    onAddChecklist = (ev) => {
        ev.preventDefault();
        let newChecklist = taskService.getEmptyChecklist();
        if (!this.state.title) return;
        newChecklist.title = this.state.title;
        let { currTask, board } = this.props;
        if (!currTask.checklists) currTask.checklists = [];
        const group = taskService.getGroupById(currTask.id);

        currTask.checklists.push(newChecklist);
        // console.log(...currTask.checklists)
        this.props.updateTask(board, group, currTask);
        this.props.toggleDynamicModal();
    };

    render() {
        let { title } = this.state;
        return (

            <div className="checklist">
                <form onSubmit={(event) => this.onAddChecklist(event, title)}>
                    <label>Title
                        <input className='modal-search' type="text" name="title" value={title} onChange={this.handleChange} />
                    </label>
                    <button className='btn-style1' type="submit">Add</button>
                </form>

            </div>
        );
    }
}


const mapStateToProps = ({ boardModule }) => {
    return {
        board: boardModule.currBoard,
        currTask: boardModule.currTask,
    };
};

const mapDispatchToProps = {
    updateTask,
};

export const AddChecklist = connect(mapStateToProps, mapDispatchToProps)(_AddChecklist);