import React from "react";
import ArticleContainerFeatured from "../Containers/ArticleContainerFeatured.js"
import ArticleContainer from "../Containers/ArticleContainer.js"

class Shop extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'Shop'},
            'SAAS modules, little products'
        )
    }
}

export default Shop