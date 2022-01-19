import React from 'react';
import { TaskPreview } from './task/TaskPreview.jsx';
import { AddBoardItem } from './AddBoardItem.jsx';

export class GroupPreview extends React.Component {
    state = {
        title: '',
        isAddOpen: false,
    };

    componentDidMount() {
        this.setState({ ...this.state, title: this.props.group.title });
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ ...prevState, [name]: value }));
    };

    onToggleAdd = () => {
        this.setState({isAddOpen: !this.state.isAddOpen})
    }

    render() {
        const { title, isAddOpen } = this.state;
        const { group } = this.props;
        return (
            <div className="group-preview-container">
                <div className="group-header">
                    <input type="text" value={title} name='title' onChange={this.handleChange} />
                </div>
                {group.tasks && group.tasks.map(task => {
                    return (
                        <TaskPreview key={task.id} task={task} />
                    );
                })}
            {isAddOpen && <AddBoardItem onToggleAdd={this.onToggleAdd} type={'task'} groupId={group.id}/>}
            {!isAddOpen && (
                <div className="group-footer">
                    <button className="add-board-task-btn" onClick={this.onToggleAdd}>
                        <span>Add a task</span>
                    </button>
                </div>
            )}    
            </div>
        );
    }
}