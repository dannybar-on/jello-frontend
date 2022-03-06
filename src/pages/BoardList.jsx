import React from 'react';
import { connect } from 'react-redux';

import { userService } from '../services/user-service.js';
import { BoardPreview } from '../cmps/board/BoardPreview.jsx';
import { BoardAdd } from '../cmps/board/BoardAdd.jsx';
import { loadBoards, addBoard, removeBoard, removeCurrBoard } from '../store/board.action';
import { login } from '../store/user.action.js';

import { FaStar } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

class _BoardList extends React.Component {
    state = {
        isAdd: false,
        isModal: true,
    };

    componentDidMount() {
        const { loadBoards, board, removeCurrBoard, login, user } = this.props
        loadBoards();
        if (board) removeCurrBoard()
        if (!user) {
            const guest = userService.getGuestUser()
            login(guest)
        }
    }

    onNew = () => {
        this.setState({ isModal: !this.state.isModal });
    };

    toggleIsAdd = () => {
        let { isAdd } = this.state;
        this.setState({ isAdd: !isAdd });

    };

    onRemoveBoard = (boardId) => {
        this.props.removeBoard(boardId);
    };

    render() {
        const { boards } = this.props;
        const { isAdd, isModal } = this.state;
        return (
            <div className="scroll-y">
                <section className='board-list flex column'>
                    {isAdd && <BoardAdd toggleIsAdd={this.toggleIsAdd} isModal={isModal} onClose={this.onNew} />}
                    <div className='starred-container'>
                        <div className="board-list-title flex-row-center">
                            <span className="board-list-icon"><FaStar /></span>
                            <h1>Starred Boards</h1>
                        </div>
                        <div className="board-cards-container">
                            {boards.map((board, index) => {

                                return board.isStarred && <div className='board-card' key={board._id} style={(board.style.bgColor) ? { backgroundColor: `${board.style.bgColor}` } : { backgroundImage: `url(${board.style.bgImg})` }}
                                >
                                    {/* <button onClick={() => this.onRemoveBoard(board._id)} >X</button> */}
                                    <BoardPreview board={board} index={index}></BoardPreview>
                                </div>;
                            })}
                        </div>
                    </div>
                    <div className='workspace-container'>
                        <div className="board-list-title flex-row-center">
                            <span className="board-list-icon"><MdDashboard /></span>
                            <h1>Workspace</h1>
                        </div>

                        <div className="board-cards-container">
                            {boards.map((board, index) => {
                                return (
                                    <div className='board-card' key={board._id} style={(board.style.bgColor) ? { backgroundColor: `${board.style.bgColor}` } : { backgroundImage: `url(${board.style.bgImg})` }} >
                                        {/* <button onClick={() => this.onRemoveBoard(board._id)} >X</button> */}
                                        <BoardPreview board={board} index={index}></BoardPreview>
                                    </div>
                                );
                            })}
                            <button className='board-card create-board-btn' onClick={() => this.toggleIsAdd()}>Create new board</button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards,
        board: state.boardModule.currBoard,
        user: state.userModule.user

    };
}

const mapDispatchToProps = {
    loadBoards,
    addBoard,
    removeBoard,
    removeCurrBoard,
    login,

};

export const BoardList = connect(mapStateToProps, mapDispatchToProps)(_BoardList);