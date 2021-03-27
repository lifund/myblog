import React from "react";
import ArticleFeatured from "./ArticleFeatured.js"
import ArticleRecents from "./ArticleRecents.js"

class Article extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'Article'},
            [
                React.createElement(
                    ArticleFeatured,
                    {key:1}
                ),
                React.createElement(
                    ArticleRecents,
                    {key:2}
                )
            ]
        )
    }
}

export default Article