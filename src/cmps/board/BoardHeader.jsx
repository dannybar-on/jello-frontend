import React from 'react';
import { connect } from 'react-redux';
import { updateBoard } from '../../store/board.action.js';
// import {Loader} from '../Loader.jsx'
import { FiStar } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
class _BoardHeader extends React.Component {

    state = {
        isClicked: false,
    };

    toggleIsStarred = () => {
        const { isClicked } = this.state;
        let { board, updateBoard } = this.props;
        this.setState({ isClicked: !isClicked });
        board.isStarred = !isClicked;
        updateBoard(board);
    };

    render() {
        const { board } = this.props;
        const { isClicked } = this.state;
        console.log('header',board);
        if (!board) return <h1>Loading</h1>;
        return <section className='board-header-container'>
            <h1>{board.title}</h1>
            <button onClick={this.toggleIsStarred}>{(isClicked) ? <FaStar /> : <FiStar />} </button>
            <div>
                <h1>User avatars</h1>
            </div>
        </section>;
    }
}

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.currBoard,
    };
}

const mapDispatchToProps = {
    updateBoard,
};

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader);