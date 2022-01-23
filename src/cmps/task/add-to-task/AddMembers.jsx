import React from 'react';
import { UserAvatar } from '../../UserAvatar.jsx';
import { taskService } from '../../../services/task.service.js';

export class AddMembers extends React.Component {

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


 
    render() {
        const { members } = this.state;
        return (
            <div className="members">
                <input type="text" value={this.state.filterBy} name="filterBy" onChange={this.handleChange}></input>
                <div className="board-members-container">
                    {members.map((member, idx) => {
                        return <div key={idx} className='board-member flex align-center'>
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


