import React from 'react';
import { utilService } from '../../../services/util-service.js';
import { taskService } from '../../../services/task.service.js';
import { FiClock } from 'react-icons/fi';
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox, MdTaskAlt } from 'react-icons/md';


export class DueDate extends React.Component {

    state = {
        isHover: false,
        isClicked: false,
        className: '',
    };

    // componentDidMount() {
    //     // this.onGetClassName();
    // }

    toggleHover = () => {
        const { isHover } = this.state;
        this.setState({ isHover: !isHover });
    };

    toggleClick = (ev) => {
        ev.preventDefault();
        console.log('hhhhh');
        const { isClicked } = this.state;
        this.setState({ isClicked: !isClicked });
    };

    // onGetClassName = () => {
    //     const now = Date.now();
    //     const { dueDate } = this.props.task;
    //     console.log(dueDate, now);
    //     if (dueDate >= now) this.setState({ className: 'red' });
    //     if (dueDate <= now) this.setState({ className: 'green' });
    //     else this.setState({ className: '' });
    // };

    render() {
        const { task } = this.props;
        const { isHover, isClicked, className } = this.state;
        // if (!className) return <h1>Loading....</h1>;
        // console.log(className);
        return <div onMouseLeave={this.toggleHover}>
            {(isHover) ?
                <div onClick={(event) => this.toggleClick(event)} 
                className={taskService.getClassByStatus(task.status) + ' duedate-preview flex'} >
                    <span className='icon-sm  duedate-icon' >
                        {(isClicked) ? <MdOutlineCheckBox /> : <MdCheckBoxOutlineBlank />}
                    </span>
                    <span>
                        {utilService.handleTimestamp(task.dueDate)}
                    </span>
                </div>
                :
                <div className={taskService.getClassByStatus(task.status) + '  duedate-preview flex'}>

                    <span className='icon-sm duedate-icon' onMouseEnter={this.toggleHover} >
                        <FiClock />
                    </span>
                    <span>{utilService.handleTimestamp(task.dueDate)}
                    </span>
                </div>

            }
        </div>;
    }
}
