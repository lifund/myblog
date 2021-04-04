import React from "react";

class LeftPanelSocial extends React.Component {
    constructor(props){
        super(props);
        // this.state = { }
    }
    render(){
        return React.createElement(
            'div',
            {className:'LeftPanelSocial'},
            [
                React.createElement(
                    'a',
                    {key:1,href:'https://github.com/lifund',target:'_blank'},
                    React.createElement(
                        'img',
                        {src:'public/social_github.png'}
                    )
                ),
                React.createElement(
                    'a',
                    {key:2,href:'https://npmjs.com/~lifund',target:'_blank'},
                    React.createElement(
                        'img',
                        {src:'public/social_npm.png'}
                    )
                ),
                React.createElement(
                    'a',
                    {key:3,href:'https://www.youtube.com/channel/UCqhP79X8xQhqt49FTIUSGNA',target:'_blank'},
                    React.createElement(
                        'img',
                        {src:'public/social_youtube.png'}
                    )
                )
            ]
        )
    }
}

export default LeftPanelSocial

