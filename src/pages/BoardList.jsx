import React from 'react';
import { connect } from 'react-redux'
import { BoardPreview } from '../cmps/BoardPreview';
import { loadBoards } from '../store/board.action';

class _BoardList extends React.Component {
    state = {}

    componentDidMount(){
        this.props.loadBoards()
    }

    render() {
        const { boards } = this.props;
        console.log('Boards', boards);
    return (
    <section className='board-list flex'>
        <h1>Hello World! I am in BoardList</h1>
        {boards.map(board => {
            return <BoardPreview key={board._id} board={board}></BoardPreview>
        })}
    </section>
    )
}
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards
    }
}

const mapDispatchToProps = {
    loadBoards
}

export const BoardList = connect(mapStateToProps, mapDispatchToProps)(_BoardList);