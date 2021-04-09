import React from "react";

class ArticleQuote extends React.Component {
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

export default ArticleQuote