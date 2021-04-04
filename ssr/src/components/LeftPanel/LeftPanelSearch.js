import React from "react";

class LeftPanelSearch extends React.Component {
    constructor(props){
        super(props);
        // this.state = { }
    }
    render(){
        return React.createElement(
            'div',
            {className:'LeftPanelSearch'},
            [
                React.createElement(
                    'input',
                    {key:1,type:'text',placeholder:'Search'},
                ),
                React.createElement(
                    'span',
                    {key:2},
                    React.createElement(
                        'img',
                        {src:'public/search_clear.png'}
                    )
                )
            ]
        )
    }
}

export default LeftPanelSearch

