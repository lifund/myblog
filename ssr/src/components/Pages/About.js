import React from "react";
import ArticleContainerFeatured from "../Containers/ArticleContainerFeatured.js"
import ArticleContainer from "../Containers/ArticleContainer.js"

class About extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'About'},
            'About ME!'
        )
    }
}

export default About