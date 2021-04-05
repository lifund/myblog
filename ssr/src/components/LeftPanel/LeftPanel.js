import React from "react";
import LeftPanelLogo from "./LeftPanelLogo.js";
import LeftPanelSearch from "./LeftPanelSearch.js";
import LeftPanelNav from "./LeftPanelNav.js";
import LeftPanelSocial from "./LeftPanelSocial.js";
import MenuButton from "./MenuButton.js";

class LeftPanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeRoute: this.props.activeRoute,
            LeftPanel_ClassName: 'LeftPanel',
            LeftPanel_open: false
        }
        this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this);
    }

    handleMenuButtonClick(){
        this.setState({
            LeftPanel_open: !this.state.LeftPanel_open,
            LeftPanel_ClassName: 'LeftPanel LeftPanel_open_'+(!this.state.LeftPanel_open).toString()
        })
    }

    componentDidMount(){
        // Prevent Initial Animation (look css : body.preload * ...)
        setTimeout(function(){
            document.body.className="";
        },500);
    }

    render(){
        return React.createElement(
            'div',
            {className: this.state.LeftPanel_ClassName},
            [
                React.createElement(
                    'ul',
                    {
                    key:1,
                    className:'LeftPanel_topBar'
                    },
                    [
                        React.createElement(
                            'li',
                            {
                            key:1,
                            className:'LeftPanel_logo_container',
                            },
                            React.createElement(
                                LeftPanelLogo,
                            ),
                        ),
                        React.createElement(
                            'li',
                            {
                            key:2,
                            className:'LeftPanel_menuButton_container',
                            },
                            React.createElement(
                                MenuButton,
                                {
                                handleMenuButtonClick:this.handleMenuButtonClick,
                                LeftPanel_open:this.state.LeftPanel_open,
                                }
                            )
                        )
                    ]
                ),
                React.createElement(
                    'ul',
                    {
                    key:2,
                    className:'LeftPanel_menuContainer'
                    },
                    [
                        React.createElement(
                            LeftPanelSearch,
                            {
                            key:2,
                            className:'LeftPanelSearch',
                            setActiveRoute:this.props.setActiveRoute,
                            activeQuery:this.props.activeQuery
                            }
                        ),
                        React.createElement(
                            LeftPanelNav,
                            {
                            key:3,
                            className:'LeftPanelNav',
                            setActiveRoute:this.props.setActiveRoute,
                            activeRoute:this.props.activeRoute,
                            handleMenuButtonClick:this.handleMenuButtonClick
                            }
                        ),
                        React.createElement(
                            LeftPanelSocial,
                            {
                            key:5,
                            className:'LeftPanelSocial'
                            }
                        )
                    ]
                )
            ]
        )
    }
}

export default LeftPanel