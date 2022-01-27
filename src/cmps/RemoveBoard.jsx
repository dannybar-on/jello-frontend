import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { removeBoard } from '../store/board.action';

class _RemoveBoard extends React.Component {
  onRemoveBoard = async () => {
    const { board, removeBoard } = this.props;
    await removeBoard(board._id);
    this.props.history.push('/board');
  };

  render() {
    return (
      <section className="remove-board flex column">
        <p>Remove this board from workspace?</p>
        <p>This action is irreversible</p>
        <button className="btn-style1 delete-btn" onClick={() => this.onRemoveBoard()}>Remove</button>
      </section>
    );
  }
}

function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.currBoard,
  };
}
const mapDispatchToProps = {
  removeBoard,
};

export const RemoveBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(_RemoveBoard));
