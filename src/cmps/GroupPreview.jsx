import React from 'react';
import { TaskPreview } from './task/TaskPreview.jsx';
import { AddBoardItem } from './AddBoardItem.jsx';

import { AiOutlinePlus } from 'react-icons/ai';

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
        this.setState({ isAddOpen: !this.state.isAddOpen })
    }

    render() {
        const { title, isAddOpen } = this.state;
        const { group, board } = this.props;
        return (
            <div className="group-wrapper">
                <div className="group-preview-container flex column">
                    <div className="group-header">
                        <input className="group-title" type="text" value={title} name='title' onChange={this.handleChange} />
                    </div>

                    {/* <div className="card-wrapper"> */}
                    <div className="group-content">
                        {group.tasks && group.tasks.map(task => {
                            return (
                                <TaskPreview key={task.id} board={board} group={group} task={task} />
                            );
                        })}
                    </div>
                    {isAddOpen && <AddBoardItem onToggleAdd={this.onToggleAdd} type={'task'} groupId={group.id} />}
                    {!isAddOpen && (
                        <div className="group-footer">
                            <button className="add-boarditem " onClick={this.onToggleAdd}>
                                <AiOutlinePlus/>
                                <span>Add a task</span>
                            </button>
                        </div>
                    )}
                    </div>
                </div>
            // </div>
        )
    }
}