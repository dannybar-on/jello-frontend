import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { boardService } from '../services/board.service.js';
import { userService } from '../services/user-service.js';
import { setCurrBoard, updateBoard, unMountBoard, updateGroup, onSetCurrTask } from '../store/board.action.js';
import { login } from '../store/user.action.js';

import { Route } from 'react-router-dom';

import { Loader } from '../cmps/Loader.jsx';
import { GroupList } from '../cmps/GroupList.jsx';
import { AddBoardItem } from '../cmps/AddBoardItem.jsx';
import { TaskDetails } from '../pages/TaskDetails.jsx';
import { BoardHeader } from '../cmps/board/BoardHeader.jsx';
import { AiOutlinePlus } from 'react-icons/ai';
import { QuickEditor } from '../cmps/QuickEditor.jsx';
import {Dashboard} from '../cmps/Dashboard.jsx';

class _BoardDetails extends React.Component {
  state = {
    board: null,
    isAddOpen: false,
    // isEditOpen: false,
    isTaskLabelListOpen: false,
  };

  componentDidMount() {
    const {user,login} = this.props
    this.loadBoard();

    if (!user) {
      const guest = userService.getGuestUser()   
      login(guest)
    }
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

  // toggleEditOpen = (ev, task) => {
  //   ev.preventDefault();

  //   const { isEditOpen } = this.state;
  //   this.setState({ isEditOpen: !isEditOpen });
  //   this.props.onSetCurrTask(task)
  // };

  toggleTaskLabelList = (event) => {
    event.preventDefault();
    this.setState({ isTaskLabelListOpen: !this.state.isTaskLabelListOpen });
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
      ...clonedBoard.groups.find((group) => group.id === source.droppableId),
    };
    const sourceTask = sourceGroup.tasks.splice(source.index, 1);
    if (source.droppableId === destination.droppableId) {
      sourceGroup.tasks.splice(destination.index, 0, ...sourceTask);
      this.props.updateBoard(clonedBoard);
    } else {
      const destinationGroup = {
        ...clonedBoard.groups.find(
          (group) => group.id === destination.droppableId
        ),
      };
      if (destinationGroup.tasks)
        destinationGroup.tasks.splice(destination.index, 0, ...sourceTask);
      else destinationGroup.tasks = [sourceTask];
      clonedBoard.groups = clonedBoard.groups.map((currGroup) => {
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

  toggleGroupArchive = (groupId) => {
    const groupToUpdate = this.props.board.groups.find((group) => groupId === group.id);
    groupToUpdate.isArchive = (groupToUpdate.isArchive) ? !groupToUpdate.isArchive : true;
    this.props.updateGroup(this.props.board, groupToUpdate)
  }

  render() {
    const { isAddOpen, isEditOpen, isTaskLabelListOpen } = this.state;
    const { board, updateGroup, onSetCurrTask } = this.props;

    if (!board) return <Loader />;
    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className={`board-details-container `}>
            {/* <div className={(isEditOpen) ? 'pencil-edit-screen' : ''}></div> */}

            <BoardHeader board={this.props.board} />
            <div className='list-container flex'>
              <GroupList groups={board.groups} board={board} onSetCurrTask={onSetCurrTask} updateGroup={updateGroup} toggleTaskLabelList={this.toggleTaskLabelList} isTaskLabelListOpen={isTaskLabelListOpen} toggleGroupArchive={this.toggleGroupArchive} />
              {!isAddOpen && (
                <div onClick={this.onToggleAdd} className="add-another-group">
                  <button className='add-list-btn flex align-center' >
                    <AiOutlinePlus />
                    <span> Add another list</span>
                  </button>
                </div>
              )}
              {isAddOpen && (
                <div className='add-group-container'>
                  <AddBoardItem
                    onToggleAdd={this.onToggleAdd}
                    type={'group'}
                  />
                </div>
              )}
              <Route
                component={TaskDetails}
                path="/board/:boardId/:groupId/:taskId"
              />
              <Route
                component={Dashboard}
                path="/board/:boardId/dashboard"
              />
            </div>

          </div>
        </DragDropContext >
        {/* {isEditOpen && <QuickEditor board={board} toggleEditOpen={this.toggleEditOpen}
         task={currTask} toggleTaskLabelList={this.toggleTaskLabelList} position={position}
          isTaskLabelListOpen={isTaskLabelListOpen}
          />} */}

      </>
    );
  }
}

var position;

function mapStateToProps({ boardModule, userModule }) {
  return {
    board: boardModule.currBoard,
    currTask: boardModule.currTask,
    user: userModule.user
  };
}

const mapDispatchToProps = {
  setCurrBoard,
  updateBoard,
  unMountBoard,
  updateGroup,
  onSetCurrTask,
  login,

};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);
