import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



import { Loader } from '../cmps/Loader';
import { boardService } from '../services/board.service.js';
import { utilService } from '../services/util-service.js';
import { updateTask, onSetCurrTask } from '../store/board.action';
import { DynamicModal } from '../cmps/DynamicModal';

import { TaskSideBar } from '../cmps/task/TaskSideBar';
import { TaskDetailsData } from '../cmps/task/TaskDetailsData';
import { TaskDetailsChecklist } from '../cmps/task/TaskDetailsChecklist.jsx';
import { UserAvatar } from '../cmps/UserAvatar.jsx';

import { CgCreditCard } from 'react-icons/cg';
import { GrTextAlignFull } from 'react-icons/gr';
import { BsListUl, BsCreditCard } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { ChecklistPreview } from '../cmps/task/ChecklistPreview';
import { AttachmentPreview } from '../cmps/task/AttachmentPreview';
import { taskService } from '../services/task.service';
import { TaskDetailsComment } from '../cmps/task/TaskDetailsComment';

// import { UserAvatar } from '../cmps/UserAvatar.jsx';

class _TaskDetails extends React.Component {

    state = {
        currTask: null,
        currGroup: null,
        isDescriptionOpen: false,
        isEditOpen: false,
        isCommentOpen: false,
        comment: '',
        isLabelsOpen: false,
        isMembersOpen: false,
        isCoverOpen: false,
    };

    componentDidMount() {
        this.setCurrTask();
    }

    toggleIsEditOpen = (event) => {
        const { isEditOpen } = this.state;
        this.setState({ isEditOpen: !isEditOpen });
    };

