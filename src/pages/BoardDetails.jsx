import React from 'react';
import { connect } from 'react-redux';

import { boardService } from '../services/board.service.js';
import { setCurrBoard } from '../store/board.action.js';
import { GroupList } from '../cmps/GroupList.jsx';
import { AddBoardItem } from '../cmps/AddBoardItem.jsx';

class _BoardDetails extends React.Component {
    state = {
        board: null,
        isAddOpen: false,
    };

    componentDidMount() {
        this.loadBoard();
    }

    loadBoard = () => {
        const boardId = this.props.match.params.boardId;
        boardService.getById(boardId).then((board) => {
            this.setState({ board });
            this.props.setCurrBoard(this.state.board);
        });
    };

    onToggleAdd = () => {
        let { isAddOpen } = this.state;
        this.setState({ isAddOpen: !isAddOpen });
    };



    render() {
        const { board, isAddOpen } = this.state;
        if (!board) return <>Loading....</>;
        return (
            <div className="board-details-container">
                {/* <h1>{board.title}</h1>
                <h1>{board.createdAt}</h1> */}
                <GroupList groups={board.groups} />
                {isAddOpen ? <AddBoardItem /> :
                    <button onClick={this.onToggleAdd}>Add another list</button>
                }
            </div>
        );
    }
}

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.boards,
        currBoard: boardModule.currBoard,
    };
}

const mapDispatchToProps = {
    setCurrBoard
};

export const BoardDetails = connect(mapStateToProps, mapDispatchToProps)(_BoardDetails);