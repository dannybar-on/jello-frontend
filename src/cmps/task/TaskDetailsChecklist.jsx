import React from 'react';
import { connect } from 'react-redux';
import { taskService } from '../../services/task.service';
import { updateTask } from '../../store/board.action';
class _TaskDetailsChecklist extends React.Component {
    state = {
        isAddOpen: false,
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

    toggleAddTodo = () => {
        const { isAddOpen } = this.state;
        this.setState({ isAddOpen: !isAddOpen });
    };

    handleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ ...prevState, [name]: value }));
    };

    onAddTodo = (ev, title, checklist) => {
        ev.preventDefault();
        let newTodo = taskService.getEmptyTodo();
        newTodo.title = title;
        checklist.todos.push(newTodo);
        // console.log(checklist);
        const { currTask, board } = this.props;
        const group = taskService.getGroupById(currTask.id);
        this.props.updateTask(board, group, currTask);
    };

    render() {
        const { checklist } = this.props;
        const { todoTitle, isAddOpen } = this.state;
        console.log(todoTitle);

        return (
            <div>
                {checklist.todos.map((todo, idx) => {
                    return <div key={idx}>
                        <input type="checkbox" name={todo.id} checked={todo.isDone} onChange={(event) => this.handleCheckbox(event, todo)} />
                        <span> {todo.title} </span>
                    </div>
                })}
                {(isAddOpen) ? <form onSubmit={(event) => this.onAddTodo(event, todoTitle, checklist)}>
                    <input className='search-modal' type="text" name="todoTitle" value={todoTitle} onChange={this.handleChange} />
                    <button className='btn-style1' type="submit">Add</button>
                    <button onClick={() => this.toggleAddTodo()}>X</button>

                </form>
                    :
                    <button onClick={() => this.toggleAddTodo()}>Add an item</button>
                }
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