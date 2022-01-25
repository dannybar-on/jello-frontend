import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {IoIosArrowBack, IoMdClose} from 'react-icons/io';
import { CgCreditCard } from 'react-icons/cg';
import {ChangeBG} from './ChangeBG.jsx'

class _SideMenu extends React.Component {
    state = {
        currItemIdx: -1,
    }

    _cmpsToRender = [{id: 'm101', title: 'Change Background', icon: <CgCreditCard />, component: ChangeBG}]

    onSelectItem = (itemId) => {
        this.setState((prevState) => ({...prevState, currItemIdx: itemId}))
    }

    getItemById = () => {
        const {currItemIdx} = this.state;
        const currItem = this._cmpsToRender[currItemIdx];
        console.log('selected item', currItem);
        return currItem.component;
    }

    onBack = () => {
        this.setState((prevState) => ({...prevState, currItemIdx: -1}))
    }

    _CurrItem = () => {
        const props= this.props
        const { component: Component } = this._cmpsToRender[this.state.currItemIdx]
        return <Component {...props} />
    }

    _DefaultItem = () => {
        return <div>
            <ul className="default-menu clean-list">
                {this._cmpsToRender.map((cmp, idx) =>
                    <li onClick={() => this.onSelectItem(idx)} key={cmp.id}>
                        <div className="icon">{cmp.icon}</div>
                        <p>{cmp.title}</p>
                    </li>
                )}
            </ul>
        </div>
    }  

    render() {
        const { toggleMenu, isMenuOpen } = this.props;
        const {currItemIdx} = this.state;
        return (
            <div className={`side-menu ${(isMenuOpen) ? 'menu-open' : ''}`}>
                <div className="title">
                    <span className={`back-btn ${(currItemIdx !== -1) ? 'show-btn' : ''}`} onClick={() => this.onBack()}><IoIosArrowBack/></span>
                    <p className="menu-title">{(currItemIdx === -1) ? 'Menu' : this._cmpsToRender[currItemIdx].title}</p>
                    <span className="close-btn" onClick={toggleMenu}><IoMdClose/></span>
                </div>
                <hr />
                <div className="rendered-item">
                    {(currItemIdx === -1) ? <this._DefaultItem/> : <this._currItem />}
                    {/* <ChangeBG /> */}
                </div>
            </div>
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



export const SideMenu = connect(mapStateToProps, mapDispatchToProps)(withRouter(_SideMenu))