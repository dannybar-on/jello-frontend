import React from 'react';
import { IoIosArrowBack, IoMdClose } from 'react-icons/io';
import { connect } from 'react-redux';
import { ChangeBG } from './ChangeBG';
import { CgCreditCard } from 'react-icons/cg';
import {HiOutlineTrash} from 'react-icons/hi';
import {RemoveBoard} from './RemoveBoard';

import { withRouter } from 'react-router'



class _SideMenu extends React.Component {
    state = {
        currViewIdx: -1
    }

    _cmpsToRender = [{ id: 'c101', title: 'Change Background', icon: <CgCreditCard />, component: ChangeBG },
                    {  id: 'c102', title: 'Remove Board', icon: <HiOutlineTrash  />, component: RemoveBoard}]
    

    componentDidMount() {
        if (this.props.location.search) this.setState((prevState) => ({ ...prevState, currViewIdx: 1 }))
    }

    componentWillUnmount() {
        this.setState((prevState) => ({ ...prevState, currViewIdx: -1 }))
    }

    onSelectView = (viewId) => {
        this.setState((prevState) => ({ ...prevState, currViewIdx: viewId }))
    }

    getViewById = () => {
        const { currViewIdx } = this.state
        const currView = this._cmpsToRender[currViewIdx]
        return currView.component
    }

    onBack = () => {
        this.setState((prevState) => ({ ...prevState, currViewIdx: -1 }))
    }

    _CurrView = () => {
        const props= this.props
        const { component: Component } = this._cmpsToRender[this.state.currViewIdx]
        return <Component {...props} />
    }

    _DefaultView = () => {
        return <div>
            <ul className="default-menu clean-list">
                {this._cmpsToRender.map((cmp, idx) =>
                    <li onClick={() => this.onSelectView(idx)} key={cmp.id}>
                        <div className="icon">{cmp.icon}</div>
                        <p>{cmp.title}</p>
                    </li>
                )}
            </ul>
            <hr />
        </div>
    }

    render() {
        const { toggleMenu } = this.props
        const { currViewIdx } = this.state
        return (
            <div className={`side-menu ${(this.props.isMenuOpen) ? 'menu-open' : ''}`}>
                <div className="title">
                    <span className={`back-btn ${(currViewIdx !== -1) ? 'show-btn' : ''} `} onClick={() => this.onBack()}><IoIosArrowBack /></span>
                    <p className="menu-title" >{currViewIdx === -1 ? 'Menu' : this._cmpsToRender[currViewIdx].title}</p>
                    <span className="close-btn" onClick={toggleMenu}><IoMdClose /></span>
                </div>
                <hr />
                <div className="rendered-cmp">
                    {currViewIdx === -1 ? <this._DefaultView /> : <this._CurrView />}
                </div>
            </div >
        )
    }
}

function mapStateToProps({boardModule}) {
    return {
        board: boardModule.currBoard,
    }
}
const mapDispatchToProps = {
}

export const SideMenu = connect(mapStateToProps, mapDispatchToProps)(withRouter(_SideMenu));
