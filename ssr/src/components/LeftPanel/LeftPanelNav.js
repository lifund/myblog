import React from "react";

class LeftPanelNav extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(newRoute,newTitle){
        this.props.handleMenuButtonClick();
        this.props.setActiveHistory(newRoute,'',newTitle);
        document.getElementsByClassName('LeftPanelSearchInput')[0].value='';
    }

    render(){
        return React.createElement(
            'li',
            {className:'LeftPanelNav'},
            [
                {route:'/about',name:'About'},
                {route:'/techblog',name:'Tech Blog'},
                {route:'/portfolio',name:'Portfolio'},
                {route:'/shop',name:'Shop'}
            ].map((navButton,mapIndex)=>{
                // active button
                if(navButton.route === this.props.activeRoute){
                    return React.createElement(
                        'button',
                        {  
                            key:mapIndex,
                            className:'LeftPanelNav_activeButton',
                            onClick:()=>{this.handleClick(navButton.route,navButton.name+'|Jangwon');}
                        },
                        navButton.name
                    )
                }else{
                    return React.createElement(
                        'button',
                        {  
                            key:mapIndex,
                            className:'LeftPanelNav_button',
                            onClick:()=>{this.handleClick(navButton.route,navButton.name+'|Jangwon');}
                        },
                        navButton.name
                    )
                }
            })
        )
    }
}

export default LeftPanelNav

