import React from "react";

class Article extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'Article'},
            'Article Contents here'
        )
    }
}

export default Article