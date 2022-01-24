import React from 'react'
import { connect } from 'react-redux';

import { updateBoard, updateTask } from '../../../store/board.action.js';

import { LabelsEditAdd } from './LabelsEditAdd';
import { Loader } from '../../Loader';

import { MdOutlineEdit } from 'react-icons/md';
import { taskService } from '../../../services/task.service.js';




class _LabelsList extends React.Component {


    state = {
        search: '',
        isAddEditMode: false,
        labels: [],
        label: null,
    }

    componentDidMount() {
        const { board } = this.props
        this.setState({ labels: board.labels })
    }

    handleInputChange = (ev) => {
        const { labels, search } = this.state

        const field = ev.target.name
        const value = ev.target.value
        this.setState({ ...this.state, [field]: value })

    }


    setAddEditMode = (label) => {
        this.setState({ label }, () => this.setState({ isAddEditMode: !this.state.isAddEditMode }))
    }


    onSaveLabel = (newLabel) => {
        const { board, currGroup, currTask } = this.props
        // const { labels } = this.state

        const updatedBoard = taskService.handleLabelsChange(newLabel, board)
        this.props.updateTask(updatedBoard, currGroup, currTask)

        this.setAddEditMode()
    }

    toggleLabelAdd = (labelId) => {
        // console.log('labelId:', labelId);
        const { currTask, board } = this.props
        const updatedTask = taskService.handleToggleLabel(labelId, currTask)

        const currGroup = taskService.getGroupById(currTask.id)
        this.props.updateTask(board, currGroup, updatedTask)

    }

    onRemoveLabel = (labelId) => {
        // const { labels } = this.state
        if (window.confirm('Are you sure you want to delete this label?')) {
        const { board, currTask, currGroup } = this.props
        const boardToUpdate = taskService.removeLabel(labelId, board.labels, currTask, currGroup, board)
            // console.log('boardToUpdate:', boardToUpdate);
            const updatedTask = board.groups
     
            this.props.updateTask(boardToUpdate, currGroup, currTask)
        this.props.updateBoard(boardToUpdate)
        this.setAddEditMode()
        }
    }


    render() {

        const { search, isAddEditMode, labels, label } = this.state
        const { board, toggleDynamicModal } = this.props
        // console.log('board.labels:', board.labels);

        if (!labels?.length || !labels) return <Loader />

        return (
            <>
                {!isAddEditMode && <div className="labels">

                    <input
                        className="modal-search"
                        type="text"
                        name="search"
                        placeholder="Search labels..."
                        onChange={this.handleInputChange}
                        autoFocus
                        value={search}
                    />

                    <div className="labels-list">
                        <h4>Labels</h4>
                        {board.labels.length && <ul className="clean-list label-list-edit">
                            {board.labels.map(label => {
                                return <li className=" flex row align-center space-between" key={label.id} >
                                    <div onClick={() => this.toggleLabelAdd(label.id)} style={{ backgroundColor: label.color }}>
                                        <span className="label-title">{label.title || ''}</span>
                                    </div>
                                    <button onClick={() => this.setAddEditMode(label)} className="edit-label-icon icon-sm flex-row-center">
                                        <MdOutlineEdit />
                                    </button>
                                </li>
                            })}
                        </ul>}

                    </div>

                    <button className="create-label-btn" onClick={() => this.setAddEditMode()}>Create a new label</button>

                </div>}

                {isAddEditMode && <LabelsEditAdd
                    {...this.props}
                    label={label}
                    onSaveLabel={this.onSaveLabel}
                    onRemoveLabel={this.onRemoveLabel}
                    setAddEditMode={this.setAddEditMode} />}
            </>
        )
    }
}


function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.currBoard
    }
}

const mapDispatchToProps = {
    updateBoard,
    updateTask,

}

export const LabelsList = connect(mapStateToProps, mapDispatchToProps)(_LabelsList);


