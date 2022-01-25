import React from 'react';


export class AddCover extends React.Component {

    state = {

        color: '#344563',

    };


    // componentDidMount() {
    //     const { label } = this.props
    //     if (label) this.setState({ label })

    // }

    handleColorChange = (color) => {
        this.setState({ color });
    };



    render() {
        const { color } = this.state;
        return (
            <section className="modal-cover-edit flex column">
                Cover
                <div className="size-container flex column">
                    <h4>Size</h4>
                    <div className="size-options flex">

                        <div className={`size-option half `} style={{ backgroundColor: color }}>
                            <div className="colored-half" ></div>
                            <div className="line-wrapper-half">
                                <div className="first-line"></div>
                                <div className="second-line"></div>
                                <div className="third-line flex">
                                    <div className="first-fragment"></div>
                                    <div className="second-fragment"></div>
                                </div>
                                <div className="circle"></div>
                            </div>
                        </div>

                        <div className={`size-option full `} data-size="full" style={{ backgroundColor: color }}>
                            <div className="line-wrapper-full">
                                <div className="first-line"></div>
                                <div className="second-line"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <h4>Select a color</h4>
                <div className="colors-container">
                    {labelColors.map((color, idx) => {
                        return <div key={idx} style={{ backgroundColor: color }}
                            className="color-div flex"
                            onClick={() => this.handleColorChange(color)}>
                            {/* {color === label.color && <span className="icon-sm"><MdDone /></span>} */}
                        </div>;
                    })}
                </div>



            </section >
        );
    }
}






const labelColors = ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf', '#00c2e0', '#51e898', '#ff78cb', '#344563'];

