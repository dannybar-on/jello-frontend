import React from 'react';
import { connect } from 'react-redux';
import { updateTask } from '../../../store/board.action.js';
import { UserAvatar } from '../../UserAvatar.jsx';
import { taskService } from '../../../services/task.service.js';

class _AddMembers extends React.Component {

    state = {
        members: [],
        filterBy: ''
    };

    componentDidMount() {
        this.setState({ members: this.props.board.members });
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ ...prevState, [name]: value }), () => {
            const members = taskService.getSearchedMember(this.props.board, value);
            this.setState({ members });
        });
    };


    onAddMemberToTask(member) {
        let { board, currTask } = this.props;
        currTask.members.push(member);
        console.log(this.props);
        const currGroup= taskService.getGroupById(currTask.id)
        this.props.updateTask(board, currGroup, currTask);

    }

    render() {
        const { members } = this.state;
        return (
            <div className="members">
                <input type="text" value={this.state.filterBy} name="filterBy" onChange={this.handleChange}></input>
                <div className="board-members-container">
                    {members.map((member, idx) => {
                        return <div key={idx} onClick={() => this.onAddMemberToTask(member)} className='board-member flex align-center'>
                            <span>
                                <UserAvatar fullname={member.fullname} url={member.imgUrl} />
                            </span>
                            <span>{member.fullname}</span>
                            <span> ({member.username})</span>
                        </div>;
                    })}

                </div>
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

export const AddMembers = connect(mapStateToProps, mapDispatchToProps)(_AddMembers);
