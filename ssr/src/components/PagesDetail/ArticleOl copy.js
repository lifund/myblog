import React from "react";

class ArticleOl extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'ArticleOl'},
            'Article Contents here'
        )
    }
}

export default ArticleOl