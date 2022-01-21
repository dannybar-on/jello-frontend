import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { boardService } from '../services/board.service.js';
import { setCurrBoard, updateBoard, unMountBoard } from '../store/board.action.js';
import { Route } from 'react-router-dom';

import { Loader } from '../cmps/Loader.jsx';
import { GroupList } from '../cmps/GroupList.jsx';
import { AddBoardItem } from '../cmps/AddBoardItem.jsx';
import { TaskDetails } from '../pages/TaskDetails.jsx';
import { BoardHeader } from '../cmps/board/BoardHeader.jsx';
import { AiOutlinePlus } from 'react-icons/ai';

class _BoardDetails extends React.Component {
    state = {
        board: null,
        isAddOpen: false,
        isEditOpen: false,
    };

    componentDidMount() {
        this.loadBoard();

    }

    loadBoard = () => {
        const boardId = this.props.match.params.boardId;
        boardService.getById(boardId).then((board) => {
            this.setState({ board }, () => {
                this.props.setCurrBoard(this.state.board);
            });
        });
    };

    onToggleAdd = () => {
        let { isAddOpen } = this.state;
        this.setState({ isAddOpen: !isAddOpen });
    };


    toggleEditOpen = (ev) => {
        ev.preventDefault();

        let { isEditOpen } = this.state;
        this.setState({ isEditOpen: !isEditOpen });
    };

    onDragEnd = (result) => {
        const { destination, source, type } = result;
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
        const sourceTask = sourceGroup.tasks.splice(source.index, 1);
        if (source.droppableId === destination.droppableId) {
            sourceGroup.tasks.splice(destination.index, 0, ...sourceTask);
            this.props.updateBoard(clonedBoard);
        } else {
            const destinationGroup = {
                ...clonedBoard.groups.find(group => group.id === destination.droppableId)
            };
            if (destinationGroup.tasks) destinationGroup.tasks.splice(destination.index, 0, ...sourceTask);
            else destinationGroup.tasks = [sourceTask];
            clonedBoard.groups = clonedBoard.groups.map(currGroup => {
                if (currGroup.id === source.droppableId) return sourceGroup;
                if (currGroup.id === destination.droppableId) return destinationGroup;
                return currGroup;
            });
            this.props.updateBoard(clonedBoard);
        }
    };

    componentWillUnmount() {
        this.props.unMountBoard();
    }
    // style={(board.style.bgColor) ? { backgroundColor: `${board.style.bgColor}` }
    // : { backgroundImage: `url(${board.style.bgImg})` }}
    render() {
        const { isAddOpen, isEditOpen } = this.state;
        const { board } = this.props;
        if (!board) return <Loader />;
        // document.body.style.backgroundImage = this.props.board.style.bgImg
        // console.log('hereeeeee', board.style.bgImg);
        return (
            <div className={`board-details-container ${isEditOpen && 'go-back-container'}`}

            >

                <BoardHeader board={this.props.board} />
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="group-list-wrapper">
                        <Droppable droppableId={board._id} direction='horizontal' type='group'>
                            {(provided, snapshot) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className='flex'>
                                    <GroupList groups={board.groups} board={board} />
                                    {provided.placeholder}
                                    <div className="add-group-container">
                                        {!isAddOpen && (
                                            <button className='flex align-center' onClick={this.onToggleAdd}>
                                                <AiOutlinePlus size={12} />
                                                <span> Add another list</span>
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
        );
    }
}

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.currBoard,
    };
}

const mapDispatchToProps = {
    setCurrBoard,
    updateBoard,
    unMountBoard,
};

export const BoardDetails = connect(mapStateToProps, mapDispatchToProps)(_BoardDetails);