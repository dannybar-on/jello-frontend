import React from 'react';
import {connect} from 'react-redux';
import {unspashService} from '../services/unsplash.service.js';

import {updateBoard} from '../store/board.action.js';

class _ChangeBG extends React.Component { 
    state = {
        keyword: '',
        imgs: []
    }

    

    render() {
        return <label>I'm in sidemenu-background</label>
    }
}
function mapStateToProps({boardModule}) {
    return {
        board: boardModule.currBoard,
    };
}
const mapDispatchToProps = {
    updateBoard,
};

export const ChangeBG = connect(mapStateToProps, mapDispatchToProps)(_ChangeBG);