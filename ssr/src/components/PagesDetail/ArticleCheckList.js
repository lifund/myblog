import React from "react";

class ArticleCheckList extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'ArticleCheckList'},
            'Article Contents here'
        )
    }
}

export default ArticleCheckList