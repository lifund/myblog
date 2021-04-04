import React from "react";

class Route extends React.Component {
    constructor(props){
        super(props);
        // this.state = { }
    }
    render(){
        return this.props.children
    }
}

export default Route