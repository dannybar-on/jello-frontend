import React from 'react';
import { MdOutlineEdit } from 'react-icons/md';
export class TaskPreviewContent extends React.Component {

    state = {
        isEditOpen: false,
    };



    render() {
        const { task, toggleEditOpen } = this.props;
        // const { isEditOpen } = this.state;
        // console.log(isEditOpen);
        return (

            <div className="task-preview">
                {/* <ul className="tas"> </ul> */}
                <p>{task.title}</p>

                <button onClick={(event) => toggleEditOpen(event)}><MdOutlineEdit /></button>
                {/* // : <button onClick={(event) => this.toggleEditOpen(event)} > Back </button>} */}
            </div>
        );

    }
}