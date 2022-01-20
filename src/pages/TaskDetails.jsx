import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Loader } from '../cmps/Loader';
import { boardService } from '../services/board.service.js';
import { updateTask } from '../store/board.action';

import { CgCreditCard } from 'react-icons/cg';

class _TaskDetails extends React.Component {

    state = {
        currTask: null,
        currGroup: null,

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
        console.log('this.state.currTask:', this.state.currTask);

    };

    handleDetailsChange = () => {
        const { board } = this.props;
        const { currTask, currGroup } = this.state;
        this.props.updateTask(board, currGroup, currTask);
    };



    render() {

        const { currTask } = this.state;
        const { boardId } = this.props.match.params;
        if (!currTask) return <Loader />;

        return (
            <React.Fragment>
                <Link to={`/board/${boardId}`} className="go-back-container" />


                <section className="task-details-container" >
                    {/* <Link path={board/boardId}><button>X</button></Link> */}
                    <div className="task-header flex-row-center ">
                        <span><CgCreditCard /></span>
                        <input
                            className="task-title"
                            type="text"
                            name="title"
                            onChange={this.handleChange}
                            value={currTask.title}
                            onBlur={this.handleDetailsChange}
                        />
                        {/* <p>in List{task.title}</p> */}
                    </div>

                    <div className="task-main">
                        <div className="task-description">
                            <div className="description-header">
                            Description
                            </div>
                            <textarea
                             name="description" 
                              onChange={this.handleChange}
                              onBlur={this.handleDetailsChange}
                             cols="30" 
                              rows="10">

                            </textarea>

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


