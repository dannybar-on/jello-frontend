import React from 'react';
import { connect } from 'react-redux';
// import { boardService } from '../../services/board.service'
import { loadBoards, addBoard, removeBoard } from '../../store/board.action';

class _BoardAdd extends React.Component {
    state = {
        board: {
            title: ''
        }
    };
    // componentDidMount

    handleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ board: { ...prevState.board, [name]: value } }));
    };

    onCreateBoard = (ev, board) => {
        ev.preventDefault();
        // let board = boardService.getEmptyBoard();
        this.props.addBoard(board);
    };

    render() {
        const { board } = this.state;
        console.log(this.state);
        return (
            <form onSubmit={(event) => this.onCreateBoard(event, board)}>
                <textarea type="text" name="title" value={this.state.board.title} onChange={this.handleChange} />
                <button type="submit">Create board</button>
            </form>
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
};

export const BoardAdd = connect(mapStateToProps, mapDispatchToProps)(_BoardAdd);