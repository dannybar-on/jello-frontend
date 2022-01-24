import React from 'react';
import { taskService } from '../../services/task.service';
export class TodoPreview extends React.Component {

    state = {
        todoTitle: '',
        isEditOpen: false,
    };

    toggleEditTodo = (todo = null) => {
        const { isEditOpen } = this.state;
        this.setState({ isEditOpen: !isEditOpen });
        if (todo) this.setState({ todoTitle: todo.title });
    };
    handleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ ...prevState, [name]: value }));
    };

    onEditTodo = (ev, todoId, newTitle) => {
        ev.preventDefault();
        let { currTask, board } = this.props;
        const group = taskService.getGroupById(currTask.id);
        const todoToUpdate = currTask.checklists.find(currChecklist => {
            return currChecklist.todos.find(todo => {
                if (todo.id === todoId) return todo.title = newTitle;
            });
        });
        this.props.updateTask(board, group, currTask);
        this.toggleEditTodo();
    };


    render() {
        const { isEditOpen, todoTitle } = this.state;
        const { todo, handleCheckbox, onRemoveTodo } = this.props;
        return <div >
            <input type="checkbox" name={todo.id} checked={todo.isDone} onChange={(event) => handleCheckbox(event, todo)} />
            {(!isEditOpen) ? <span onClick={() => this.toggleEditTodo(todo)}> {todo.title} </span>
                : <form onSubmit={(event) => this.onEditTodo(event, todo.id, todoTitle)}>
                    <textarea className='search-modal' id={todo.id}
                        type="text"
                        name="todoTitle" value={todoTitle}
                        onChange={this.handleChange}
                    />
                    <button className='btn-style1' type='submit'>Save</button>
                    <button onClick={() => this.toggleEditTodo()}>X</button>
                </form>}
            <button onClick={() => onRemoveTodo(todo.id)}>Delete</button>
        </div>;
    }
}