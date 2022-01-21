import React from 'react';
import { connect } from 'react-redux';
import { BoardPreview } from '../cmps/board/BoardPreview.jsx';
import { BoardAdd } from '../cmps/board/BoardAdd.jsx';
import { loadBoards, addBoard, removeBoard } from '../store/board.action';
import { FaStar } from 'react-icons/fa';
class _BoardList extends React.Component {
    state = {
        isAdd: false,
        isModal: true,
    };

    componentDidMount() {
        this.props.loadBoards();
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
        console.log(isAdd);
        return (
            <section className='board-list'>
                {isAdd && <BoardAdd toggleIsAdd={this.toggleIsAdd} isModal={isModal} onClose={this.onNew}/>}
                    <h1><FaStar /> Starred Boards</h1>
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
                <button className='create-board-btn board-card' onClick={() => this.toggleIsAdd()}>Create new board</button>
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