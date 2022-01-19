import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


import { Loader } from '../cmps/Loader'
import { boardService } from '../services/board.service.js';
import { updateTask } from '../store/board.action'

class _TaskDetails extends React.Component {

    state = {
        task: null,
        group: null,

    }


    componentDidMount() {
        this.setCurrTask()

    }


    setCurrTask = () => {
        const { boardId, groupId, taskId } = this.props.match.params;

        const board = boardService.getById(boardId)
            .then(board => {
                const group = board.groups.find(group => group.id === groupId)
                const task = group.tasks.find(task => task.id === taskId)
                console.log('task:', task);
                this.setState({ group, task });


            });
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ task: { ...prevState.task, [name]: value } }));
        console.log('this,state,title:', this.state.task);

    }

    handleDetailsChange = () => {
        const { board } = this.group
        const { task, group } = this.state
        this.props.updateTask(this.state.task);

    }



    // goBack = () => {
    //     const { board } = this.props
    //     this.props.history.push(`/board/${board._id}`)
    //   }



    render() {

        const { task } = this.state
        const {board} = this.props
        if (!task) return <Loader />

        return (
            <Link to={`/board/${board._id}`}><div className="go-back-container">


                <section className="task-details-container" >
                    {/* <Link path={board/boardId}><button>X</button></Link> */}
                    <div className="task-details-header flex-row-center ">
                        <span>icon</span>
                        <input
                            className="task-title"
                            type="text"
                            name="title"
                            onChange={this.handleChange}
                            value={task.title}
                            onBlur={this.handleDetailsChange}
                        />
                        {/* <p>in List{task.title}</p> */}



                    </div>

                </section>
            </div></Link>
        )
    }
}

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.currBoard
    }
}

const mapDispatchToProps = {
    updateTask,
};

export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails)


