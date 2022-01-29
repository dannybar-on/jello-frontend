import React from 'react'

//ADD TO TASK
import { AddMembers } from './add-to-task/AddMembers';
import { LabelsList } from './add-to-task/LabelsList';
import { AddChecklist } from './add-to-task/AddChecklist';
import { AddDueDate } from './add-to-task/AddDueDate';
import { AddAttachment } from './add-to-task/AddAttachment';
import { AddCover } from './add-to-task/AddCover';

import { DynamicModal } from '../DynamicModal'


export class SideBarAddToTask extends React.Component {

    // state = {
    //     isPopoverOpen: false,

    // }

    // togglePopOver = () => {
    //     this.setState({ isPopoverOpen: !this.state.isPopoverOpen })
    // }


    render() {
        // const { isPopoverOpen } = this.state
        const { item } = this.props
        return (
            <>
                <button onClick={() => this.togglePopOver()}
                    className="add-item-btn flex row align-center">
                    <span className="flex align-center">{item.icon}</span>
                    <p>{item.title}</p>
                </button>

                
                {/* {isPopoverOpen && <DynamicModal item={item} togglePopOver={this.togglePopOver} />} */}
            </>
        )
    }
}


