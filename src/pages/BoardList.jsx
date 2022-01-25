import React from 'react';
import { connect } from 'react-redux';
import { BoardPreview } from '../cmps/board/BoardPreview.jsx';
import { BoardAdd } from '../cmps/board/BoardAdd.jsx';
import { loadBoards, addBoard, removeBoard, removeCurrBoard } from '../store/board.action';
import { FaStar } from 'react-icons/fa';
class _BoardList extends React.Component {
    state = {
        isAdd: false,
        isModal: true,
    };

    componentDidMount() {
        this.props.loadBoards();
        if (this.props.board) this.props.removeCurrBoard()
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
            <section className='board-list'>
                {isAdd && <BoardAdd toggleIsAdd={this.toggleIsAdd} isModal={isModal} onClose={this.onNew}/>}
                    <h1> <span><FaStar /></span> Starred Boards</h1>
                <div className='starred-container'>
                    {boards.map((board, index) => {

                        return board.isStarred && <div className='board-card' key={board._id} style={(board.style.bgColor) ? { backgroundColor: `${board.style.bgColor}` } : { backgroundImage: `url(${board.style.bgImg})`}}
                        >
                            <button onClick={() => this.onRemoveBoard(board._id)} >X</button>
                            <BoardPreview board={board} index={index}></BoardPreview>
                        </div>;
                    })}
                </div>
                    <h1>Workspace </h1>
                <div className='workspace-container'>
                    {boards.map((board, index) => {
                        return (
                            <div className='board-card' key={board._id} style={(board.style.bgColor) ? { backgroundColor: `${board.style.bgColor}` } : { backgroundImage: `url(${board.style.bgImg})`}} >
                                <button onClick={() => this.onRemoveBoard(board._id)} >X</button>
                                <BoardPreview board={board} index={index}></BoardPreview>
                            </div>
                        );
                    })}
                <button className='board-card' onClick={() => this.toggleIsAdd()}>Create new board</button>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards,
        board: state.boardModule.currBoard
    };
}

const mapDispatchToProps = {
    loadBoards,
    addBoard,
    removeBoard,
    removeCurrBoard
};

export const BoardList = connect(mapStateToProps, mapDispatchToProps)(_BoardList);