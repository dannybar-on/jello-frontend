import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addBoard } from '../../store/board.action.js';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

class _BoardAdd extends React.Component {
    state = {
        isModal: true,
        markedId: 0,
        boardName: '',
        isAllowed: 'not-allowed',
    };

    componentDidUpdate(prevProps) {
        if (prevProps.isModal !== this.props.isModal) {
            this.setState({ isModal: this.props.isModal })
        }
    }

    bgcs = [
        {
            bgc: 'https://images.unsplash.com/photo-1632269826291-2cb3009bf43d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
            bgc: 'https://images.unsplash.com/photo-1632286988262-dee7280ee48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
            bgc: 'https://images.unsplash.com/photo-1632301497603-33fb3d7afdd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
            bgc: 'https://images.unsplash.com/photo-1632303283130-8a2ec7823251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400',
        },
        { bgc: 'rgb(0, 121, 191)', title: 'blue' },
        { bgc: 'rgb(210, 144, 52)', title: 'orange' },
        { bgc: 'rgb(81, 152, 57)', title: 'green' },
        { bgc: 'rgb(176, 70, 50)', title: 'red' },
        { bgc: 'rgb(137, 96, 158)', title: 'puprle' }
    ];

    onCloseModal = (ev) => {
        this.setState({
            isModal: false,
            markedId: 0,
            boardName: '',
            isAllowed: 'not-allowed',
        }, () => { this.props.onClose() });
        this.props.toggleIsAdd()
    };

    handleBgc = (targetId) => {
        this.setState({ markedId: targetId });
    };

    handleChange = ({ target }) => {
        this.setState({
            boardName: target.value,
            isAllowed: target.value.length > 0 ? 'allowed' : 'not-allowed',
        });
    };

    onCreateNewBoard = () => {
        const boardToAdd = {
            title: this.state.boardName,
            style: {},
        };
        this.state.markedId < 4
            ? (boardToAdd.style.bgImg = this.bgcs[this.state.markedId].bgc.substring(0, this.bgcs[this.state.markedId].bgc.length - 6))
            : (boardToAdd.style.bgColor = this.bgcs[this.state.markedId].bgc);
            this.props.addBoard(boardToAdd)
            .then(board => this.props.history.push(`board/${board._id}`))
            this.onCloseModal()
    };

    render() {
        return <Modal showCloseIcon={true} open={this.state.isModal} onClose={this.onCloseModal}>
            <div className='new-board'>
                {this.state.markedId < 4 && (
                    <div className='main img' style={{ backgroundImage: `url(${this.bgcs[this.state.markedId].bgc})` }}></div>
                )}
                {this.state.markedId > 3 && <div className='main' style={{ backgroundColor: this.bgcs[this.state.markedId].bgc }}></div>}
                <input
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck='false'
                    type='text'
                    className='new-board-name'
                    placeholder='Add board title'
                    aria-label='Add board title'
                    data-test-id='create-board-title-input'
                    value={this.state.boardName}
                    onChange={this.handleChange}
                />
                <div className='side'>
                    <div
                        className={`${this.state.markedId === 0 ? 'marked' : ''}`}
                        onClick={(ev) => {
                            this.handleBgc(0);
                        }}
                        style={{ backgroundImage: `url(${this.bgcs[0].bgc})` }}
                        title={this.bgcs[0]?.title}
                    ></div>
                    <div
                        className={`${this.state.markedId === 1 ? 'marked' : ''}`}
                        onClick={(ev) => {
                            this.handleBgc(1);
                        }}
                        style={{ backgroundImage: `url(${this.bgcs[1].bgc})` }}
                        title={this.bgcs[1]?.title}
                    ></div>
                    <div
                        className={`${this.state.markedId === 2 ? 'marked' : ''}`}
                        onClick={(ev) => {
                            this.handleBgc(2);
                        }}
                        style={{ backgroundImage: `url(${this.bgcs[2].bgc})` }}
                        title={this.bgcs[2]?.title}
                    ></div>
                    <div
                        className={`${this.state.markedId === 3 ? 'marked' : ''}`}
                        onClick={(ev) => {
                            this.handleBgc(3);
                        }}
                        style={{ backgroundImage: `url(${this.bgcs[3].bgc})` }}
                        title={this.bgcs[3]?.title}
                    ></div>
                    <div
                        className={`${this.state.markedId === 4 ? 'marked' : ''}`}
                        onClick={(ev) => {
                            this.handleBgc(4);
                        }}
                        style={{ backgroundColor: `${this.bgcs[4].bgc}` }}
                        title={this.bgcs[4]?.title}
                    ></div>
                    <div
                        className={`${this.state.markedId === 5 ? 'marked' : ''}`}
                        onClick={(ev) => {
                            this.handleBgc(5);
                        }}
                        style={{ backgroundColor: `${this.bgcs[5].bgc}` }}
                        title={this.bgcs[5]?.title}
                    ></div>
                    <div
                        className={`${this.state.markedId === 6 ? 'marked' : ''}`}
                        onClick={(ev) => {
                            this.handleBgc(6);
                        }}
                        style={{ backgroundColor: `${this.bgcs[6].bgc}` }}
                        title={this.bgcs[6]?.title}
                    ></div>
                    <div
                        className={`${this.state.markedId === 7 ? 'marked' : ''}`}
                        onClick={(ev) => {
                            this.handleBgc(7);
                        }}
                        style={{ backgroundColor: `${this.bgcs[7].bgc}` }}
                        title={this.bgcs[7]?.title}
                    ></div>
                     <div
                        className={`${this.state.markedId === 8 ? 'marked' : ''}`}
                        onClick={(ev) => {
                            this.handleBgc(8);
                        }}
                        style={{ backgroundColor: `${this.bgcs[8].bgc}` }}
                        title={this.bgcs[8]?.title}
                    ></div>
                </div>
            </div>
            <div className='btn'>
                <button
                    className={this.state.isAllowed}
                    disabled={this.state.isAllowed === 'allowed' ? false : true}
                    onClick={this.onCreateNewBoard}
                >
                    Create board
                </button>
            </div>
        </Modal>
    }

}

const mapDispatchToProps = {
    addBoard,
};

const mapStateToProps = ({boardModule}) => {
    return {
        board: boardModule.currBoard
    };
};

export const BoardAdd = connect(mapStateToProps, mapDispatchToProps)(withRouter(_BoardAdd));
