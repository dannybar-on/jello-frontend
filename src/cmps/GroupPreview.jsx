import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { TaskPreview } from './task/TaskPreview.jsx';
import { AddBoardItem } from './AddBoardItem.jsx';

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
    const { group, index } = this.props;
    const { title, isAddOpen } = this.state;
    return (
      <div className={'group-wrapper'}>
        <Draggable draggableId={group.id} index={index}>
          {(provided, snapshot) => (
            <div
              className="group-preview-container"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div className="group-header">
                <input
                  className="clean-input"
                  type="text"
                  value={title}
                  name="title"
                  onChange={this.handleChange}
                />
              </div>
              <Droppable droppableId={group.id}>
                {(provided) => (
                  <ul
                    className="task-list clean-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {group.tasks &&
                      group.tasks.map((task, index) => {
                        return (
                          <TaskPreview
                            key={task.id}
                            task={task}
                            index={index}
                            groupId={group.id}
                          />
                        );
                      })}
                    {provided.placeholder}
                    {isAddOpen && (
                      <AddBoardItem
                        onToggleAddPop={this.onToggleAdd}
                        type={'task'}
                        groupId={group.id}
                      />
                    )}
                  </ul>
                )}
              </Droppable>

              {!isAddOpen && (
                <div className="group-footer">
                  <button
                    className="add-board-task-btn"
                    onClick={this.onToggleAdd}
                  >
                    <span>Add a task</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </Draggable>
      </div>
    );
  }
}
