import React from "react";

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchResponse:null,
            tagResponse:null,
            articleResponse:null,
            portfolioResponse:null
        }
        this.fetchSearchResult = this.fetchSearchResult.bind(this);
        this.findKeywordFromURLQuery = this.findKeywordFromURLQuery.bind(this);
    }

    // HANDLER
    fetchSearchResult() {
        const requestOptions = {
            method: 'GET',
        };
        fetch('http://_LOCAL_ADDRESS_:_LOCAL_PORT_/articleAPI'+this.props.activeHistory.activeQuery, requestOptions)
        .then(async response => {
            const data = await response.json();
            // error response
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            this.setState({ searchResponse: data.card_data })
        })
        .catch(error => {
            // this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    }
    
    findKeywordFromURLQuery(queryString) {
        if(queryString!==''){
            var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].split('=');
                if(decodeURIComponent(pair[0])==='keyword'){
                    return decodeURIComponent(pair[1]);
                }
            }
        }
        return ''
    }
    
    
    // COMPONENT
    componentDidMount() {
        this.fetchSearchResult();
    }


    // RENDER
    render(){
        if(this.state.searchResponse){
            return React.createElement(
                'div',
                {className:'Search'},
                [
                    React.createElement(
                        'h1',
                        {key:1},
                        'Search Results for "'+this.findKeywordFromURLQuery(this.props.activeHistory.activeQuery)+'"'
                    ),
                    React.createElement(
                        'div',
                        {key:2},
                        this.state.searchResponse.map((card,mapIndex)=>{
                            return React.createElement('h3',{key:mapIndex},JSON.stringify(card))
                        })
                    )
                ]
            )
        }
        return React.createElement(
            'div',
            {},
            [
                React.createElement(
                    'h1',
                    {key:1},
                    'Search Results for "'+this.findKeywordFromURLQuery(this.props.activeHistory.activeQuery)+'"'
                ),
                React.createElement(
                    'div',
                    {key:2},
                    'loading'
                )
            ]
        )
    }
}

export default Search