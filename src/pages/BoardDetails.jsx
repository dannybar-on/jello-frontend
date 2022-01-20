import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { boardService } from '../services/board.service.js';
import { setCurrBoard, updateBoard } from '../store/board.action.js';
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

    onDragEnd = (result) => {
        const {destination, source, type} = result;
        if (!destination) return;
        const clonedBoard = { ...this.props.board };
        if (type === 'group') {
            const draggedGroup = clonedBoard.groups.splice(source.index, 1);
            clonedBoard.groups.splice(destination.index, 0, ...draggedGroup);
            this.props.updateBoard(clonedBoard);
            return;
        }
        const sourceGroup = {
            ...clonedBoard.groups.find(group => group.id === source.droppableId)
        };
        clonedBoard.groups = clonedBoard.groups.map(currGroup => {
            if (currGroup.id === source.droppableId) return sourceGroup;
            return currGroup;
        });
        this.props.updateBoard(clonedBoard);
    }

    render() {
        const { board, isAddOpen } = this.state;
        // console.log('ssss');
        if (!board) return <>Loading....</>;
        return (
            <div className="board-details-container">
                <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="group-list-wrapper">
                <Droppable droppableId={board._id} direction='horizontal' type='group'>
                    {(provided, snapshop) => (
                        <div {...provided.droppableProps}
                            ref={provided.innerRef}>
                            
                                <GroupList groups={board.groups} />
                                {provided.placeholder}
                                <div className="group-add-container">
                                {isAddOpen ? <AddBoardItem type={'group'} loadBoard={this.loadBoard} onToggleAdd={this.onToggleAdd} /> :
                                    <button onClick={this.onToggleAdd}>Add another list</button>}
                                </div>
                        </div>
                    )}
                </Droppable>
                </div>
                </DragDropContext>
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
    setCurrBoard,
    updateBoard
};

export const BoardDetails = connect(mapStateToProps, mapDispatchToProps)(_BoardDetails);