import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { boardService } from '../services/board.service.js';
import { setCurrBoard, updateBoard } from '../store/board.action.js';
import { Route } from 'react-router-dom';

import { Loader } from '../cmps/Loader.jsx';
import { GroupList } from '../cmps/GroupList.jsx';
import { AddBoardItem } from '../cmps/AddBoardItem.jsx';
import { TaskDetails } from '../pages/TaskDetails.jsx';
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
            this.setState( { board }, () => {
                this.props.setCurrBoard(this.state.board);
            });
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
        const sourceTask = sourceGroup.tasks.splice(source.index, 1)
        if (source.droppableId === destination.droppableId) {
            sourceGroup.tasks.splice(destination.index, 0, ...sourceTask)
            this.props.updateBoard(clonedBoard)
        } else {
            const destinationGroup = {
                ...clonedBoard.groups.find(group => group.id === destination.droppableId)
            }
            if (destinationGroup.tasks) destinationGroup.tasks.splice(destination.index, 0, ...sourceTask)
            else destinationGroup.tasks = [sourceTask]
            clonedBoard.groups = clonedBoard.groups.map(currGroup => {
                if (currGroup.id === source.droppableId) return sourceGroup;
                if (currGroup.id === destination.droppableId) return destinationGroup
                return currGroup;
            });
            this.props.updateBoard(clonedBoard);
        }
    }

    render() {
        const { isAddOpen } = this.state;
        const {board} = this.props
        if (!board) return <Loader />;
        return (
            <div className="board-details-container">
                <BoardHeader board={this.props.board} />
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="group-list-wrapper">
                        <Droppable droppableId={board._id} direction='horizontal' type='group'>
                            {(provided, snapshot) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    <GroupList groups={board.groups} board={board} />
                                    {provided.placeholder}
                                    <div className="add-group-container">
                                        {!isAddOpen && (
                                            <button onClick={this.onToggleAdd}>
                                                Add another list
                                            </button>
                                        )}
                                        {isAddOpen && (
                                            <AddBoardItem onToggleAdd={this.onToggleAdd} type={'group'} />
                                        )}
                                           <Route
                                           component={TaskDetails}
                                           path='/board/:boardId/:groupId/:taskId'
                                        />
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </div>
                </DragDropContext>
            </div>
        )
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