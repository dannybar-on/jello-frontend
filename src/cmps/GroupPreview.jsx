import React from 'react';
import { TaskPreview } from './task/TaskPreview.jsx';

export class GroupPreview extends React.Component {
    state = {
        title: ''
    };

    componentDidMount() {
        this.setState({ ...this.state, title: this.props.group.title });
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ ...prevState, [name]: value }));
    };

    render() {
        const { title } = this.state;
        console.log(title);
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
            </div>
        );
    }
}