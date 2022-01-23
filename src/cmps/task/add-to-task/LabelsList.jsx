import React from 'react'
import { connect } from 'react-redux';
import { MdOutlineEdit } from 'react-icons/md';
import { DynamicModal } from '../../DynamicModal';



class _LabelsList extends React.Component {


    state = {
        search: '',
        isAddEditMode: false,
    }



    handleInputChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState({ ...this.state, [field]: value })
        console.log('this.state:', this.state);

    }


    setAddEditMode = () => {
        this.setState({ isAddEditMode: !this.state.isAddEditMode })

    }


    render() {

        const { search, isAddEditMode } = this.state
        const { board, toggleDynamicModal } = this.props


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
                                    <button onClick={() => this.setAddEditMode()} className="edit-label-icon icon-sm flex-row-center">
                                        <MdOutlineEdit />
                                    </button>
                                </li>
                            </>
                        })}
                    </ul>}

                    <button onClick={() => toggleDynamicModal()}>TEst</button>
                </div>


                {/* {isAddEditMode && <DynamicModal labels={board.labels} />} */}

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


