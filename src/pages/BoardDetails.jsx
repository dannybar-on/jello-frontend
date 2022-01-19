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

    // componentDidUpdate(prevProps) {
    //     if (prevProps.board !== this.state.board) {
    //         this.loadBoard();
    //     }
    // }

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
                <GroupList groups={board.groups} />
                {isAddOpen ? <AddBoardItem type={'group'} loadBoard={this.loadBoard} onToggleAdd={this.onToggleAdd} /> :
                    <button onClick={this.onToggleAdd}>Add another list</button>
                }
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