import React from 'react';
import { taskService } from '../../services/task.service';

import { IoMdClose } from 'react-icons/io';

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
        if (!newTitle) return;
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
        return <div className="items-container">
            {/* <div  className="items-container"> */}

            {(!isEditOpen) ? <div className="checklist-preview">
                <input className="checklist-checkbox" type="checkbox" name={todo.id} checked={todo.isDone} onChange={(event) => handleCheckbox(event, todo)} />
                <div className="checklist-preview-controls">
                    <span className={`item-title-preview ${(todo.isDone) ? 'line-through' : ''}`} onClick={() => this.toggleEditTodo(todo)}> {todo.title} </span>
                    <button className="delete-item" onClick={() => onRemoveTodo(todo.id)}>Delete</button>
                </div>
            </div>
                : <div className="checklist-preview-edit">
                    <input className="checklist-checkbox" type="checkbox" name={todo.id} checked={todo.isDone} onChange={(event) => handleCheckbox(event, todo)} />
                    {/* <div className="checklist-edit"> */}
                    <textarea className='checklist-edit-textarea' id={todo.id}
                        type="text"
                        name="todoTitle"
                        value={todoTitle}
                        onChange={this.handleChange}
                    />
                    {/* </div> */}
                    <div className="form-btns flex">
                        <button className='btn-style1' type='submit' onClick={(event) => this.onEditTodo(event, todo.id, todoTitle)}>Save</button>
                        <button className="close-add" onClick={() => this.toggleEditTodo()}><IoMdClose /></button>
                    </div>
                </div>}
            {/* <button className="delete-item" onClick={() => onRemoveTodo(todo.id)}>Delete</button> */}
        </div>;
    }
}