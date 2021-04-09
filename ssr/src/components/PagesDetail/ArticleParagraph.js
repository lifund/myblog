import React from "react";

class ArticleParagraph extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'ArticleParagraph'},
            'Article Contents here'
        )
    }
}

export default ArticleParagraph