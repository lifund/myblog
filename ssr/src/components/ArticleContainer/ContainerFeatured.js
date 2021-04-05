import React from "react";

class ContainerFeatured extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            card_contents : [],
            card_isLoaded : false,
            card_error : null
        }
    }
    componentDidMount(){
        fetch('/articleAPI?featured=true')
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
                    {className: 'ContainerFeatured'},
                    [
                        React.createElement(
                            'h2',
                            {key:'ContainerFeatured_title'},
                            this.props.title
                        ),
                        this.state.card_contents.map((content,mapIndex)=>{
                            return React.createElement(
                                'p',
                                {key:mapIndex},
                                'date: '+content.date
                            )                    
                        })
                    ]
                )
            );
        }
    }
}

export default ContainerFeatured