import React from 'react'

import { IoMdClose } from 'react-icons/io';

//ADD TO TASK
import { AddMembers } from './task/add-to-task/AddMembers';
import { LabelsList } from './task/add-to-task/LabelsList';
import { AddChecklist } from './task/add-to-task/AddChecklist';
import { AddDueDate } from './task/add-to-task/AddDueDate';
import { AddAttachment } from './task/add-to-task/AddAttachment';
import { AddCover } from './task/add-to-task/AddCover';


export class DynamicModal extends React.Component {

    setDynamicModalContent = () => {
        const {item} = this.props

        switch (item.title) {
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
             
            case 'Cover':
                return <AddCover {...this.props} />
             
            default:
        }
    }





    render() {

        // const {isPopoverOpen}= this.state
        const { item, toggleDynamicModal } = this.props
        
        return (
            <section className="dynamic-modal-container">

                <div className="modal-header">
                    <span className="modal-header-title">{item.title}</span>
                    <button className="modal-close-btn icon-sm" onClick={() => toggleDynamicModal()}> <IoMdClose /> </button>
                </div>

                <div className="modal-content">
                    {this.setDynamicModalContent()}
                    

                </div>

            </section>

        )
    }
}



