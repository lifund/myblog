import React from "react";

class ArticleVideo extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'ArticleVideo'},
            'Article Contents here'
        )
    }
}

export default ArticleVideo