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
        const { board } = this.props
        const { labels } = this.state

        const newLabels = taskService.handleLabelsChange(newLabel, labels)
        this.setAddEditMode()
        // console.log('newLabels:', newLabels);


    }

    onRemoveLabel = (labelId) => {
        const { labels } = this.state
        const { board, currTask, currGroup } = this.props
        const updatedItems = taskService.removeLabel(labelId, labels, currTask, currGroup, board)
        
        // this.props.updateBoard(boardToUpdate,)
        this.props.updateTask(updatedItems.boardToUpdate, currGroup, updatedItems.currTask)
        // this.setAddEditMode()

    }


    render() {

        const { search, isAddEditMode, labels, label } = this.state
        const { board, toggleDynamicModal } = this.props
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
                        {labels.length && <ul className="clean-list label-list-edit">
                            {labels.map(label => {
                                return <li className="x flex row align-center space-between" key={label.id} >
                                    <div style={{ backgroundColor: label.color }}>
                                        <span className="label-title">{label.title || ''}</span>
                                    </div>
                                    <button onClick={() => this.setAddEditMode(label)} className="edit-label-icon icon-sm flex-row-center">
                                        <MdOutlineEdit />
                                    </button>
                                </li>
                            })}
                        </ul>}

                        {/* <button onClick={() => toggleDynamicModal()}>TEst</button> */}

                    </div>



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


