import React from "react";
import Article from "./Article/Article.js";
import ErrorBoundary from "./Error/ErrorBoundary.js";
import TestCounter from "./Error/TestCounter.js";

class App extends React.Component {
    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        return React.createElement(
            'div',
            {className:'App'},
            React.createElement(
                ErrorBoundary,
                null,
                React.createElement(
                    Article,
                    {key:1}
                ),
                React.createElement(
                    TestCounter,
                    {key:3}
                )
            )
        );
    }
}

export default App