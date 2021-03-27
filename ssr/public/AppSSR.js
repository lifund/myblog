import React from "react";
import Article from "./components/Article/Article.js"

class App extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return React.createElement(
            'div',
            {className:'App'},
            [
                React.createElement(
                    Article,
                    {key:1}
                ),
                React.createElement(
                    'div',
                    {key:2}
                )
            ]
        )
    }
}

export default App