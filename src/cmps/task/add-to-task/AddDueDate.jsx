import React, {useState} from 'react'
import {useParams} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { taskService } from '../../../services/task.service.js';
import { updateTask } from '../../../store/board.action.js';

function _AddDueDate({updateTask, currTask, board}) {
    const [startDate] = useState(new Date());
    const [endDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const {groupId} = useParams()

    const onChange = (date) => {
        setDueDate(date.getTime())
    }
    
    const cleanDate = () => {
        setDueDate(null)
        handleDueDate()
    }
    
    const handleDueDate = () => {  
      const res = taskService.handleDueDateChange(dueDate, currTask);
      console.log(res);
      const currGroup = board.groups.find(group => group.id === groupId);
        updateTask(board, currGroup, res)
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
                <button className='date-picker-btns save-btn' onClick={handleDueDate}>Save</button>
                <button className='date-picker-btns reset-btn' onClick={cleanDate}>Remove</button>
            </div>
        </div>
    )
}

function mapStateToProps({boardModule}){
  return{
      board: boardModule.currBoard,
      currTask: boardModule.currTask
  }  
}

const mapDispatchToProps = {
    updateTask
}

export const AddDueDate = connect(mapStateToProps, mapDispatchToProps)(_AddDueDate);