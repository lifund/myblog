import React from "react";

class MenuButton extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            menuIcon_1_ClassName: 'menuIcon_1',
            menuIcon_2_ClassName: 'menuIcon_2',
            menuIcon_3_ClassName: 'menuIcon_3',
        }
    }
    render(){
        return React.createElement(
            'svg',
            {
            className:'LeftPanel_menuButton',
            onClick:()=>{this.props.handleMenuButtonClick();},
            width:"28",
            height:"28",
            viewBox:"0 0 28 28",
            fill:"none",
            xmlns:"http://www.w3.org/2000/svg"
            },
            [
                React.createElement(
                    'g',
                    {key:1,clipPath:"url(#clip0)"},
                    [
                        React.createElement(
                            'rect',
                            {
                            key:1,
                            className: 'menuIcon_1 menuIcon_1_open_'+(this.props.LeftPanel_open).toString(),
                            x:'-4',
                            y:'5',
                            width:'36',
                            height:'2',
                            fill:'white'
                            }
                        ),
                        React.createElement(
                            'rect',
                            {
                            key:2,
                            className: 'menuIcon_2 menuIcon_2_open_'+(this.props.LeftPanel_open).toString(),
                            x:'-4',
                            y:'13',
                            width:'36',
                            height:'2',
                            fill:'white'
                            }
                        ),
                        React.createElement(
                            'rect',
                            {
                            key:3,
                            className: 'menuIcon_3 menuIcon_3_open_'+(this.props.LeftPanel_open).toString(),
                            x:'-4',
                            y:'21',
                            width:'36',
                            height:'2',
                            fill:'white'
                            }
                        )
                    ]
                ),
                React.createElement(
                    'defs',
                    {key:2},
                    React.createElement(
                        'clipPath',
                        {
                        id:"clip0"
                        },
                        React.createElement(
                            'rect',
                            {
                            width:"28",
                            height:"28",
                            fill:"white"
                            }
                        )
                    )
                )
            ]
        )
    }
}

export default MenuButton

// <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
// <g clip-path="url(#clip0)">
// <rect x="-4" y="13" width="36" height="2" fill="#C4C4C4"/>
// <rect x="-4" y="21" width="36" height="2" fill="#C4C4C4"/>
// </g>
// <defs>
// <clipPath id="clip0">
// <rect width="28" height="28" fill="white"/>
// </clipPath>
// </defs>
// </svg>
