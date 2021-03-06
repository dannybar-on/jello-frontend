import React from 'react';
import { connect } from 'react-redux';

import { updateBoard, updateTask } from '../../../store/board.action.js';
import { taskService } from '../../../services/task.service.js';

import { LabelsEditAdd } from './LabelsEditAdd';
import { Loader } from '../../Loader';

import { MdOutlineEdit } from 'react-icons/md';

class _LabelsList extends React.Component {

    state = {
        search: '',
        isAddEditMode: false,
        isDeleteModal: false,
        labels: [],
        label: null,
    };

    componentDidMount() {
        const { board } = this.props;
        this.setState({ labels: board.labels });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.board !== this.props.board) {
            this.setState({ labels: this.props.board.labels });
        }
    }

    handleInputChange = (ev) => {
        let { board } = this.props;
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ ...this.state, [field]: value });
        const filtered = taskService.getSearchedLabel(board, value);
        this.setState({ labels: filtered });
    };

    setAddEditMode = (label) => {
        this.setState({ label }, () => this.setState({ isAddEditMode: !this.state.isAddEditMode }));
    };


    onSaveLabel = (newLabel) => {
        const { board, currTask } = this.props;
        const currGroup = taskService.getGroupById(currTask.id);
        const updatedBoard = taskService.handleLabelsChange(newLabel, board);
        this.props.updateTask(updatedBoard, currGroup, currTask);
        this.setAddEditMode();
    };


    toggleLabelAdd = (labelId) => {
        const { currTask, board } = this.props;
        const updatedTask = taskService.handleToggleLabel(labelId, currTask);
        const currGroup = taskService.getGroupById(currTask.id);
        this.props.updateTask(board, currGroup, updatedTask);
    };

    openDeleteModal = () => {
        this.setState({ isDeleteModal: !this.state.isDeleteModal })
    }

    onRemoveLabel = (labelId) => {
        let { board, currTask } = this.props;
        currTask.labelIds = currTask.labelIds.filter(id => id !== labelId);
        const currGroup = taskService.getGroupById(currTask.id);
        const boardToUpdate = taskService.removeLabel(labelId, board.labels, board);
        this.props.updateTask(boardToUpdate, currGroup, currTask);
        this.setState({ labels: boardToUpdate.labels });
        this.setAddEditMode();
    };


    render() {

        const { search, isAddEditMode, labels, label, isDeleteModal } = this.state;

        if (!labels?.length || !labels) return <Loader />;

        return (
            <>
                {(!isAddEditMode && !isDeleteModal) && <div className="labels">
                    <input
                        className="input-style"
                        type="text"
                        name="search"
                        placeholder="Search labels..."
                        onChange={this.handleInputChange}
                        autoFocus
                        value={search}
                    />

                    <div className="labels-list">
                        <h4 className="modal-content-title">Labels</h4>
                        {labels.length && <ul className="clean-list label-list-edit">
                            {labels.map(label => {
                                return <li className=" flex row align-center space-between" key={label.id} >
                                    <div onClick={() => this.toggleLabelAdd(label.id)} style={{ backgroundColor: label.color }}>
                                        <span className="label-title">{label.title || ''}</span>
                                    </div>
                                    <button onClick={() => this.setAddEditMode(label)} className="edit-label-icon icon-sm flex-row-center">
                                        <MdOutlineEdit />
                                    </button>
                                </li>;
                            })}
                        </ul>}

                    </div>
                    <button className="create-label-btn" onClick={() => this.setAddEditMode()}>Create a new label</button>
                </div>}

                {(isAddEditMode) && <LabelsEditAdd
                    {...this.props}
                    label={label}
                    isDeleteModal={isDeleteModal}
                    isAddEditMode={isAddEditMode}
                    onSaveLabel={this.onSaveLabel}
                    onRemoveLabel={this.onRemoveLabel}
                    setAddEditMode={this.setAddEditMode}
                    openDeleteModal={this.openDeleteModal} />}
            </>
        );
    }
}


function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.currBoard
    };
}

const mapDispatchToProps = {
    updateBoard,
    updateTask,

};

export const LabelsList = connect(mapStateToProps, mapDispatchToProps)(_LabelsList);


