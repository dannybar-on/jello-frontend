import React from 'react'

import { DynamicModal } from '../DynamicModal'

import { IoMdTime } from 'react-icons/io';
import { AiOutlineUser, AiOutlineArrowRight } from 'react-icons/ai';
import { MdLabelOutline, MdContentCopy } from 'react-icons/md';
import { BsCheck2Square, BsArchive } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { CgCreditCard } from 'react-icons/cg';



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
                        <button key={idx} onClick={() => { this.toggleDynamicModal(); this.setState({ content: item }) }}
                            className="add-item-btn flex row align-center">
                            <span className="flex align-center">{item.icon}</span>
                            <p>{item.title}</p>
                        </button>
                    ))}
                    {isModalOpen && <DynamicModal item={content.title} {...this.props} toggleDynamicModal={this.toggleDynamicModal} />}
                </section>


                <section className="sidebar-actions-container">
                    <h3 className="sidebar-title">Actions</h3>
                    {TaskActions.map((item, idx) => (
                        <button key={idx} onClick={() => { this.toggleDynamicModal(); this.setState({ content: item }) }}
                            className="add-item-btn flex row align-center">
                            <span className="flex align-center">{item.icon}</span>
                            <p>{item.title}</p>
                        </button>
                    ))}
                </section>
            </>
        )
    }
}



const addToTaskItems = [
    { icon: <AiOutlineUser />, title: 'Members' },
    { icon: <MdLabelOutline />, title: 'Labels' },
    { icon: <BsCheck2Square />, title: 'Checklist' },
    { icon: <IoMdTime />, title: 'Dates' },
    { icon: <ImAttachment />, title: 'Attachment' },
    { icon: <CgCreditCard />, title: 'Cover' },
]


const TaskActions = [
    { icon: <AiOutlineArrowRight />, title: 'Move' },
    { icon: <MdContentCopy />, title: 'Copy' },
    { icon: <BsArchive />, title: 'Archive' },
]