import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Loader } from '../cmps/Loader';
import { boardService } from '../services/board.service.js';
import { updateTask } from '../store/board.action';
import { TaskSideBar } from '../cmps/TaskSideBar';

import { CgCreditCard } from 'react-icons/cg';
import { GrTextAlignFull } from 'react-icons/gr';
import { FiList } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

class _TaskDetails extends React.Component {

    state = {
        currTask: null,
        currGroup: null,
        isDescriptionOpen: false,


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

            });
    };

    handleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ currTask: { ...prevState.currTask, [name]: value } }));

    };

    handleDetailsChange = () => {
        const { board } = this.props;
        const { currTask, currGroup } = this.state;
        this.props.updateTask(board, currGroup, currTask);

    };


    setDescriptionTextArea = () => {
        this.setState({ isDescriptionOpen: !this.state.isDescriptionOpen })
    }

    onCancelChanges = (ev) => {
        ev.preventDefault()
        const { currGroup } = this.state
        const taskId = this.state.currTask.id
        const prevTask = currGroup.tasks.find(task => task.id === taskId)
        this.setState({ currTask: prevTask })
        this.setDescriptionTextArea()

    }


    render() {
        const { currTask, currGroup, isDescriptionOpen } = this.state;
        const { boardId } = this.props.match.params;
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

                        <p>in list <span>{currGroup.title}</span></p>
                    </div>

                    <div className="task-main-container flex">

                        <div className="task-main flex column">

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
                                        onFocus={this.setDescriptionTextArea}
                                        value={currTask.description}
                                        rows={(isDescriptionOpen)?'6':''}
                                        onBlur={() => { this.handleDetailsChange(); this.setDescriptionTextArea() }}

                                    >
                                    </textarea>
                                    {(isDescriptionOpen) && <>
                                        <div className="description-btns ">
                                            <button className="btn-style1" onClick={() => { this.handleDetailsChange() }} >Save</button>
                                            <button className="close-btn" onMouseDown={(event) => { this.onCancelChanges(event); }}>
                                                <IoMdClose />
                                            </button>
                                        </div>
                                    </>
                                    }
                                </div>

                            </div>

                            <div className="task-activity">

                                <div className="activity-header flex row space-between">
                                    <div className="flex">
                                        <span className="icon-lg"><FiList /></span>
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
                            <TaskSideBar />
                        </div>


                    </div>

                </section>
            </React.Fragment>
        );
    }
}

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.currBoard
    };
}

const mapDispatchToProps = {
    updateTask,
};

export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails);


