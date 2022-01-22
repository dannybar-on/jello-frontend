import React from 'react'
import { ImInsertTemplate } from 'react-icons/im'



export class DynamicModal extends React.Component {

state={

}

// togglePopOver = () => {
//     this.setState({ isPopoverOpen: !this.state.isPopoverOpen })
// }


    render() {
        // const {isPopoverOpen}= this.state
        const { item } = this.props
        return (
            <section className="dynamic-modal-container">

                    <div className="modal-header">
                        <span className="modal-header-title">{item.title}</span>
                        <button className="modal-close-btn"></button>
                        </div>


                    {item.component}
            </section>
           
        )
    }
}


