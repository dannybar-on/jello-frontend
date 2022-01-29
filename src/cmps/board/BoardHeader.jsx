import React from 'react';
import { connect } from 'react-redux';
import { updateBoard, setCurrBoard } from '../../store/board.action.js';
import { UserAvatar } from '../UserAvatar.jsx';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Loader } from '../Loader.jsx'
import { FiStar } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { RiUserAddLine } from 'react-icons/ri';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { SideMenu } from '../SideMenu.jsx'
import { DynamicModal } from '../DynamicModal'
import { loadUsers } from '../../store/user.action'
import { Link } from 'react-router-dom'

class _BoardHeader extends React.Component {

    state = {
        isClicked: false,
        isStarHover: false,
        boardTitle: '',
        isMenuOpen: false,
        isInviteOpen: false,
    };

    componentDidMount() {
        const { board } = this.props;
        this.setState({ boardTitle: board.title })
        this.props.loadUsers()
    }

    componentDidUpdate(prevProps) {
        const { board } = this.props
        if (prevProps.board.title !== this.props.board.title) {
            this.setState({ boardTitle: board.title })
        }
    }


    toggleMenu = () => {
        this.setState((prevState) => ({ ...prevState, isMenuOpen: !this.state.isMenuOpen }))
    }

    toggleIsStarred = () => {
        const { isClicked } = this.state;
        let { board, updateBoard } = this.props;
        this.setState({ isClicked: !isClicked });
        board.isStarred = !isClicked;
        updateBoard(board);
    };

    handleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ ...prevState, [name]: value }));
    }

    onChangeBoardTitle = () => {
        const { board, updateBoard } = this.props;
        const { boardTitle } = this.state
        // board.title = this.state.boardTitle;
        const boardToUpdate = {
            ...board,
            title: boardTitle
        }

        updateBoard(boardToUpdate);
    }

    toggleStarHover = () => {
        const { isStarHover } = this.state;
        this.setState({ isStarHover: !isStarHover });
    };

    toggleIsInviteOpen = () => {
        const { isInviteOpen } = this.state;
        this.setState({ isInviteOpen: !isInviteOpen })
    }

    render() {
        const { board } = this.props;
        const { isClicked, isStarHover, boardTitle, isMenuOpen,isInviteOpen } = this.state;

        if (!board) return <Loader />;
        return <section className='board-header-container flex align-center space-between'>
            <div className='board-header-left flex'>
                <input className="board-header-title" type='text' name='boardTitle' value={boardTitle} onChange={this.handleChange} onBlur={this.onChangeBoardTitle} />
                <button className='star-btn' onMouseEnter={this.toggleStarHover} onMouseLeave={this.toggleStarHover} onClick={this.toggleIsStarred}>
                    {(board.isStarred || isStarHover) ? <FaStar /> : <FiStar />}
                </button>
                {/* <h1>User avatars</h1> */}
                <AvatarGroup max={4} >
                    {board.members.map((member, idx) => <UserAvatar key={idx} fullname={member.fullname} url={member.imgUrl} />)}
                </AvatarGroup>
                <button className='invite-btn' onClick={(event) => { this.toggleIsInviteOpen(); position = event.target.getBoundingClientRect() }}><RiUserAddLine /> Invite</button>
                {isInviteOpen && <DynamicModal item={'Invite Members'} {...this.props} toggleDynamicModal={this.toggleIsInviteOpen} position={position}>
                </DynamicModal>}
            </div>
            <div className='board-header-right flex row' >
                <Link to={`/board/${board._id}/dashboard`} className='clean-link'>
                <button className='dashboard-btn flex align-center justify-center'> Dashboard</button>
                </Link>
                <button className='show-more-btn flex align-center justify-center' onClick={() => this.toggleMenu()}><BiDotsHorizontalRounded /> Show menu</button>
            </div>
            <SideMenu isMenuOpen={isMenuOpen} toggleMenu={this.toggleMenu} />
        </section>;
    }
}

function mapStateToProps({ boardModule, userModule }) {
    return {
        board: boardModule.currBoard,
        users: userModule.users
    };
}

const mapDispatchToProps = {
    updateBoard,
    setCurrBoard,
    loadUsers
};

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader);

var position