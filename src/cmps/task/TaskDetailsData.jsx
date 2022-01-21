import React from 'react'



export class TaskDetailsData extends React.Component {

    state = {

    }

    componentDidMount() {

    }


    

    render() {
        const { currTask } = this.props

        return (
            <div className="task-data">


                <div className="task-data-labels">
                    <span>Labels Name</span>
                </div>

            </div>

        )
    }
}


