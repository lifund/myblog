import React from "react";

class ArticleUl extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'ArticleUl'},
            'Article Contents here'
        )
    }
}

export default ArticleUl