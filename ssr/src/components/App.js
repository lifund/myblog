import React from "react";
import Article from "./Article/Article.js";
import ErrorBoundary from "./Error/ErrorBoundary.js";
import TestCounter from "./Error/TestCounter.js";
import Router from "./Router/Router.js";
import Route from "./Router/Route.js";
import LeftPanel from "./LeftPanel/LeftPanel.js";

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            activeRoute: ''
        }
    }

    componentDidMount () {
        this.setState({
            activeRoute: window.location.pathname
        })
    }

    setActiveRoute = (newRoute) => {
        this.setState({
            activeRoute: newRoute
        })
        window.history.pushState({},'',newRoute)
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
                            setActiveRoute:this.setActiveRoute
                            }
                        ),
                        React.createElement(
                            Route,
                            {key:'/techblog',route:'/techblog'},
                            '/techblog\n'
                        ),
                        React.createElement(
                            Route,
                            {key:'/portfolio',route:'/portfolio'},
                            '/portfolio\n'
                        ),
                        React.createElement(
                            Route,
                            {key:'/about',route:'/about'},
                            '/about\n'
                        ),
                        React.createElement(
                            Route,
                            {key:'/shop',route:'/shop'},
                            '/shop\n'
                        )
                    ]
                )
            )
        );
    }
}

export default App