import React from "react";

class ArticleCode extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'ArticleCode'},
            'Article Contents here'
        )
    }
}

export default ArticleCode