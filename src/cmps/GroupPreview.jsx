import React from 'react';

export class GroupPreview extends React.Component {
    state = {
        title: ''
    }

    componentDidMount(){
        this.setState({...this.state, title: this.props.group.title});
    }

    render() {
        //Tasks Preview TBA
        const {title} = this.state;
        console.log(title);
        return (
            <>Temp</>
        )
    }
}