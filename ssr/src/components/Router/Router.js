import React from "react";

class Router extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            activeRoute: '/techblog'
        }
    }
    render(){
        React.createElement(
            'div',
            null,
            'router'
        )
    }
}

export default Router