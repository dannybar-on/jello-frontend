import React from 'react'

import { IoMdClose } from 'react-icons/io';



export class DynamicModal extends React.Component {

    state = {

    }

    // togglePopOver = () => {
    //     this.setState({ isPopoverOpen: !this.state.isPopoverOpen })
    // }


    render() {
        
        // const {isPopoverOpen}= this.state
        const { item, togglePopOver } = this.props
        console.log('item.component:', item.component);
        
        return (
            <section className="dynamic-modal-container">

                <div className="modal-header">
                    <span className="modal-header-title">{item.title}</span>
                    <button className="modal-close-btn icon-sm" onClick={() => togglePopOver()}> <IoMdClose /> </button>
                </div>

                <div className="modal-content">
                    {item.component}

                </div>

            </section>

        )
    }
}


