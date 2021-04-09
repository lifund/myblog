import React from "react";
import ArticleContainerFeatured from "../Containers/ArticleContainerFeatured.js"
import ArticleContainer from "../Containers/ArticleContainer.js"

class Portfolio extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'Portfolio'},
            'Portfolio Contents'
        )
    }
}

export default Portfolio