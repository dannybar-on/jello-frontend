import React from 'react';
import { connect } from 'react-redux'
// import { BrowserRouter as Router,Link, useRouteMatch, Route } from 'react-router-dom';

class _TaskDetails extends React.Component {

    state = {
        task: {
            title: "",

        }


    }


    componentDidMount() {


        this.setState({})

    }

    handleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ task: { ...prevState.task, [name]: value } }));
        console.log('this,state,title:', this.state.task);

    };

    // goBack = () => {
    //     const { board } = this.props
    //     this.props.history.push(`/board/${board._id}`)
    //   }



    render() {
        const { task: { title } } = this.state
        

        return (
            <section className="task-details-container" >
                {/* <Link path={board/boardId}><button>X</button></Link> */}
                <div className="task-details-header flex-row-center ">
                    <span>icon</span>
                    <input
                        className="task-title"
                        type="text"
                        name="title"
                        onChange={this.handleChange}
                        value={title}
                    //    onBlur={}
                    />
                    {/* <p>in List{task.title}</p> */}



                </div>

            </section>
        )
    }
}

function mapStateToProps({ }) {
    return {
        // user: userModule.user
    }
}

const mapDispatchToProps = {

};

export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails)


