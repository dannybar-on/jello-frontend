import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { TaskPreview } from './task/task-preview/TaskPreview.jsx';
import { AddBoardItem } from './AddBoardItem.jsx';
import { DynamicModal } from './DynamicModal.jsx';

import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';


export class GroupPreview extends React.Component {
    state = {
        title: '',
        isAddOpen: false,
        isPopperOpen: false,
    };

    groupEditRef = React.createRef();

    componentDidMount() {
        this.setState({ ...this.state, title: this.props.group.title });
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ ...prevState, [name]: value }));
    };

    onToggleAdd = (ev) => {
        let { isAddOpen } = this.state;
        this.setState({ isAddOpen: !isAddOpen });
    };

    toggleDynamicModal = () => {
        this.setState({ isPopperOpen: !this.state.isPopperOpen })
    }

    onChangeTitle = () => {
        const { board } = this.props;
        const group = this.props.group;
        group.title = this.state.title;
        console.log(group.title);
        this.props.updateGroup(board, group);
    };

    render() {
        const { group, index, board, toggleEditOpen, isTaskLabelListOpen, toggleTaskLabelList, onSetCurrTask } = this.props;
        const { title, isAddOpen, isPopperOpen } = this.state;
        //   <div className="group-wrapper">
        return (
            <Draggable draggableId={group.id} index={index}>
                {(provided) => (
                    <div className="group-preview-container flex column" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div className="group-header flex space-between align-center">
                            <textarea className='group-title' dir="auto" wrap="hard" type="text" value={title} name='title' onChange={this.handleChange} onBlur={this.onChangeTitle} />
                            <div className="group-edit-popper" ref={this.groupEditRef} onClick={(ev) => {this.setState({isPopperOpen: !isPopperOpen}); position = ev.target.getBoundingClientRect()}}>
                                  <button>
                                      <BsThreeDots />
                                  </button>
                                  {isPopperOpen && (
                                      <DynamicModal item={'List actions'} toggleDynamicModal={this.toggleDynamicModal} onToggleAdd={this.onToggleAdd} position={position} ref={this.groupEditRef}/>
                                  )}
                              </div>
                        </div>
                        <Droppable droppableId={group.id}>
                            {(provided) => (
                                <div className='group-content' {...provided.droppableProps} ref={provided.innerRef}>
                                    {group.tasks && group.tasks.map((task, index) => {
                                        return (
                                            <TaskPreview key={task.id} task={task} index={index} group={group} groupId={group.id} board={board} toggleEditOpen={toggleEditOpen} isTaskLabelListOpen={isTaskLabelListOpen} toggleTaskLabelList={toggleTaskLabelList}  onSetCurrTask={onSetCurrTask} />
                                        );
                                    })}
                                    {provided.placeholder}
                                    {isAddOpen && (
                                        <AddBoardItem onToggleAdd={this.onToggleAdd} type={'card'} groupId={group.id} />
                                    )}
                                </div>
                            )}
                        </Droppable>
                        {!isAddOpen && (
                            <div className="group-footer">
                                <button className="add-card-btn" onClick={this.onToggleAdd}>
                                    <AiOutlinePlus />
                                    <span>Add a card</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </Draggable>

        );
    }
}

var position;