    toggleIsCoverOpen = () => {
        const { isCoverOpen } = this.state;
        this.setState({ isCoverOpen: !isCoverOpen });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.board !== this.props.board) {
            this.setCurrTask();
        }
    }

    setCurrTask = async () => {
        const { boardId, groupId, taskId } = this.props.match.params;
        const board = await boardService.getById(boardId);
        const currGroup = board.groups.find(group => group.id === groupId);
        const currTask = currGroup.tasks.find(task => task.id === taskId);
        this.setState({ currGroup, currTask });
        this.props.onSetCurrTask(currTask);
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

    setCommentOpen = () => {
        this.setState({ isCommentOpen: !this.state.isCommentOpen });
    };

    onCancelChanges = (ev) => {
        ev.preventDefault();
        const { board } = this.props;
        const { currGroup } = this.state;
        const taskId = this.state.currTask.id;
        const prevTask = currGroup.tasks.find(task => task.id === taskId);
        this.setState({ currTask: prevTask, isDescriptionOpen: false }, () => {
            this.props.updateTask(board, currGroup, prevTask);

        });

    };
    handleCommentChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });

    };

    toggleIsLabelsOpen = () => {
        const { isLabelsOpen } = this.state;
        this.setState({ isLabelsOpen: !isLabelsOpen });
    };

    onAddComment = (ev) => {
        ev.preventDefault();
        const { comment } = this.state;
        let { board, currTask, user } = this.props;
        const group = taskService.getGroupById(currTask.id);
        if (!currTask.comments || !currTask.comments.length) currTask.comments = [];
        const id = utilService.makeId();
        currTask.comments.push({ txt: comment, createdAt: Date.now(), createdBy: { ...user }, id });
        console.log('currTask', currTask, comment);
        this.props.updateTask(board, group, currTask);
    };


    onDeleteComment = (commentId) => {
        let { board, currTask } = this.props;
        const group = taskService.getGroupById(currTask.id);
        currTask.comments = currTask.comments.filter(comment => {
            return comment.id !== commentId;
        });
        console.log('inDelete', currTask.comments);
        this.props.updateTask(board, group, currTask);
    };

    toggleIsMembersOpen = () => {
        const { isMembersOpen } = this.state;
        this.setState({ isMembersOpen: !isMembersOpen });
    };

    render() {
        const { currGroup, isDescriptionOpen, isEditOpen, isLabelsOpen, isMembersOpen, isCoverOpen, comment } = this.state;
        const { boardId } = this.props.match.params;
        const { board, currTask, updateTask, history, user } = this.props;
        if (!currTask || !this.state.currTask) return <Loader />;

        return (
            <React.Fragment>
                <section onClick={() => history.push(`/board/${boardId}`)} className="go-back-container" >

                    <div className="task-details-container" onClick={(ev) => ev.stopPropagation()}>


                        {(currTask.style?.bgColor || currTask.style?.bgImg) && <div className={`task-cover ${(currTask.style.bgImg) ? 'bg-cover' : ''}`} style={(currTask.style.bgImg) ? { backgroundImage: currTask.style.bgImg } : { backgroundColor: currTask.style.bgColor }}>

                            <div className={`cover-btn-container ${(currTask.style.bgImg) ? 'bg-img' : ''}`}>
                                <button className='btn-style2 details-cover-btn' onClick={(event) => { this.toggleIsCoverOpen(); position = event.target.getBoundingClientRect(); }}>
                                    <span className="icon-sm align-center cover-icon"><BsCreditCard /></span>
                                    <span className="">Cover</span>
                                </button>

                                {isCoverOpen && <DynamicModal item={'Cover'} {...this.props} toggleDynamicModal={this.toggleIsCoverOpen} position={position}>
                                </DynamicModal>}
                            </div>
                        </div>}


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
                                value={this.state.currTask.title}
                                onBlur={this.handleDetailsChange}

                            />

                        </div>
                        <div className="group-name">
                            <p>in list <span>{currGroup.title}</span></p>
                        </div>

                        <div className="task-main-container flex">

                            <div className="task-main flex column">

                                <TaskDetailsData currGroup={currGroup} isEditOpen={isEditOpen} toggleIsEditOpen={this.toggleIsEditOpen} isLabelsOpen={isLabelsOpen} toggleIsLabelsOpen={this.toggleIsLabelsOpen} isMembersOpen={isMembersOpen} toggleIsMembersOpen={this.toggleIsMembersOpen} />

                                <div className="task-description">
                                    <div className="details-section-header ">
                                        <span className="icon-lg header-icon"><GrTextAlignFull /></span>
                                        <h3>Description</h3>
                                    </div>
                                    <div className="ml-40">
                                        {(isDescriptionOpen) && <textarea
                                            name="description"
                                            placeholder="Add a more detailed description..."
                                            onChange={this.handleChange}
                                            autoFocus
                                            value={this.state.currTask.description}
                                            rows={(isDescriptionOpen) ? '4' : ''}
                                            onBlur={() => { this.handleDetailsChange(); }}

                                        >
                                        </textarea>}
                                        {(!isDescriptionOpen) && <p onClick={this.toggleDescriptionTextArea}>{this.state.currTask.description || "Add a more detailed description..."}</p>}

                                        {(isDescriptionOpen) && <>
                                            <div className="description-btns flex row">
                                                <button className="btn-style1" onClick={() => { this.handleDetailsChange(); }} >Save</button>
                                                <button className="close-btn icon-lg" onMouseDown={(event) => { this.onCancelChanges(event); }}>
                                                    <IoMdClose />
                                                </button>
                                            </div>
                                        </>
                                        }
                                    </div>

                                </div>

                                {currTask.attachments && currTask.attachments.length > 0 && (
                                    <AttachmentPreview />
                                )}


                                {currTask.checklists && currTask.checklists.map(checklist => {

                                    return <div key={checklist.id}>

                                        <ChecklistPreview checklist={checklist}
                                            currTask={currTask} board={board} updateTask={updateTask} />



                                        <TaskDetailsChecklist board={board} currTask={currTask} checklist={checklist} />
                                    </div>;
                                })}



                                <div className="task-activity">

                                    <div className="details-section-header flex space-between">
                                        <span className="icon-lg header-icon t-14"><BsListUl /></span>
                                        <h3>Activity</h3>
                                        <button className="btn-style2">Hide Details</button>
                                    </div>

                                    <div className="ml-40">
                                        <div className="activity-comment flex align-center">
                                            <span className="member-img">
                                                <UserAvatar sx={{ width: 20, height: 20 }} fullname={user.fullname} />
                                            </span>
                                            {/* <form onSubmit={this.onAddComment}> */}
                                                <textarea
                                                    name="comment"
                                                    placeholder="Write a comment..."
                                                    onChange={this.handleCommentChange}
                                                    value={comment}
                                                />
                                                <button className="btn-style1" type="submit" onClick={()=>this.onAddComment()}>Save</button>

                                            {/* </form> */}
                                        </div>


                                        {currTask.comments && currTask.comments.map((comment, idx) => <TaskDetailsComment comment={comment} key={idx} onDeleteComment={this.onDeleteComment} />)}
                                    </div>


                                </div>
                            </div>

                            <div className="task-sidebar flex column">
                                <TaskSideBar board={board} currTask={currTask} currGroup={currGroup} />
                            </div>


                        </div>


                    </div>
                </section>
            </React.Fragment>
        );
    }
}

function mapStateToProps({ boardModule, userModule }) {
    return {
        board: boardModule.currBoard,
        currTask: boardModule.currTask,
        user: userModule.user,
    };
}

const mapDispatchToProps = {
    updateTask,
    onSetCurrTask
};

export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails);

var position;


