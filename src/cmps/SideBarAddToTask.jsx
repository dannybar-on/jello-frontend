import React from 'react'



export class SideBarAddToTask extends React.Component {

state={
isPopoverOpen:false,

}

togglePopOver = () => {
    this.setState({ isPopoverOpen: !this.state.isPopoverOpen })
}


    render() {
        const {isPopoverOpen}= this.state
        const { item } = this.props
        return (
            <>
                <button onClick={()=> this.togglePopOver()}
                 className="add-item-btn flex row align-center">
                    <span className="flex align-center">{item.icon}</span>
                    <p>{item.title}</p>
                </button>
                {isPopoverOpen && item.component}
            </>
        )
    }
}


