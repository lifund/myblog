import React from "react";

class ArticleCardFeatured extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return React.createElement(
            'div',
            {
            className:'ArticleCardFeatured',
            onClick:(ev)=>{
                if(ev.target.className !== 'ArticleCardFeatured_tag'){
                    this.props.setActiveHistory('/article','?id='+this.props.content.id,'Article|'+this.props.content.title);
                }
            }
            },
            [
                React.createElement(
                    'div',
                    {key:1, className:'ArticleCardFeatured_date'},
                    this.props.content.date
                ),
                React.createElement(
                    'div',
                    {key:2, className:'ArticleCardFeatured_title'},
                    this.props.content.title
                ),
                React.createElement(
                    'div',
                    {key:3,className:'ArticleCardFeatured_tagContainer'},
                    this.props.content.tags.map((tag,mapIndex)=>{
                        return React.createElement(
                            'div',
                            {
                            key:mapIndex,
                            className:'ArticleCardFeatured_tag',
                            onClick:(ev)=>{
                                this.props.setActiveHistory('/search','?tag='+tag,'Search|'+tag);
                            }
                            },
                            '# '+tag
                        )
                    })
                )
            ]
        )
    }
}

export default ArticleCardFeatured
