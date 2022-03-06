import React from 'react';
import { connect } from 'react-redux';

import { taskService } from '../../services/task.service';
import { updateTask } from '../../store/board.action';
import { ProgressBar } from './ProgressBar.jsx';
import { TodoPreview } from './TodoPreview.jsx';

import { IoMdClose } from 'react-icons/io';

class _TaskDetailsChecklist extends React.Component {
    state = {
        percentage: 0,
        isAddOpen: false,
        todoTitle: '',
    };

    componentDidMount() {
        this.setTodoPctg();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.board !== this.props.board) {
            this.setTodoPctg();
        }
    }

    handleCheckbox = (ev, todo) => {
        ev.preventDefault();
        todo.isDone = !todo.isDone;
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

    setTodoPctg = (todos = this.props.checklist.todos) => {
        const doneTodos = todos.filter(todo => todo.isDone);
        let percentage;
        if (todos.length) percentage = (doneTodos.length / todos.length) * 100;
        else percentage = 0;
        this.setState({ percentage });
    };

    onAddTodo = (ev, title, checklist) => {
        ev.preventDefault();
        if (!title) return;
        let newTodo = taskService.getEmptyTodo();
        newTodo.title = title;
        checklist.todos.push(newTodo);
        const { currTask, board } = this.props;
        const group = taskService.getGroupById(currTask.id);
        this.props.updateTask(board, group, currTask);
        this.setState({ todoTitle: '' });
    };


    onRemoveTodo = (todoId) => {
        let { checklist } = this.props;
        const updatedTodos = checklist.todos.filter(todo => todo.id !== todoId);
        checklist.todos = updatedTodos;
        const { currTask, board } = this.props;
        const group = taskService.getGroupById(currTask.id);
        this.props.updateTask(board, group, currTask);
    };


    render() {
        const { checklist, board, currTask, updateTask } = this.props;
        const { todoTitle, isAddOpen, percentage, } = this.state;
        return (
            <div>
                <ProgressBar percentage={percentage} />
                {checklist.todos.map((todo, idx) => {
                    return <TodoPreview key={todo.id}
                        todo={todo} handleCheckbox={this.handleCheckbox}
                        updateTask={updateTask}
                        currTask={currTask} board={board}
                        onRemoveTodo={this.onRemoveTodo} />;
                })}
                
                {(isAddOpen) ? <form className="ml-40" onSubmit={(event) => this.onAddTodo(event, todoTitle, checklist)}>
                    <textarea className='checklist-textarea' type="text" name="todoTitle" value={todoTitle} onChange={this.handleChange} />
                    <div className="form-btns mt-8 flex">
                        <button className='btn-style1' type="submit">Add</button>
                        <button className="close-add" onClick={() => this.toggleAddTodo()}><IoMdClose /></button>
                    </div>
                </form>
                    :
                    <button className='btn-style2 ml-40 mt-8' onClick={() => this.toggleAddTodo()}>Add an item</button>
                }
            </div>
        )
    }
}

const mapStateToProps = ({ boardModule }) => {
    return {
        board: boardModule.currBoard,
        currTask: boardModule.currTask,
    }
}

const mapDispatchToProps = {
    updateTask,
}

export const TaskDetailsChecklist = connect(mapStateToProps, mapDispatchToProps)(_TaskDetailsChecklist);;