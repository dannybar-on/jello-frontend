import React from 'react';
import { connect } from 'react-redux';
import { BoardPreview } from '../cmps/board/BoardPreview.jsx';
import { BoardAdd } from '../cmps/board/BoardAdd.jsx';
import { loadBoards, addBoard, removeBoard } from '../store/board.action';
import { FaStar } from 'react-icons/fa';
class _BoardList extends React.Component {
    state = {
        isAdd: false,
    };

    componentDidMount() {
        this.props.loadBoards();
    }



    toggleNewBoardForm = () => {
        let { isAdd } = this.state;
        this.setState({ isAdd: !isAdd });

    };

    onRemoveBoard = (boardId) => {
        this.props.removeBoard(boardId);
    };

    render() {
        const { boards } = this.props;
        const { isAdd } = this.state;
        return (
            <section className='board-list'>
                {isAdd && <BoardAdd />}
                    <h1><FaStar /> Starred Boards</h1>
                <div className='starred-container'>
                    {boards.map(board => {

                        return board.isStarred && <div className='board-card'  key={board._id}>
                            <button onClick={() => this.onRemoveBoard(board._id)} >X</button>
                            <BoardPreview board={board}></BoardPreview>
                        </div>;
                    })}
                </div>
                    <h1>Workspace </h1>
                <div className='workspace-container'>
                    {boards.map(board => {
                        return (
                            <div className='board-card' key={board._id}>
                                <button onClick={() => this.onRemoveBoard(board._id)} >X</button>
                                <BoardPreview board={board}></BoardPreview>
                            </div>
                        );
                    })}
                <button className='create-board-btn board-card' onClick={() => this.toggleNewBoardForm()}>Create new board</button>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards
    };
}

const mapDispatchToProps = {
    loadBoards,
    addBoard,
    removeBoard,

};

export const BoardList = connect(mapStateToProps, mapDispatchToProps)(_BoardList);