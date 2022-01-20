import React from 'react'



export class SideBarActions extends React.Component {

    render() {
        const { item } = this.props
        return (
            <div className="sidebar-actions">
                <button className="add-item-btn flex row">
                    <span>{item.icon}</span>
                    <p>{item.title}</p>
                </button>
            </div>
        )
    }
}


