import React from 'react'

import { UserAvatar } from '../UserAvatar'


import { AiOutlinePlus } from 'react-icons/ai';


export class TaskDetailsData extends React.Component {

    state = {

    }

    componentDidMount() {

    }




    render() {
        const { currTask, taskLabels } = this.props
        console.log('currTask:', currTask.members);
        // if (!taskLabels) return <></>

        return (
            <div className="task-data ml-40">


                {currTask.members && <div className="task-data-members data-container">
                    <h3 className="data-header">Members</h3>
                    
                <div className="data-member" >
                {currTask.members.map(member => <UserAvatar  fullname={member.fullname} />)}
                </div>
                    
                    <button className="add-item-btn round">
                        <AiOutlinePlus />
                    </button>
                </div>}


                {taskLabels && <div className="task-data-labels data-container">
                    <h3 className="data-header">Labels</h3>
                    {taskLabels.map((label, idx) => {
                        return <div key={idx} className="data-label " style={{ backgroundColor: `${label.color}` }}>
                            {label.title}
                        </div>

                    })}
                    <button className="add-item-btn">
                        <AiOutlinePlus />
                    </button>
                </div>}


            </div>

        )
    }
}


