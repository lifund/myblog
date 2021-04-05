import React from "react";
import ContainerFeatured from "../ArticleContainer/ContainerFeatured.js"
import Container from "../ArticleContainer/Container.js"

class TechBlog extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'TechBlog'},
            [
                React.createElement(
                    ContainerFeatured,
                    {key:1,title:'Featured Articles'}
                ),
                React.createElement(
                    Container,
                    {key:2,title:'Recent Articles'}
                )
            ]
        )
    }
}

export default TechBlog