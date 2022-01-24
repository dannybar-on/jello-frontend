import React from 'react';

import { UserAvatar } from '../UserAvatar';

import { taskService } from '../../services/task.service.js'

import { AiOutlinePlus } from 'react-icons/ai';


export class TaskDetailsData extends React.Component {

    state = {

    }




    render() {
        const { board, currTask } = this.props
        console.log('board AT DATAAA:', board);

        if (currTask.labelIds) { var taskLabels = taskService.getLabelsById(board, currTask) }
        // const taskLabels = taskService.getLabelsById(board, currTask)
        console.log('taskLabels:', taskLabels);

        // if (!taskLabels) return <></>

        return (
            <div className="task-data ml-40">


                {currTask.members && <div className="task-data-members data-container">
                    <h3 className="data-header">Members</h3>

                    <div className="data-member" >
                        {currTask.members.map((member, idx) => <UserAvatar key={idx} fullname={member.fullname} url={member.imgUrl} />)}
                    </div>

                    <button className="add-item-btn round">
                        <AiOutlinePlus />
                    </button>
                </div>}


                {(taskLabels || taskLabels?.length) && <div className="task-data-labels data-container">
                    <h3 className="data-header">Labels</h3>
                    {taskLabels.map((label, idx) => {
                        return <div key={idx} className="data-label" style={(taskLabels) ? { backgroundColor: `${label.color}` } : { backgroundColor: '' }}>
                            {label.title}
                        </div>

                    })}
                    <button className="add-item-btn">
                        <AiOutlinePlus />
                    </button>
                </div>}


            </div>

        );
    }
}


