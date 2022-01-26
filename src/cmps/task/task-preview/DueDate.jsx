import React from 'react';
import { utilService } from '../../../services/util-service.js';
import { taskService } from '../../../services/task.service.js';
import { FiClock } from 'react-icons/fi';
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox, MdTaskAlt } from 'react-icons/md';


export class DueDate extends React.Component {

    state = {
        isHover: false,
        isClicked: false,
    };

    // componentDidMount() {
    //     // this.onGetClassName();
    // }

    toggleHover = () => {
        const { isHover } = this.state;
        this.setState({ isHover: !isHover });
    };

    toggleCompleteStatus = (ev, task) => {
        ev.preventDefault();
        ev.stopPropagation();
        const { isClicked } = this.state;
        (!isClicked) ? task.status = 'complete' : task.status = 'in-progress';
        this.setState({ isClicked: !isClicked });
    };



    getClassStyle = (task) => {
        //complete
        if (task.status === 'complete') return 'green';
        //due soon
        else if (
            task.dueDate - Date.now() > 0 &&
            task.dueDate - Date.now() < 1000 * 60 * 60 * 24
        )
            return 'yellow';
        //overdue
        else if (task.dueDate - Date.now() < 0)
            return 'red';
        //none of the above
        return null;
    };

    render() {
        const { task } = this.props;
        const { isHover, isClicked } = this.state;
        // if (!className) return <h1>Loading....</h1>;
        // console.log(className);
        return <div onMouseLeave={this.toggleHover}>
            {(isHover) ?
                <div onClick={(event) => this.toggleCompleteStatus(event, task)}
                    className={this.getClassStyle(task) + ' badge-preview flex'} >
                    <span className='icon-sm badge-icon'>
                        {(isClicked) ? <MdOutlineCheckBox /> : <MdCheckBoxOutlineBlank />}
                    </span>
                    <span>
                        {utilService.handleTimestamp(task.dueDate)}
                    </span>
                </div>
                :
                <div onClick={(event) => this.toggleCompleteStatus(event, task)}
                    className={this.getClassStyle(task) + '  badge-preview flex-row-center'}>

                    <span className='icon-sm badge-icon ' onMouseEnter={this.toggleHover} >
                        <FiClock />
                    </span>
                    <span>{utilService.handleTimestamp(task.dueDate)}
                    </span>
                </div>

            }
        </div>;
    }
}
