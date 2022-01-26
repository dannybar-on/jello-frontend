import React from 'react'

import { taskService } from '../services/task.service.js'

//ADD TO TASK
import { AddMembers } from './task/add-to-task/AddMembers';
import { LabelsList } from './task/add-to-task/LabelsList';
import { AddChecklist } from './task/add-to-task/AddChecklist';
import { AddDueDate } from './task/add-to-task/AddDueDate';
import { AddAttachment } from './task/add-to-task/AddAttachment';
import { AddCover } from './task/add-to-task/AddCover';
import { EditAttachment } from './task/add-to-task/EditAttachment';

//TASK ACTIONS
import { ActionMoveTask } from './task/task-actions/ActionMoveTask'
import { ActionCopyTask } from './task/task-actions/ActionCopyTask';
import { ActionArchiveTask } from './task/task-actions/ActionArchiveTask';

import { IoMdClose } from 'react-icons/io';

export class DynamicModal extends React.Component {

    setDynamicModalContent = () => {
        const { item } = this.props

        switch (item) {
            case 'Members':
                return <AddMembers {...this.props} />

            case 'Labels':
                return <LabelsList {...this.props} />

            case 'Checklist':
                return <AddChecklist {...this.props} />

            case 'Dates':
                return <AddDueDate {...this.props} />

            case 'Attachment':
                return <AddAttachment {...this.props} />

            case 'Edit Attachment':
                return <EditAttachment {...this.props} />

            case 'Cover':
                return <AddCover {...this.props} />

            case 'Move':
                return <ActionMoveTask {...this.props} />

            case 'Copy':
                return <ActionCopyTask {...this.props} />

            case 'Archive':
                return <ActionArchiveTask {...this.props} />

            default:
        }
    }


    //    setModalPos = (ev) => {
    //     // console.log('pos', ev.target.getBoundingClientRect());
    //     const clickedElementPos = ev.target.getBoundingClientRect()
    //     // console.log('clickedElementsPos:', clickedElementPos);

    //     const topPos = clickedElementPos.top - clickedElementPos.height
    //     taskService.getModalPosition(topPos)
    //     }

    render() {

        const { item, toggleDynamicModal, position } = this.props
        const topPos = taskService.getModalPosition(position)
        console.log('position:', topPos);

        return (
            <>
                {/* <button className="close-modal-screen"></button> */}
                <section style={{ top: topPos }} className="dynamic-modal-container" onBlur={() => console.log('blur')}>

                    <div className="modal-header">
                        <span className="modal-header-title">{item}</span>
                        <button className="modal-close-btn icon-sm" onClick={() => toggleDynamicModal()}> <IoMdClose /> </button>
                    </div>

                    <div className="modal-content">
                        {this.setDynamicModalContent()}


                    </div>

                </section>
            </>
        )
    }
}



