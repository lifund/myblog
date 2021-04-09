import React from "react";

class ArticleHeader extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'ArticleHeader'},
            'Article Contents here'
        )
    }
}

export default ArticleHeader