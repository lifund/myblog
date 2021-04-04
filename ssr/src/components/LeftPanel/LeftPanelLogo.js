import React from "react";

class LeftPanelLogo extends React.Component {
    constructor(props){
        super(props);
        // this.state = { }
    }
    render(){
        return React.createElement(
            'picture',
            {},
            [
                React.createElement(
                    'source',
                    {key:1,srcSet:"public/logo.png",media:"(min-width: 590px)"}
                ),
                React.createElement(
                    'source',
                    {key:2,srcSet:"public/logo_mobile.png",media:"(max-width: 590px)"}
                ),
                React.createElement(
                    'img',
                    {key:3,src:"public/logo_mobile.png",alt:'{"Jangwon":"Code"}'}
                )
            ]
        )
    }
}

export default LeftPanelLogo

