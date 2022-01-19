import React from 'react';
import {connect} from 'react-redux';

import { updateBoard, onAddTask } from '../store/board.action.js'
import { utilService } from '../services/util-service.js';

class _AddBoardItem extends React.Component {
    state = {
        newItem: {
            title: ''
        }
    }

    async componentDidMount(){
        this.textInput.focus();
    }

    handleChange = ({target}) => {
        let newItem = this.state.newItem;
        newItem[target.name] = target.value;
        this.setState({ newItem })
    }

    onAddItem = (ev) => {
        ev.preventDefault();
        const {newItem} = this.state;
        if (!newItem.title) return;
        newItem.id = utilService.makeId();

        if (this.props.type === 'group') {
            if(!newItem.tasks) newItem.tasks=[];
            this.props.updateBoard(newItem)
        } else if (this.props.type === 'task') {
            const newTask = {...newItem}
            this.props.onAddTask(newTask, this.props.groupId, this.props.board)
        }

        this.setState({newItem: {title: ''}})
    }

    render() {
        const { title } = this.state.newItem
        const { onToggleAdd } = this.props;
        const renderedType = this.props.type === 'task' ? this.props.type : 'list';
        return (
            <section className="add-board-item">
                <form onSubmit={this.onAddItem}>
                    <textarea placeholder={`Enter a title for this ${renderedType}`} name="title" value={title} ref={input => {this.textInput = input}} onChange={this.handleChange} onBlur={this.onAddItem} />
                    <div className="form-btns">
                        <button type='submit'>Add {renderedType}</button>
                        <button onClick={onToggleAdd}>X</button>
                    </div>
                </form>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.currBoard
    }
}

const mapDispatchToProps = {
    updateBoard,
    onAddTask
}

export const AddBoardItem = connect(mapStateToProps, mapDispatchToProps)(_AddBoardItem)