import React from 'react';
import { connect } from 'react-redux';
import { taskService } from '../../../services/task.service';
import { activityTxt } from '../../../services/activity.service';
import { updateBoard, updateTask } from '../../../store/board.action.js';

class _AddCover extends React.Component {

    state = {
        color: '#344563',
        isFull: false,
    };


    componentDidMount() {
        const { currTask } = this.props;
        let size;
        if (currTask.isFull) size = 'full';
        else size = 'half';
        this.onSetSize(size);
    }


    onSetSize = (size) => {
        let { currTask, board } = this.props;
        const currGroup = taskService.getGroupById(currTask.id);
        if (size === 'full') {
            currTask.isFull = true;
            this.setState({ isFull: true });
        } else if (size === 'half') {
            currTask.isFull = false;
            this.setState({ isFull: false });

        }
        this.props.updateTask(board, currGroup, currTask);
    };

    handleColorChange = (color) => {
        let { currTask, board } = this.props;
        const currGroup = taskService.getGroupById(currTask.id);
        this.setState({ color });
        if (!currTask.style) currTask.style = {};
        currTask.style.bgColor = color;
        currTask.style.bgImg = null;
        const activity = {
            txt: activityTxt({ type: 'CHANGE_COLOR', data: color }),
            task: currTask,
            group: currGroup,
        };

        this.props.updateTask(board, currGroup, currTask);
    };


    handleColorRemove = () => {
        let { currTask, board } = this.props;
        const currGroup = taskService.getGroupById(currTask.id);
        currTask.style = null;
        this.props.updateTask(board, currGroup, currTask);
    };


    render() {
        const { color, isFull } = this.state;
        return (
            <section className="modal-cover-edit flex column">
                <div className="size-container flex column">
                    <h4>Size</h4>
                    <div className="size-options flex">

                        <div className={`size-option half ${(!isFull) ? 'selected' : ''}  `} onClick={() => this.onSetSize('half')}>
                            <div className="colored-half" style={{ backgroundColor: color }}></div>
                            <div className="line-wrapper-half">
                                <div className="first-line"></div>
                                <div className="second-line"></div>
                                <div className="third-line flex">
                                    <div className="first-fragment"></div>
                                    <div className="second-fragment"></div>
                                </div>
                                <div className="circle"></div>
                            </div>
                        </div>

                        <div className={`size-option full ${(isFull) ? 'selected' : ''}`} onClick={() => this.onSetSize('full')}
                            data-size="full" style={{ backgroundColor: color }}>
                            <div className="line-wrapper-full">
                                <div className="first-line"></div>
                                <div className="second-line"></div>
                            </div>
                        </div>
                    </div>
                    <button className="btn-style2" onClick={this.handleColorRemove}>Remove cover</button>
                </div>
                <h4>Select a color</h4>
                <div className="colors-container">
                    {Colors.map((color, idx) => {
                        return <div key={idx} style={{ backgroundColor: color }}
                            className="color-div flex"
                            onClick={() => this.handleColorChange(color)}>
                        </div>;
                    })}
                </div>
            </section >
        );
    }
}

const Colors = ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf', '#00c2e0', '#51e898', '#ff78cb', '#344563'];

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.currBoard
    };
}

const mapDispatchToProps = {
    updateBoard,
    updateTask,
};

export const AddCover = connect(mapStateToProps, mapDispatchToProps)(_AddCover);


