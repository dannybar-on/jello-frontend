import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'

import { boardService } from '../services/board.service.js';

import { setCurrBoard } from '../store/board.action.js';
import { GroupList } from '../cmps/GroupList.jsx';
import { AddBoardItem } from '../cmps/AddBoardItem.jsx';
import { TaskDetails } from '../pages/TaskDetails.jsx'
import { BoardHeader } from '../cmps/board/BoardHeader.jsx';

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
        // console.log('ssss');
        if (!board) return <>Loading....</>;
        return (
            <div className="board-details-container">
                <BoardHeader board={this.props.board} />
                <GroupList groups={board.groups} board={board}/>
                {isAddOpen ? <AddBoardItem type={'group'} onToggleAdd={this.onToggleAdd} /> :
                    <button onClick={this.onToggleAdd}>Add another list</button>
                }
                <Route
                    component={TaskDetails}
                    path='/board/:boardId/:groupId/:taskId'
                />
            </div>
        );
    }
}

function mapStateToProps({ boardModule }) {
    return {
        // board: boardModule.boards,
        board: boardModule.currBoard,
    };
}

const mapDispatchToProps = {
    setCurrBoard
};

export const BoardDetails = connect(mapStateToProps, mapDispatchToProps)(_BoardDetails);