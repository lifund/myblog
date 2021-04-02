import React from "react";

class TestCounter extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            count: 0
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState({
            count:this.state.count+1
        })
    }
    render(){
        if (this.state.count >= 5){
            throw new Error('ERR: count can\'t beover 5') 
        }
        return (
            React.createElement(
                'button',
                {
                    onClick: ()=>{ this.handleClick(); }
                },
                ['+610s will throw hellorror'+this.state.count]
            )
        );
    }
}

export default TestCounter