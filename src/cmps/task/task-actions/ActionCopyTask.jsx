import React, { useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {taskService} from '../../../services/task.service.js'
import { updateBoard } from '../../../store/board.action';

function _ActionCopyTask({board, currTask, updateBoard}) {
    const [currTitle, setCurrTitle] = useState('');
    const [currGroup, setCurrGroup] = useState(null);
    const [currPosition, setCurrPosition] = useState(null)

    useEffect(() => {
        const group = taskService.getGroupById(currTask.id, board._id)
        const task = taskService.getTaskById(currTask.id, group.id)
        setCurrTitle(task.title)
        setCurrGroup(group)
        const idx = group.tasks.findIndex(task => task.id === currTask.id)
        setCurrPosition(idx + 1)
    }, [board, currTask.id])
    
    const handleChange = ({target: {name, value}}) => {
        if (name === 'group') {
            const group = board.groups.find(item => item.id === value)
            setCurrGroup(group)
            setCurrPosition(group.tasks.length + 1)
        } else if (name === 'position') {
            setCurrPosition(value)
        } else if (name === 'title') {
            setCurrTitle(value)
        }
    }

    const getPositions = () => {
        const length = currGroup.tasks.length + 1;
        const positions = [];
        for (let i = 1; i <= length; i++) {
            positions.push(i)
        }

        return positions;
    }

    const handleSubmit = () => {
        const groupId = currGroup.id;
        const idx = currPosition - 1;
        const boardToUpdate = taskService.handleCopyTask(currTask.id, groupId, idx, currTitle)
        updateBoard(boardToUpdate)
    }

    if (!currGroup) return null
    return (
        <div className="copy-card">
            <label>Title</label>
            <textarea name="title" className="search-input" autoFocus value={currTitle} onChange={handleChange} />

            <label>Copy to...</label>
            <div className="select-board">
                <span className="label">Board</span>
                <span className="select-value">{board.title}</span>
                <select name="board" onChange={handleChange}>
                    <option value={board._id}>{board.title}</option>
                </select>
            </div>

            <div className="flex bottom-container">
                <div className="select-group">
                    <span className="label">List</span>
                    <span className="select-value">{currGroup.title}</span>
                    <select name="group" onChange={handleChange}>
                        {board.groups.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
                    </select>
                </div>

                <div className="select-position">
                    <span className="label">Position</span>
                    <span className="select-value">{currPosition}</span>
                    <select name="position" onChange={handleChange}>
                        {getPositions().map((item, i) => <option key={i} value={item}>{item}</option>)}
                    </select>
                </div>
            </div>
            <button className="copy-btn card-edit-btn secondary" onClick={handleSubmit}>Create card</button>
        </div>
    )
}


const mapStateToProps = ({boardModule}) => {
    return {
        boards: boardModule.boards,
        board: boardModule.currBoard,
        currTask: boardModule.currTask
    }
}

const mapDispatchToProps = {
   updateBoard
}

export const ActionCopyTask = connect(mapStateToProps, mapDispatchToProps)(_ActionCopyTask)
