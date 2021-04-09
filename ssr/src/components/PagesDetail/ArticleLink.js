import React from "react";

class ArticleLink extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'ArticleLink'},
            'Article Contents here'
        )
    }
}

export default ArticleLink