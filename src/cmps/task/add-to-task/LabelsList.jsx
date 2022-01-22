import React from 'react'
import { connect } from 'react-redux';
import { MdOutlineEdit } from 'react-icons/md';



class _LabelsList extends React.Component {


    state = {
        search: '',
    }



    handleInputChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState({ ...this.state, [field]: value })
        console.log('this.state:', this.state);

    }


    render() {

        const { search } = this.state
        const { board } = this.props
        console.log('board:', board.labels);

        return (
            <div className="labels">

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
                            return <>
                             <li className="x flex row align-center space-between" key={label.id} >
                                <div style={{ backgroundColor: label.color }}>
                                <span className="label-title">{label.title || ''}</span>
                                </div>
                                <button className="edit-label-icon icon-sm flex-row-center"><MdOutlineEdit /></button>
                            </li>
                            </>
                        })}
                    </ul>}

                </div>



            </div>
        )
    }
}


function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.currBoard
    }
}

const mapDispatchToProps = {

}

export const LabelsList = connect(mapStateToProps, mapDispatchToProps)(_LabelsList);


