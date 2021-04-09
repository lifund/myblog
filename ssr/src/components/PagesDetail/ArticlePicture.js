import React from "react";

class ArticlePicture extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'ArticlePicture'},
            'Article Contents here'
        )
    }
}

export default ArticlePicture