import React from "react";

import ErrorBoundary from "./Error/ErrorBoundary.js";
import TestCounter from "./Error/TestCounter.js";

import Router from "./Router/Router.js";
import Route from "./Router/Route.js";

import LeftPanel from "./LeftPanel/LeftPanel.js";
// Pages
import Search from "./Search/Search.js";
import TechBlog from "./Pages/TechBlog.js";
import About from "./Pages/About.js";
import Portfolio from "./Pages/Portfolio.js";
import Shop from "./Pages/Shop.js";

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            activeHistory: {
                activeRoute: '_ACTIVE_PATH_',
                activeQuery: '_ACTIVE_QUERY_',
                activeTitle: '_ACTIVE_TITLE_'
            },
            ssrProps: this.props.ssrProps
        }
        this.setActiveHistory = this.setActiveHistory.bind(this)

    }
    componentDidMount () {
        window.addEventListener('popstate', (event) => {
            this.setState({
                activeHistory:{
                    activeRoute: document.location.pathname,
                    activeQuery: document.location.search,
                    activeTitle: document.title
                }
            })
        });
    }

    // HANDLER
    setActiveHistory (newRoute,newQuery,newTitle) {
        this.setState({
            activeHistory:{
                activeRoute: newRoute,
                activeQuery: newQuery,
                activeTitle: newTitle
            }
        },()=>{
            window.history.pushState({},newTitle,newRoute+newQuery)
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
                    {activeRoute:this.state.activeHistory.activeRoute},
                    [
                        React.createElement(
                            LeftPanel,
                            {
                            key:'LeftPanel',
                            setActiveHistory:this.setActiveHistory,
                            activeHistory:this.state.activeHistory
                            }
                        ),
                        React.createElement(
                            Route,
                            {key:'/about',route:'/about'},
                            React.createElement(
                                About
                            )
                        ),
                        React.createElement(
                            Route,
                            {key:'/techblog',route:'/techblog'},
                            React.createElement(
                                TechBlog,
                                {
                                setActiveHistory:this.setActiveHistory,
                                activeHistory:this.state.activeHistory
                                }
                            )
                        ),
                        React.createElement(
                            Route,
                            {key:'/portfolio',route:'/portfolio'},
                            React.createElement(
                                Portfolio,
                                {
                                setActiveHistory:this.setActiveHistory,
                                activeHistory:this.state.activeHistory
                                }
                            )
                        ),
                        React.createElement(
                            Route,
                            {key:'/shop',route:'/shop'},
                            React.createElement(
                                Shop,
                                {
                                setActiveHistory:this.setActiveHistory,
                                activeHistory:this.state.activeHistory
                                }
                            )
                        ),
                        React.createElement(
                            Route,
                            {key:'/search',route:'/search'},
                            React.createElement(
                                Search,
                                {
                                setActiveHistory:this.setActiveHistory,
                                activeHistory:this.state.activeHistory
                                }
                            )
                        ),
                        React.createElement(
                            Route,
                            {key:'/article',route:'/article'},
                            React.createElement(
                                'div',
                                {},
                                'ArticleArticleArticleArticleArticleArticleArticle'
                            )
                        )
                    ]
                )
            )
        );
    }
}

export default App
