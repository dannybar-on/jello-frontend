import React from 'react';
import { connect } from 'react-redux';
import { loadBoards, addBoard, removeBoard } from '../store/board.action';

class _BoardAdd extends React.Component {
    state = {
        board: {
            title: ''
        }
    };

    handleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ board: { ...prevState.board, [name]: value } }));
    };

    onCreateBoard = (board) => {

        this.props.addBoard(board);
    };

    render() {
        const { board } = this.state;
        console.log(this.state);
        return (
            <form onSubmit={() => this.onCreateBoard(board)}>
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
    removeBoard,
};

export const BoardAdd = connect(mapStateToProps, mapDispatchToProps)(_BoardAdd);