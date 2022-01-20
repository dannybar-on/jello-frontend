import React from 'react'

import { AddMembers } from './task/AddMembers';
import { AddLabels } from './task/AddLabels';
import { AddChecklist } from './task/AddChecklist';
import { AddDueDate } from './task/AddDueDate';
import { AddAttachment } from './task/AddAttachment'; 
import { AddCover } from './task/AddCover'; 

import { SideBarActions } from './SideBarActions';

import { IoMdTime } from 'react-icons/io';
import { AiOutlineUser } from 'react-icons/ai';
import { MdLabelOutline } from 'react-icons/md';
import {BsCheck2Square } from 'react-icons/bs';
import {ImAttachment } from 'react-icons/im';
import {CgCreditCard } from 'react-icons/cg';


export class TaskSideBar extends React.Component {

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-title">Add to card</div>
                {addToTaskItems.map((item, idx) => (
                    <SideBarActions key={idx} item={item} />
                ))}

            </div>
        )
    }
}


const addToTaskItems = [
    { icon: <AiOutlineUser />, title: 'Members', component: <AddMembers /> },
    { icon: <MdLabelOutline />, title: 'Labels', component: <AddLabels /> },
    { icon: <BsCheck2Square />, title: 'Checklist', component: <AddChecklist /> },
    { icon: <IoMdTime />, title: 'Dates', component: <AddDueDate /> },
    { icon: <ImAttachment />, title: 'Attachment', component: <AddAttachment /> },
    { icon: <CgCreditCard />, title: 'Cover', component: <AddCover /> },
]