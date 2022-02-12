import React from 'react';
import {connect} from 'react-redux';
import {UserAvatar} from './UserAvatar';
import { updateBoard } from '../store/board.action';
import { IoCheckmarkSharp } from 'react-icons/io5'

class _InviteMembers extends React.Component {
    state = {
        search: ''
    }

    getMembersIds = () => {
        const { board } = this.props
        const boardMembersIds = board.members.map(member => member._id)
        return boardMembersIds
    }

    inviteToBoard = (member) => {
        let { board } = this.props;
        if (!board.members || !board.members.length) board.members = [];
        const idx = board.members.findIndex(user => user._id === member._id);
        if (idx === -1) {
            board.members.push(member);
        } else {
            board.members = board.members.filter(user => user._id !== member._id);
        }

        this.props.updateBoard(board)
    }


    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ ...this.state, [field]: value });
    }

    render() {
        const { search } = this.state;
        const { users } = this.props;
        const memberIds = this.getMembersIds();

        return (
            <div className="invite-members">
               <input type="text" className="input-style"  onChange={this.handleChange} name="search" value={search} autoFocus placeholder='Search...'/>
               <ul className="member-list clean-list">
                    {users.filter(user => user.fullname.toLowerCase().includes(search)).map(user =>
                        <li className="user-preview" key={user._id} onClick={() => this.inviteToBoard(user)} >
                            <div className="user-details">
                                <UserAvatar fullname={user.fullname} url={user.imgUrl} />
                                <span className="user-name">{user.fullname}</span>
                            </div>
                            <span>{(memberIds.includes(user._id)) ? <IoCheckmarkSharp /> : ''}</span>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({userModule, boardModule}) {
    return {
        users: userModule.users,
        board: boardModule.currBoard
    }
}
const mapDispatchToProps = {
    updateBoard
}

export const InviteMembers = connect(mapStateToProps, mapDispatchToProps)(_InviteMembers);