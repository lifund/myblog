import React from "react";

class ArticleFeatured_card extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            React.createElement(
                'div',
                {className:'ArticleFeatured_card'},
                this.props.content.title
            )
        )
    }
}

export default ArticleFeatured_card