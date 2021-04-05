import React from "react";

class Card extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'TechBlog'},
            [
                React.createElement(
                    'div',
                    {},
                    'CARD'
                )
            ]
        )
    }
}

export default Card