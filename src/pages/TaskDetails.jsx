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
import { BsListUl, BsCreditCard } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { ChecklistPreview } from '../cmps/task/ChecklistPreview';
import { AttachmentPreview } from '../cmps/task/AttachmentPreview';

// import { UserAvatar } from '../cmps/UserAvatar.jsx';

class _TaskDetails extends React.Component {

    state = {
        currTask: null,
        currGroup: null,
        isDescriptionOpen: false,
        isEditOpen: false,
        isCommentOpen: false,
        comment: '',


    };

    componentDidMount() {
        this.setCurrTask();
    }

    toggleIsEditOpen = (event) => {
        const {isEditOpen} = this.state; 
        this.setState({isEditOpen: !isEditOpen})
    }

    // componentDidUpdate(prevState) {
    //     if (prevState.currBoard !== this.props.board) {
    //         console.log(this.props.currTask, 'in did update');
    //         this.setCurrTask(this.props.currTask);
    //     }
    // }


    componentDidUpdate(prevProps) {
        if (prevProps.board !== this.props.board) {
            this.setCurrTask();
        }
    }

    setCurrTask = async () => {
        const { boardId, groupId, taskId } = this.props.match.params;
        const board = await boardService.getById(boardId)
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

    setCommentOpen = (state) => {
        this.setState({ isCommentOpen: state });
    };

    onCancelChanges = (ev) => {
        ev.preventDefault();
        const { currGroup } = this.state;
        const taskId = this.state.currTask.id;
        const prevTask = currGroup.tasks.find(task => task.id === taskId);
        this.setState({ currTask: prevTask, isDescriptionOpen: false });
    };



    render() {
        const { currGroup, isDescriptionOpen, isEditOpen } = this.state;
        const { boardId } = this.props.match.params;
        const { board, currTask, updateTask, history } = this.props;
        if (!currTask || !this.state.currTask) return <Loader />;

        return (
            <React.Fragment>
                <section onClick={() => history.push(`/board/${boardId}`)} className="go-back-container" >

                    <div className="task-details-container" onClick={(ev) => ev.stopPropagation()}>


                        {(currTask.style?.bgColor || currTask.style?.bgImg) && <div className={`task-cover ${(currTask.style.bgImg) ? 'bg-cover' : ''}`} style={(currTask.style.bgImg) ? { backgroundImage: currTask.style.bgImg } : { backgroundColor: currTask.style.bgColor }}>

                            <div className={`cover-btn-container ${(currTask.style.bgImg) ? 'bg-img' : ''}`}>
                                <button className='btn-style2' >
                                    <span className="icon-sm align-center cover-icon"><BsCreditCard /></span>
                                    <span className="">Cover</span>
                                </button>
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

                                <TaskDetailsData currGroup={currGroup} isEditOpen={isEditOpen} toggleIsEditOpen={this.toggleIsEditOpen}/>

                                <div className="task-description">
                                    <div className="details-section-header ">
                                        <span className="icon-lg header-icon"><GrTextAlignFull /></span>
                                        <h3>Description</h3>
                                    </div>
                                    <div className="ml-40">
                                        <textarea
                                            name="description"
                                            placeholder="Add a more detailed description..."

                                            onChange={this.handleChange}
                                            onFocus={this.toggleDescriptionTextArea}
                                            value={this.state.currTask.description}
                                            rows={(isDescriptionOpen) ? '4' : ''}
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
                                        <div className="activity-comment">
                                            {/* <span className="member-img">
                                                <UserAvatar sx={{ width: 20, height: 20 }} fullname={member.fullname} url={member.imgUrl} />
                                            </span> */}
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


