import { useThemeWithoutDefault } from '@mui/system';
import React from 'react';
import { connect } from 'react-redux';
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
        let { currTask, board, currGroup } = this.props;
        if (size === 'full') this.setState({ isFull: true }, () => {
            currTask.isFull = this.state.isFull;
        });
        else if (size === 'half') this.setState({ isFull: false }, () => {
            currTask.isFull = this.state.isFull;
        });
        this.props.updateTask(board, currGroup, currTask);
    };

    handleColorChange = (color) => {
        let { currTask, board, currGroup } = this.props;
        this.setState({ color });
        if (!currTask.style) currTask.style = {};
        currTask.style.bgColor = color;
        this.props.updateTask(board, currGroup, currTask);
    };


    handleColorRemove = () => {
        let { currTask, board, currGroup } = this.props;
        currTask.style = null;
        this.props.updateTask(board, currGroup, currTask);
    };


    render() {
        const { color, isFull } = this.state;
        return (
            <section className="modal-cover-edit flex column">
                Cover
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
                            {/* {color === label.color && <span className="icon-sm"><MdDone /></span>} */}
                        </div>;
                    })}
                </div>



            </section >
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

export const AddCover = connect(mapStateToProps, mapDispatchToProps)(_AddCover);


const Colors = ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf', '#00c2e0', '#51e898', '#ff78cb', '#344563'];

