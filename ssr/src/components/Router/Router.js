import React from "react";
import Route from "./Route.js";

class Router extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return this.props.children.filter((el)=>{
            if(
                el.props.route===this.props.activeRoute
                || el.type!==Route
            ) return el;
        })
    }
}

export default Router