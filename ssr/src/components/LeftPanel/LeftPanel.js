import React from "react";
import LeftPanelLogo from "./LeftPanelLogo.js";
import LeftPanelSearch from "./LeftPanelSearch.js";
import LeftPanelNav from "./LeftPanelNav.js";
import LeftPanelSocial from "./LeftPanelSocial.js";

class LeftPanel extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return React.createElement(
            'div',
            null,
            [
                React.createElement(
                    LeftPanelLogo,
                    {key:1}
                ),
                React.createElement(
                    LeftPanelSearch,
                    {key:2}
                ),
                React.createElement(
                    LeftPanelNav,
                    {
                    key:3,
                    activeRoute:this.props.activeRoute,
                    setActiveRoute:this.props.setActiveRoute
                    }
                ),
                React.createElement(
                    'button',
                    {key:4},
                    '# Select Tags'
                ),
                React.createElement(
                    LeftPanelSocial,
                    {key:5}
                )
            ]
        )
    }
}

export default LeftPanel