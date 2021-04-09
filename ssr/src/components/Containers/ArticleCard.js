import React from "react";

class ArticleCard extends React.Component {
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return React.createElement(
            'div',
            {
            className:'ArticleCard',
            onClick:(ev)=>{
                if(ev.target.className !== 'ArticleCard_tag'){
                    this.props.setActiveHistory('/article','?id='+this.props.content.id,'Article|'+this.props.content.title);
                }
            }
            },
            [
                React.createElement(
                    'div',
                    {key:1, className:'ArticleCard_date'},
                    this.props.content.date
                ),
                React.createElement(
                    'div',
                    {key:2, className:'ArticleCard_title'},
                    this.props.content.title
                ),
                React.createElement(
                    'div',
                    {key:3,className:'ArticleCard_tagContainer'},
                    this.props.content.tags.map((tag,mapIndex)=>{
                        return React.createElement(
                            'div',
                            {
                            key:mapIndex,
                            className:'ArticleCard_tag',
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

export default ArticleCard