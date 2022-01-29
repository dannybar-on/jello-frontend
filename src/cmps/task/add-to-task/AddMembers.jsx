import React from 'react';
import { connect } from 'react-redux';
import { updateTask } from '../../../store/board.action.js';
import { UserAvatar } from '../../UserAvatar.jsx';
import { taskService } from '../../../services/task.service.js';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

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
        const currGroup = taskService.getGroupById(currTask.id);
        if (!currTask.members || !currTask.members.length) currTask.members = [];
        const idx = currTask.members.findIndex(user => user._id === member._id);
        if (idx === -1) {
            currTask.members.push(member);
        } else {
            currTask.members = currTask.members.filter(user => user._id !== member._id);
        }
        this.props.updateTask(board, currGroup, currTask);


        // console.log(currTask.members.some(user => user._id === member._id));

    }

    render() {
        const { currTask, user } = this.props;
        const { members } = this.state;
        return (
            <div className="members">
                <input className="input-style" type="text" placeholder="Search members" value={this.state.filterBy} name="filterBy" onChange={this.handleChange}></input>
                <h4 className="modal-content-title">Board members</h4>
                {/* <div className="board-members-container"> */}
                {user && <div onClick={() => this.onAddMemberToTask(user)} className="board-member-container">
                    <div>
                        <span className="member-img">
                            <UserAvatar sx={{ width: 20, height: 20 }} fullname={user.fullname} url={user?.imgUrl} />
                        </span>
                        <span>{user.fullname}</span>
                        <span> ({user.username})</span>
                        {currTask.members && currTask.members.some(member => member._id === user._id) && <span className="includes-icon"><MdDone /></span>}
                    </div>
                </div>}

                {members.map((member, idx) => {
                    return <div key={idx} onClick={() => this.onAddMemberToTask(member)} className="board-member-container">
                        <div>
                            <span className="member-img">
                                <UserAvatar sx={{ width: 20, height: 20 }} fullname={member.fullname} url={member.imgUrl} />
                            </span>
                            <span>{member.fullname}</span>
                            {/* <span> ({member.username})</span> */}
                            {currTask.members && currTask.members.some(user => user._id === member._id) && <span className="includes-icon"><MdDone /></span>}
                        </div>
                    </div>;
                })}

                {/* </div> */}
            </div>
        );
    }
}


const mapStateToProps = ({ boardModule, userModule }) => {
    return {
        user: userModule.user,
        board: boardModule.currBoard,
        currTask: boardModule.currTask,
    };
};

const mapDispatchToProps = {
    updateTask,
};

export const AddMembers = connect(mapStateToProps, mapDispatchToProps)(_AddMembers);
