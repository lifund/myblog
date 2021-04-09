import React from "react";
import ArticleCard from "./ArticleCard.js";

class ArticleContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            card_contents : [],
            card_isLoaded : false,
            card_error : null
        }
    }
    componentDidMount(){
        fetch('/articleAPI?featured=false')
        .then(
            (res)=>{
                return res.json()
            }
        )
        .then(
            (res)=>{ 
                this.setState({
                    card_isLoaded: true,
                    card_contents: res.card_data
                });
            },
            (err)=>{
                this.setState({
                    card_isLoaded: true,
                    card_error:  err
                })
            }
        );
    }
    render(){
        if (this.state.card_error){
            return React.createElement('div',{},this.state.card_error)
        }
        else if (!this.state.card_isLoaded){
            return React.createElement('div',{},'Loading...')
        }
        else{
            return (
                React.createElement(
                    'div',
                    {className: 'ArticleContainer'},
                    [
                        React.createElement(
                            'h2',
                            {key:'ArticleContainer_title',className:'ArticleContainer_title'},
                            this.props.title
                        ),
                        this.state.card_contents.map((content,mapIndex)=>{
                            return React.createElement(
                                ArticleCard,
                                {
                                key:mapIndex,content:content,
                                setActiveHistory:this.props.setActiveHistory
                                }
                            )                    
                        }),
                        React.createElement(
                            'p',
                            {key:'ArticleContainer_more',className:'ArticleContainer_more'},
                            'load more'
                        )
                    ]
                )
            );
        }
    }
}

export default ArticleContainer