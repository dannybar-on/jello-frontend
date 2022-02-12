import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { taskService } from '../../../services/task.service.js';
import { updateTask, onSetCurrTask } from '../../../store/board.action.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function _AddDueDate({ updateTask, currTask, board, toggleDynamicModal }) {
    const [startDate] = useState(new Date());
    const [endDate] = useState(null);
    const [dueDate, setDueDate] = useState('invalidDate');
    const { groupId } = useParams();

    const onChange = (date) => {
        setDueDate(date.getTime());
    };

    useEffect(()=>{
        if (dueDate === 'invalidDate') return;
        handleDueDate();
    },[dueDate])

    const cleanDate = () => {
        setDueDate(null);
    };

    const handleDueDate = () => {
        const res = taskService.handleDueDateChange(dueDate, currTask);
        const currGroup = taskService.getGroupById(res.id);
        updateTask(board, currGroup, res);
    };
    
    const submitDueDate = () => {
        toggleDynamicModal();
    }

    return (
        <div className="date-picker">
            <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                inline
                formatWeekDay={nameOfDay => nameOfDay.substr(0, 3)}
            />
            <div className="date-btns flex column">
                <button className='date-picker-btns save-btn' onClick={submitDueDate}>Save</button>
                <button className='date-picker-btns reset-btn' onClick={cleanDate}>Remove</button>
            </div>
        </div>
    );
}

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.currBoard,
        currTask: boardModule.currTask
    };
}

const mapDispatchToProps = {
    updateTask,
    onSetCurrTask
};

export const AddDueDate = connect(mapStateToProps, mapDispatchToProps)(_AddDueDate);