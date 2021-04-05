import React from "react";

class LeftPanelSearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputValue : ''
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.findKeywordFromURLQuery = this.findKeywordFromURLQuery.bind(this);
        this.encodeURLQueryParams = this.encodeURLQueryParams.bind(this);
        this.decodeURLQueryParams = this.decodeURLQueryParams.bind(this);
    }
    // HANDLERS
    handleKeyPress(event){
        if(event.key==='Enter'){
            if(event.target.value.trim()!==""){
                event.target.blur();
                this.setState({
                    inputValue: event.target.value
                },()=>{
                    window.location.href = "http://$LOCAL_ADDRESS$:$LOCAL_PORT$/search?keyword="+encodeURIComponent(this.state.inputValue.trim())
                });
            }
        }else{
            this.setState({
                inputValue: event.target.value
            });
        }
    }
    findKeywordFromURLQuery(queryString) {
        var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            if(decodeURIComponent(pair[0])==='keyword'){
                return decodeURIComponent(pair[1]);
            }
        }
        return ''
    }
    encodeURLQueryParams(params){
    }
    decodeURLQueryParams(){
    }
    // THIS COMPONENT STATE CHANGE
    componentDidMount(){
    }
    componentDidUpdate(){
    }

    // RENDER
    render(){
        return React.createElement(
            'li',
            {className:'LeftPanelSearch'},
            [
                React.createElement(
                    'input',
                    {
                        key:1,
                        className:'LeftPanelSearchInput',
                        type:'search',
                        placeholder:'Search',
                        onKeyPress:(ev)=>{this.handleKeyPress(ev)},
                        defaultValue:this.findKeywordFromURLQuery(this.props.activeQuery)
                    },
                ),
                React.createElement(
                    'img',
                    {
                    key:2,
                    src:'public/search_clear.png'
                    }
                )
            ]
        )
    }
}

export default LeftPanelSearch

