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
        let { board, currTask, currGroup } = this.props;
        if (!currTask.members) currTask.members = [];
        else if (currTask.members.includes(member)) currTask.members = currTask.members.filter(currUser => currUser._id !== member._id);
        else currTask.members.push(member);
        this.props.updateTask(board, currGroup, currTask);

    }

    render() {
        const { currTask } = this.props;
        const { members } = this.state;
        return (
            <div className="members">
                <input className="modal-search" type="text" placeholder="Search members" value={this.state.filterBy} name="filterBy" onChange={this.handleChange}></input>
                <h4 className="modal-content-title">Board members</h4>
                {/* <div className="board-members-container"> */}
                {members.map((member, idx) => {
                    return <div key={idx} onClick={() => this.onAddMemberToTask(member)} className="board-member-container">
                        <div>
                            <span className="member-img">
                                <UserAvatar sx={{ width: 20, height: 20 }} fullname={member.fullname} url={member.imgUrl} />
                            </span>
                            <span>{member.fullname}</span>
                            <span> ({member.username})</span>
                        </div>
                        {currTask.members && currTask.members.includes(member) && <span><MdDone /></span>}
                    </div>;
                })}

                {/* </div> */}
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
