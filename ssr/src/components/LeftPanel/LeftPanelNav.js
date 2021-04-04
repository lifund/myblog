import React from "react";

class LeftPanelNav extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return React.createElement(
            'div',
            {className:'LeftPanelNav'},
            [
                {route:'/techblog',name:'Tech Blog'},
                {route:'/portfolio',name:'Portfolio'},
                {route:'/about',name:'About'},
                {route:'/shop',name:'Shop'}
            ].map((navButton,mapIndex)=>{
                if(navButton.route === this.props.activeRoute){
                    return React.createElement(
                        'button',
                        {  
                            key:mapIndex,
                            className:'nav_activeButton',
                            onClick:()=>{this.props.setActiveRoute(navButton.route);}
                        },
                        navButton.name
                    )
                }else{
                    return React.createElement(
                        'button',
                        {  
                            key:mapIndex,
                            onClick:()=>{this.props.setActiveRoute(navButton.route);}
                        },
                        navButton.name
                    )
                }
            })
        )
    }
}

export default LeftPanelNav

