import React from "react";
import ContainerFeatured from "./ContainerFeatured.js"

class Container extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'Container'},
            [
                React.createElement(
                    'h2',
                    {key:'Container_title'},
                    this.props.title
                ),
                React.createElement(
                    'div',
                    {key:1},
                    'Recents'
                )
            ]
        )
    }
}

export default Container