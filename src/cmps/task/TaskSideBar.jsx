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
        content: '',
    }

    toggleDynamicModal = () => {

        this.setState({ isModalOpen: !this.state.isModalOpen })
    }


    render() {
        const { isModalOpen, content } = this.state
        return (
            <>
                <button className="close-modal-screen"></button>
                <section className="sidebar-btns-container ">
                    <h3 className="sidebar-title">Add to card</h3>
                    {addToTaskItems.map((item, idx) => (

                        <button
                            key={idx}
                            onClick={(event) => { this.toggleDynamicModal(); this.setState({ content: item }); position = event.target.getBoundingClientRect() }}
                            className="add-item-btn flex row align-center">
                            <div className="btn-layover"></div>
                            <span className="flex align-center">{item.icon}</span>
                            <p>{item.title}</p>
                        </button>

                    ))}
                    {isModalOpen && <DynamicModal item={content.title} {...this.props} toggleDynamicModal={this.toggleDynamicModal} position={position} />}
                </section>


                <section className="sidebar-actions-container">
                    <h3 className="sidebar-title">Actions</h3>
                    {TaskActions.map((item, idx) => (
                        <button key={idx} onClick={(event) => { this.toggleDynamicModal(event); this.setState({ content: item }) }}
                            className="add-item-btn flex row align-center">
                            <div className="btn-layover"></div>
                            <span className="flex align-center">{item.icon}</span>
                            <p>{item.title}</p>
                        </button>
                    ))}
                </section>
            </>
        )
    }
}

let position

const addToTaskItems = [
    { icon: <AiOutlineUser />, title: 'Members' },
    { icon: <MdLabelOutline />, title: 'Labels' },
    { icon: <BsCheck2Square />, title: 'Checklist' },
    { icon: <IoMdTime />, title: 'Dates' },
    { icon: <ImAttachment />, title: 'Attachment' },
    { icon: <BsCreditCard />, title: 'Cover' },
]


const TaskActions = [
    { icon: <AiOutlineArrowRight />, title: 'Move' },
    { icon: <MdContentCopy />, title: 'Copy' },
    { icon: <BsArchive />, title: 'Archive' },
]