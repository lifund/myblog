import React from "react";

import ErrorBoundary from "./Error/ErrorBoundary.js";
import TestCounter from "./Error/TestCounter.js";

import Router from "./Router/Router.js";
import Route from "./Router/Route.js";

import LeftPanel from "./LeftPanel/LeftPanel.js";

import Search from "./Search/Search.js";
import TechBlog from "./ContentsPage/TechBlog.js";
import About from "./ContentsPage/About.js";
import Portfolio from "./ContentsPage/Portfolio.js";
import Shop from "./ContentsPage/Shop.js";

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            activeRoute: '',
            activeQuery: ''
        }
    }

    componentDidMount () {
        this.setState({
            activeRoute: window.location.pathname,
            activeQuery: window.location.search
        });
    }

    setActiveRoute = (newRoute) => {
        this.setState({
            activeRoute: newRoute
        },()=>{
            window.history.pushState({},'',newRoute)
        })
    }

    render(){
        return React.createElement(
            'div',
            {className:'App'},
            React.createElement(
                ErrorBoundary,
                null,
                React.createElement(
                    Router,
                    {activeRoute:this.state.activeRoute},
                    [
                        React.createElement(
                            LeftPanel,
                            {
                            key:'LeftPanel',
                            activeRoute:this.state.activeRoute,
                            activeQuery:this.state.activeQuery,
                            setActiveRoute:this.setActiveRoute,
                            }
                        ),
                        React.createElement(
                            Route,
                            {key:'/techblog',route:'/techblog'},
                            React.createElement(TechBlog)
                        ),
                        React.createElement(
                            Route,
                            {key:'/portfolio',route:'/portfolio'},
                            React.createElement(Portfolio)
                        ),
                        React.createElement(
                            Route,
                            {key:'/about',route:'/about'},
                            React.createElement(About)
                        ),
                        React.createElement(
                            Route,
                            {key:'/shop',route:'/shop'},
                            React.createElement(Shop)
                        ),
                        React.createElement(
                            Route,
                            {key:'/search',route:'/search'},
                            React.createElement(
                                Search,
                                {query:this.state.activeQuery}
                            )
                        )
                    ]
                )
            )
        );
    }
}

export default App