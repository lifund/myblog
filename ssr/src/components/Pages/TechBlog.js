import React from "react";
import ArticleContainerFeatured from "../Containers/ArticleContainerFeatured.js"
import ArticleContainer from "../Containers/ArticleContainer.js"

class TechBlog extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return React.createElement(
            'div',
            {className:'TechBlog'},
            [
                React.createElement(
                    'h1',
                    {key:1,className:'TechBlog_title'},
                    'Tech Blog'
                ),
                React.createElement(
                    ArticleContainerFeatured,
                    {
                    key:2,
                    title:'Featured Articles',  
                    setActiveHistory: this.props.setActiveHistory,
                    }
                ),
                React.createElement(
                    ArticleContainer,
                    {
                    key:3,
                    title:'Recent Articles',
                    setActiveHistory: this.props.setActiveHistory
                    }
                )
            ]
        )
    }
}

export default TechBlog
