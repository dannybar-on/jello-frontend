//REACT
import React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
//CMPS
import { TaskPreviewHeader } from './task/task-preview/TaskPreviewHeader';
import { TaskPreviewFooter } from './task/task-preview/TaskPreviewFooter';
import { DynamicModal } from './DynamicModal';
import { TaskDetails } from '../pages/TaskDetails';

//SERVICE & ACTIONS
import { taskService } from '../services/task.service.js';
import { boardService } from '../services/board.service.js';
import { updateTask, onSetCurrTask } from '../store/board.action';

//ICONS
import { IoMdTime } from 'react-icons/io';
import { AiOutlineUser, AiOutlineArrowRight } from 'react-icons/ai';
import { MdLabelOutline, MdContentCopy } from 'react-icons/md';
import { BsArchive } from 'react-icons/bs';
import { CgCreditCard } from 'react-icons/cg';


class _QuickEditor extends React.Component {

    state = {


        taskTitle: '',
        item: '',
        isModalOpen: false,
    };

    componentDidMount() {
        this.setState({ taskTitle: this.props.currTask.title });

    }


    componentDidUpdate(prevProps) {
        if (prevProps.board !== this.props.board) {
            this.setCurrTask();
        }
    }

    setCurrTask = async () => {
        // const { boardId } = this.props.match.params;
        let { currTask } = this.props;
        // const board = await boardService.getById(boardId);
        const currGroup = taskService.getGroupById(currTask.id);
        currTask = currGroup.tasks.find(task => task.id === currTask.id);
        // this.setState({ currGroup, currTask });
        this.props.onSetCurrTask(currTask);
    };
    
  

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };

    onSaveTitle = (ev, title) => {
        ev.preventDefault();
        console.log(title);
        let { currTask, board } = this.props;
        const group = taskService.getGroupById(currTask.id);
        currTask.title = title;
        this.props.updateTask(board, group, currTask);

    };

    toggleDynamicModal = (ev) => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    };

    render() {
        const { taskTitle, isModalOpen, item } = this.state;
        const { board, currTask, toggleEditOpen, } = this.props;
        let { position } = this.props;
        console.log(position)
        // const { topPos, leftPos } = taskService.getModalPosition(position);
        // console.log(position, 'IN QUICK EDITOR');
        const group = currTask && taskService.getGroupById(currTask.id);
        const taskLabels = currTask.labelIds && taskService.getLabelsById(board, currTask);
        return <section className="quick-edit-container " style={{
            position: 'fixed',
            // top: topPos,
        
            // left: leftPos,
        }}>

            <div className="task-preview-container1" style={(currTask?.isFull) ? { backgroundColor: currTask?.style?.bgColor } : { backgroundColor: '#fff' }}>
                {!currTask.isFull && (currTask?.style?.bgColor || currTask?.style?.bgImg) && <TaskPreviewHeader board={board} task={currTask} toggleEditOpen={toggleEditOpen} />}

                {!currTask.isFull && <ul className={`task-labels clean-list flex `} >
                    {board.labels && taskLabels && taskLabels.map((label, idx) => <li className='label-bar' key={idx} style={label.color && { backgroundColor: label.color }}>{label.title && <span>{label.title}</span>}</li>)}
                </ul>}

                <div style={(currTask?.isFull) ? { backgroundColor: currTask?.style?.bgColor } : { backgroundColor: 'inherit' }} >
                    <textarea type="text" name="taskTitle"
                        style={(currTask?.isFull) ? { backgroundColor: currTask?.style?.bgColor } : { backgroundColor: 'inherit' }}
                        value={taskTitle} onChange={this.handleChange} onBlur={(event) => this.onSaveTitle(event, taskTitle)} />
                    <button onClick={(event) => this.onSaveTitle(event, taskTitle)} className="btn-style1">Save</button>
                </div>

                {!currTask.isFull && <TaskPreviewFooter board={board} task={currTask} />}
            </div>


            <div className="quick-edit-btns">
                {/* <Link className="flex align-center row" to={`${board._id}/${group.id}/${currTask.id}`} >
                    <span className="flex align-center"><CgCreditCard /></span>
                    <p>Open card</p>
                </Link> */}
                {addToTaskItems.map((item, idx) => (
                    <button key={idx} onClick={(event) => { this.toggleDynamicModal(event); this.setState({ item }); position = event.target.getBoundingClientRect(); }}
                        className="add-item-btn flex row align-center">
                        <span className="flex align-center">{item.icon}</span>

                        <p>{item.title}</p>
                    </button>
                ))}
            </div>
            {isModalOpen && <DynamicModal item={item.title} {...this.props} toggleDynamicModal={this.toggleDynamicModal} position={position} />}
        </section >;
    }
}
let position 
// let


const addToTaskItems = [

    { icon: <AiOutlineUser />, title: 'Members' },
    { icon: <MdLabelOutline />, title: 'Labels' },
    { icon: <IoMdTime />, title: 'Dates' },
    { icon: <CgCreditCard />, title: 'Cover' },
    { icon: <AiOutlineArrowRight />, title: 'Move' },
    { icon: <MdContentCopy />, title: 'Copy' },
    { icon: <BsArchive />, title: 'Archive' },
];

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.currBoard,
        currTask: boardModule.currTask
    };
}

const mapDispatchToProps = {
    // setCurrBoard,
    // updateBoard,
    // unMountBoard,
    // updateGroup,
    onSetCurrTask,
    updateTask,
};

export const QuickEditor = connect(mapStateToProps, mapDispatchToProps)(_QuickEditor);
{/* onClick={(event) => toggleTaskLabelList(event)}> */ }