import React from 'react';
import { connect } from 'react-redux';
import { unsplashService } from '../services/unsplash.service'

import { updateBoard, setCurrBoard } from '../store/board.action'

class _ChangeBG extends React.Component {
    state = {
        keyword: '',
        pics: []
    }

    async componentDidMount() {
        await this.getPics()
    }

    getPics = async () => {
        try {
            const pics = await unsplashService.getPreviewImgs('roads')
            this.setState({ pics })
        } catch (err) {
            console.log(err)
        }
    }

    onSearch = async () => {
        try {
            const pics = await unsplashService.search(this.state.keyword)
            this.setState({ pics })
        } catch (err) {
            console.log(err)
        }
    }

    setBoardBG = (backGround) => {
        const { board, setCurrBoard } = this.props
        const style = (backGround[0] === '#') ? { bgColor: backGround } : { bgImg: backGround }
        const boardToUpdate = {...board, style}
        setCurrBoard(boardToUpdate)
    }

    handleChange = ({ target }) => {
        const { value } = target
        this.setState({ keyword: value }, () => {
            if (value.length >= 3) this.onSearch()
            else if (value.length === 0) this.getPics()
        })
    }

    render() {
        const colors =  ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf', '#00c2e0', '#51e898', '#ff78cb', '#344563']


        const { keyword, pics } = this.state
        return (
            <div className="change-bg">
                <input type="text" className="input-style" value={keyword} onChange={this.handleChange} placeholder="Search Images..." />
                <div className="images">
                    {pics.map(pic =>
                        <div key={pic.id} className="img-container" onClick={() => this.setBoardBG(pic.full)}>
                            <img src={pic.preview} alt={pic.id} />
                        </div>
                    )}
                </div>
                <hr />
                <div className="colors">
                    {colors.map((color, idx) =>
                        <div style={{ backgroundColor: `${color}` }} key={idx} className="color-container" onClick={() => this.setBoardBG(color)}></div>
                    )}
                </div>
            </div>
        )
    }
}

function mapStateToProps({boardModule}) {
    return {
        board: boardModule.currBoard,
    };
}
const mapDispatchToProps = {
    updateBoard,
    setCurrBoard
};

export const ChangeBG = connect(mapStateToProps, mapDispatchToProps)(_ChangeBG);