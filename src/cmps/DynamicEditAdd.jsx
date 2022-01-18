import React from "react"
import Creatable from 'react-select/creatable'

import { connect } from 'react-redux'
import { saveToy } from '../store/toy.action.js'

import { Loader } from './Loader.jsx';



export class _DynamicEditAdd extends React.Component {

    state = {
        toy: {
            name: '',
            price: '',
            inStock: true,
            labels: [],
        }
    }

    componentDidMount() {
        let { toy } = this.props;
        if (toy) {
            const labels = toy.labels.map((label, idx) => {
                return { label, value: idx }
            })
            toy = {
                ...toy,
                labels
            }
            this.setState({ toy })
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({ toy: { ...prevState.toy, [field]: value } }))
    }

    handleLabelChange = (value) => {
        this.setState((prevState) => ({ toy: { ...prevState.toy, labels: value } }))
    }

    isToyInStock = () => {
        // const { toy } = this.state
        // this.setState({...this.state.toy, inStock : !this.state.toy.inStock})
    }

    onSaveToy = async (ev) => {
        ev.preventDefault()
        let { toy, toy: { labels } } = this.state

        let newToy = {
            ...toy,
            labels: labels.map(val => val.label)
        }

        await this.props.saveToy(newToy)
        this.props.onShowDynamicEditAdd()
        this.props.loadToy()
        this.cleanForm()
    }

    cleanForm = () => {
        const { toy } = this.state
        this.setState({ ...toy, toy: { name: '', price: '', labels: [] } })
    }

    render() {
        const { toy, toy: { name, price, labels } } = this.state
        const { isShowDynamicEditAdd, onShowDynamicEditAdd } = this.props
        if (!toy || !labels) return <Loader />
        return (

            <section className={`dynamic-edit-add-container flex column ${(isShowDynamicEditAdd) ? 'edit-open' : 'edit-close'} `}>

                <button className="close-btn flex" onClick={() => onShowDynamicEditAdd()}>X</button>
                <form className="edit-add-form flex-column-center">

                    <label>Toy Name:  </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter toy name"
                        value={name}
                        onChange={this.handleChange} />

                    <label>Price: </label>
                    <input
                        type="text"
                        name="price"
                        value={price}
                        onChange={this.handleChange} />


                    <div className='input'>
                        <label>Labels</label>
                        <Creatable
                            isClearable
                            isMulti
                            onChange={(value) => this.handleLabelChange(value)}
                            options={labels}
                            value={labels}
                        // styles={customStyles}
                        />
                    </div>


                    <button className="save-btn btn1-style" onClick={(event) => this.onSaveToy(event)}>Save</button>
                </form>

                <span onClick={() =>this.isToyInStock()} >stock</span>

            </section>
        )
    }
}


function mapStateToProps({ }) {
    return {

    }
}


const mapDispatchToProps = {
    saveToy

};

export const DynamicEditAdd = connect(mapStateToProps, mapDispatchToProps)(_DynamicEditAdd)