import React from "react";

class ArticleTable extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'ArticleTable'},
            'Article Contents here'
        )
    }
}

export default ArticleTable