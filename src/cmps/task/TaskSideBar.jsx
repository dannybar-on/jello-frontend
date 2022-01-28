import React from 'react'

import { DynamicModal } from '../DynamicModal'

import { IoMdTime } from 'react-icons/io';
import { AiOutlineUser, AiOutlineArrowRight } from 'react-icons/ai';
import { MdLabelOutline, MdContentCopy } from 'react-icons/md';
import { BsCheck2Square, BsArchive, BsCreditCard } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';



export class TaskSideBar extends React.Component {

    state = {
        isModalOpen: false,
        item: '',
    }

    toggleDynamicModal = (state) => {
        if (!state) state = false

        this.setState({ isModalOpen: state })
    }


    render() {
        const { isModalOpen, item } = this.state
        return (
            <>
                {/* <button className="close-modal-screen"></button> */}
                <section className="sidebar-btns-container ">
                    <h3 className="sidebar-title">Add to card</h3>
                    {addToTaskItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={(event) => {
                                this.toggleDynamicModal(true);
                                this.setState({ item });
                                position = event.target.getBoundingClientRect()
                            }}
                            className="add-item-btn flex row align-center">
                            <div className="btn-layover"></div>
                            <span className="flex align-center">{item.icon}</span>
                            <p>{item.title}</p>
                        </button>

                    ))}
                </section>


                <section className="sidebar-actions-container">
                    <h3 className="sidebar-title">Actions</h3>
                    {TaskActions.map((item, idx) => (
                        <button key={idx} onClick={(event) => {
                            this.toggleDynamicModal(true);
                            this.setState({ item });
                            position = event.target.getBoundingClientRect()
                        }}
                            className="add-item-btn flex row align-center">
                            <div className="btn-layover"></div>
                            <span className="flex align-center">{item.icon}</span>
                            <p>{item.title}</p>
                        </button>
                    ))}
                </section>

                {isModalOpen && <DynamicModal item={item.title} {...this.props} toggleDynamicModal={this.toggleDynamicModal} position={position} />}
            </>
        )
    }
}

var position

const addToTaskItems = [
    { icon: <AiOutlineUser />, title: 'Members', position },
    { icon: <MdLabelOutline />, title: 'Labels', position },
    { icon: <BsCheck2Square />, title: 'Checklist', position },
    { icon: <IoMdTime />, title: 'Dates', position },
    { icon: <ImAttachment />, title: 'Attachment', position },
    { icon: <BsCreditCard />, title: 'Cover', position },
]


const TaskActions = [
    { icon: <AiOutlineArrowRight />, title: 'Move', position },
    { icon: <MdContentCopy />, title: 'Copy', position },
    { icon: <BsArchive />, title: 'Archive', position },
]