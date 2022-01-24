import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



import { Loader } from '../cmps/Loader';
import { boardService } from '../services/board.service.js';
import { updateTask, onSetCurrTask } from '../store/board.action';

import { TaskSideBar } from '../cmps/task/TaskSideBar';
import { TaskDetailsData } from '../cmps/task/TaskDetailsData';
import { TaskDetailsChecklist } from '../cmps/task/TaskDetailsChecklist.jsx';

import { CgCreditCard } from 'react-icons/cg';
import { GrTextAlignFull } from 'react-icons/gr';
import { BsListUl } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineCheckBox } from 'react-icons/md';
import { getTouchRippleUtilityClass } from '@mui/material';
import { ChecklistPreview } from '../cmps/task/ChecklistPreview';

// import { UserAvatar } from '../cmps/UserAvatar.jsx';

class _TaskDetails extends React.Component {

    state = {
        currTask: null,
        currGroup: null,

        isDescriptionOpen: false,
        isEditOpen: false,
        checkListTitle: '',

    };



    componentDidMount() {
        this.setCurrTask();
    }


    setCurrTask = () => {
        const { boardId, groupId, taskId } = this.props.match.params;
        boardService.getById(boardId)
            .then(board => {
                const currGroup = board.groups.find(group => group.id === groupId);
                const currTask = currGroup.tasks.find(task => task.id === taskId);
                this.setState({ currGroup, currTask });
                // this.getTaskLabels()
                this.props.onSetCurrTask(currTask);
            });
    };

    handleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ currTask: { ...prevState.currTask, [name]: value } }));

    };

    handleDetailsChange = () => {
        const { board } = this.props;
        const { currTask, currGroup } = this.state;
        this.props.updateTask(board, currGroup, currTask);
        this.toggleDescriptionTextArea();
    };


    toggleDescriptionTextArea = () => {
        this.setState({ isDescriptionOpen: !this.state.isDescriptionOpen });
    };

    onCancelChanges = (ev) => {
        ev.preventDefault();
        const { currGroup } = this.state;
        const taskId = this.state.currTask.id;
        const prevTask = currGroup.tasks.find(task => task.id === taskId);
        this.setState({ currTask: prevTask });
        this.toggleDescriptionTextArea();

    };


    // onDeleteChecklist = (checklistId) => {
    //     let { currTask, board } = this.props;
    //     currTask.checklists = currTask.checklists.filter(checklist => checklist.id !== checklistId);
    //     const group = taskService.getGroupById(currTask.id);
    //     this.props.updateTask(board, group, currTask);
    // };


    // toggleEditOpen = () => {
    //     const { isEditOpen } = this.state;
    //     this.setState({ isEditOpen: !isEditOpen });
    // };

    // onEditCheckList = (ev) => {
    //     ev.preventDefault();
    // };

    // handleChecklistChange = ({ target: { name, value } }) => {
    //     this.setState({ [name]: value });

    // };

    render() {
        const { currGroup, isDescriptionOpen, isEditOpen } = this.state;
        const { boardId } = this.props.match.params;
        const { board, currTask, updateTask } = this.props;
        if (!currTask) return <Loader />;
        return (
            <React.Fragment>
                <Link to={`/board/${boardId}`} className="go-back-container" />

                <section className="task-details-container" >




                    {(currTask.style?.bgColor || currTask.style?.bgImg) && <div className="task-cover" style={{ backgroundColor: currTask.style.bgColor }}></div>}
                    <Link to={`/board/${boardId}`}>
                        <button className='close-task-btn flex-row-center'>
                            <IoMdClose />
                        </button>
                    </Link>

                    <div className="task-header flex row align-center">
                        <span className="icon-lg"><CgCreditCard /></span>

                        <input
                            className="task-title"
                            type="text"
                            name="title"
                            onChange={this.handleChange}
                            value={currTask.title}
                            onBlur={this.handleDetailsChange}

                        />

                    </div>
                    <div className="group-name">

                        {/* <p>in list <span>{currGroup.title}</span></p> */}
                    </div>

                    <div className="task-main-container flex">

                        <div className="task-main flex column">

                            {/* {board.members.map(member => <UserAvatar fullname={member.fullname} />)} */}


                            <TaskDetailsData currTask={currTask} board={board} />


                            <div className="task-description">
                                <div className="description-header flex">
                                    <span className="icon-lg"><GrTextAlignFull /></span>
                                    <h3>Description</h3>
                                </div>
                                <div className="ml-40">
                                    <textarea
                                        name="description"
                                        placeholder="Add a more detailed description..."
                                        onChange={this.handleChange}
                                        onFocus={this.toggleDescriptionTextArea}
                                        value={currTask.description}
                                        rows={(isDescriptionOpen) ? '6' : ''}
                                        onBlur={() => { this.handleDetailsChange(); }}
                                    // onBlur={() => { this.handleDetailsChange(); this.toggleDescriptionTextArea() }}

                                    >
                                    </textarea>
                                    {(isDescriptionOpen) && <>
                                        <div className="description-btns ">
                                            <button className="btn-style1" onClick={() => { this.handleDetailsChange(); }} >Save</button>
                                            <button className="close-btn" onMouseDown={(event) => { this.onCancelChanges(event); }}>
                                                <IoMdClose />
                                            </button>
                                        </div>
                                    </>
                                    }
                                </div>

                            </div>
                            <div className='task-checklist'>
                                {currTask.checklists && currTask.checklists.map(checklist => {

                                    return <div key={checklist.id}>
                                        <div className="flex">
                                            <span className="icon-lg">< MdOutlineCheckBox /></span>
                                            <ChecklistPreview checklist={checklist}
                                                currTask={currTask} board={board} updateTask={updateTask} />
                                            {/* {(isEditOpen) ? <h3 onClick={() => this.toggleEditOpen()}>{checklist.title}</h3> :
                                                <form onSubmit={(event) => this.onEditCheckList(event)}>
                                                    <textarea name="checkListTitle" value={checklist.title}
                                                        onChange={this.handleChecklistChange} />
                                                    <button className='btn-style1' type="submit">Save</button>
                                                    <button onClick={() => this.toggleEditOpen()}><IoMdClose /></button>
                                                </form>}
                                            <button onClick={() => this.onDeleteChecklist(checklist.id)}>Delete</button> */}
                                        </div>
                                        <TaskDetailsChecklist board={board} currTask={currTask} checklist={checklist} />
                                    </div>;
                                })}
                            </div>
                            <div className="task-activity">

                                <div className="activity-header flex row space-between">
                                    <div className="flex">
                                        <span className="icon-lg"><BsListUl /></span>
                                        <h3 className="activity-title">Activity</h3>
                                    </div>
                                    <button>Hide Details</button>
                                </div>

                                <div className="ml-40">
                                    <div className="activity-comment">
                                        <textarea
                                            name="comments"
                                            placeholder="Write a comment..."
                                            onChange={this.handleChange}
                                        // value={currTask.description}
                                        // onBlur={this.handleDetailsChange}
                                        >

                                        </textarea>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="task-sidebar flex column">
                            <TaskSideBar board={board} currTask={currTask} currGroup={currGroup} />
                        </div>


                    </div>

                </section>
            </React.Fragment>
        );
    }
}

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.currBoard,
        currTask: boardModule.currTask
    };
}

const mapDispatchToProps = {
    updateTask,
    onSetCurrTask
};

export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails);


