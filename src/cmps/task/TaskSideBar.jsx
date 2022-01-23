import React from 'react'

//ADD TO TASK
import { AddMembers } from './add-to-task/AddMembers';
import { LabelsList } from './add-to-task/LabelsList';
import { AddChecklist } from './add-to-task/AddChecklist';
import { AddDueDate } from './add-to-task/AddDueDate';
import { AddAttachment } from './add-to-task/AddAttachment';
import { AddCover } from './add-to-task/AddCover';
//TASK ACTIONS
import { ActionMoveTask } from './task-actions/ActionMoveTask'
import { ActionCopyTask } from './task-actions/ActionCopyTask';
import { ActionArchiveTask } from './task-actions/ActionArchiveTask';

import { DynamicModal } from '../DynamicModal'


import { SideBarTaskActions } from './SideBarTaskActions';

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


    //  addToTaskItems =[
    //     { icon: <AiOutlineUser />, title: 'Members', component: <AddMembers /> },
    //     { icon: <MdLabelOutline />, title: 'Labels', component: <LabelsList/> },
    //     { icon: <BsCheck2Square />, title: 'Checklist', component: <AddChecklist /> },
    //     { icon: <IoMdTime />, title: 'Dates', component: <AddDueDate /> },
    //     { icon: <ImAttachment />, title: 'Attachment', component: <AddAttachment /> },
    //     { icon: <CgCreditCard />, title: 'Cover', component: <AddCover /> },
    // ]



    render() {
        const { isModalOpen, content } = this.state
        return (
            <>
                <section className="sidebar-btns-container ">
                    <h3 className="sidebar-title">Add to card</h3>
                    {addToTaskItems.map((item, idx) => (
                        <button key={idx} onClick={() => { this.toggleDynamicModal(); this.setState({ content: item }) }}
                            className="add-item-btn flex row align-center">
                            <span className="flex align-center">{item.icon}</span>
                            <p>{item.title}</p>
                        </button>
                    ))}
                    {isModalOpen && <DynamicModal item={content} {...this.props} toggleDynamicModal={this.toggleDynamicModal} />}
                </section>


                <section className="sidebar-actions-container">
                    <h3 className="sidebar-title">Actions</h3>
                    {TaskActions.map((item, idx) => (
                        <SideBarTaskActions key={idx} item={item} />
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
    { icon: <AiOutlineArrowRight />, title: 'Move', component: <ActionMoveTask /> },
    { icon: <MdContentCopy />, title: 'Copy', component: <ActionCopyTask /> },
    { icon: <BsArchive />, title: 'Archive', component: <ActionArchiveTask /> },
]