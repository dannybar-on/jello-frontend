import React from 'react';
import { connect } from 'react-redux';
import { taskService } from '../../services/task.service';
import { updateTask } from '../../store/board.action';
class _TaskDetailsChecklist extends React.Component {
    state = {
        todoTitle: '',
    };

    handleCheckbox = (ev, todo) => {
        ev.preventDefault();
        todo.isDone = !todo.isDone;
        console.log(todo);
        const { currTask, board } = this.props;
        const group = taskService.getGroupById(currTask.id);
        this.props.updateTask(board, group, currTask);
    };

    render() {
        const { currTask, checklist } = this.props;
        // console.log(currTask.checklists);

        return (
            <div>
                {checklist.todos.map((todo, idx) => {
                    return <div key={idx}>
                        <input type="checkbox" name={todo.id} checked={todo.isDone} onChange={(event) => this.handleCheckbox(event, todo)} />
                        <span> {todo.title} </span>
                    </div>;
                })}

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

export const TaskDetailsChecklist = connect(mapStateToProps, mapDispatchToProps)(_TaskDetailsChecklist);