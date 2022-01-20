import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { TaskPreview } from './task/TaskPreview.jsx';
import { AddBoardItem } from './AddBoardItem.jsx';

import { AiOutlinePlus } from 'react-icons/ai';

export class GroupPreview extends React.Component {
  state = {
    title: '',
    isAddOpen: false,
  };

  componentDidMount() {
    this.setState({ ...this.state, title: this.props.group.title });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };

  onToggleAdd = () => {
    this.setState({ isAddOpen: !this.state.isAddOpen });
  };

  render() {
      const { group, index, board } = this.props;
      const { title, isAddOpen } = this.state;
      return (
          <div className="group-wrapper">
              <Draggable draggableId={group.id} index={index}>
                  {(provided, snapshot) => (
                      <div className="group-preview-container flex column" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                          <div className="group-header">
                              <input className='group-title' type="text" value={title} name='title' onChange={this.handleChange}/>
                          </div>
                          <Droppable droppableId={group.id}>
                              {(provided) => (
                                  <div className='group-content' {...provided.droppableProps} ref={provided.innerRef}>
                                      {group.tasks && group.tasks.map((task, index) => {
                                          return (
                                              <TaskPreview key={task.id} task={task} index={index} group={group} groupId={group.id} board={board}/>
                                          )
                                      })}
                                      {provided.placeholder}
                                      {isAddOpen &&(
                                           <AddBoardItem onToggleAdd={this.onToggleAdd} type={'task'} groupId={group.id} />
                                      )}
                                  </div>
                              )}
                          </Droppable>
                          {!isAddOpen && (
                              <div className="group-footer">
                                  <button className="add-boarditem-btn" onClick={this.onToggleAdd}>
                                  <AiOutlinePlus/>
                                  <span>Add a task</span>
                                  </button>
                              </div>
                          )}
                      </div>
                  )}
              </Draggable>
          </div>
      )
  }
}