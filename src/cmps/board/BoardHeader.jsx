import React from 'react';
import { connect } from 'react-redux';
import { updateBoard } from '../../store/board.action.js';
import { UserAvatar } from '../UserAvatar.jsx';
import AvatarGroup from '@mui/material/AvatarGroup';
// import {Loader} from '../Loader.jsx'
import { FiStar } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { RiUserAddLine } from 'react-icons/ri';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
class _BoardHeader extends React.Component {

    state = {
        isClicked: false,
        isStarHover: false,
        isTitleClicked: false,
    };

    toggleIsStarred = () => {
        const { isClicked } = this.state;
        let { board, updateBoard } = this.props;
        this.setState({ isClicked: !isClicked });
        board.isStarred = !isClicked;
        updateBoard(board);
    };

    toggleTitleClicked = () => {
        const { isTitleClicked } = this.state;
        this.setState({ isTitleClicked: !isTitleClicked });
    };

    toggleStarHover = () => {
        const { isStarHover } = this.state;
        this.setState({ isStarHover: !isStarHover });
        console.log(isStarHover);
    };

    render() {
        const { board } = this.props;
        const { isClicked, isStarHover } = this.state;
        let { isTitleClicked } = this.state;
        console.log('Hover', this.state.isStarHover, 'board', board.isStarred);
        if (!board) return <h1>Loading</h1>;
        return <section className='board-header-container flex align-center space-between'>
            <div className='board-header-left flex'>
                {(!isTitleClicked) ?
                    <h1 onClick={this.toggleTitleClicked}>{board.title}</h1>
                    :
                    <input type='text' autoFocus value={board.title} onBlur={() => this.setState({ isTitleClicked: !isTitleClicked })} />
                }
                <button className='star-btn' onMouseEnter={this.toggleStarHover} onMouseLeave={this.toggleStarHover} onClick={this.toggleIsStarred}>
                    {(board.isStarred || isStarHover) ? <FaStar /> : <FiStar />}
                </button>
                {/* <h1>User avatars</h1> */}
                <AvatarGroup max={3}>
                    {board.members.map(member => <UserAvatar fullname={member.fullname} />)}
                </AvatarGroup>
                <button className='invite-btn'><RiUserAddLine /> Invite</button>
            </div>
            <div className='board-header-right' >
                <button className='flex align-center justify-center'><BiDotsHorizontalRounded /> Show menu</button>
            </div>
        </section>;
    }
}

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.currBoard,
    };
}

const mapDispatchToProps = {
    updateBoard,
};

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader);