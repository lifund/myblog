class App extends React.Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return React.createElement(
            'div',
            {className:'App'},
            [
                React.createElement(
                    Articles_featured,
                    {key:1}
                ),
                React.createElement(
                    Articles_recents,
                    {key:2}
                )
            ]
        )
    }
}


class Articles_featured extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            card_contents : [],
            card_isLoaded : false,
            card_error : null
        }
    }
    componentDidMount(){
        fetch('/article?featured=true')
        .then(
            function(res){
                return res.json()
            }
        )
        .then(
            (res)=>{ 
                console.log(res.card_data);
                this.setState({
                    card_isLoaded: true,
                    card_contents: res.card_data
                });
            },
            (err)=>{
                this.setState({
                    card_isLoaded: true,
                    card_error:  err
                })
            }
        );
    }
    render(){
        if (this.state.card_error){
            return React.createElement('div',{},this.state.card_error)
        }
        else if (!this.state.card_isLoaded){
            return React.createElement('div',{},'Loading...')
        }
        else{
            return (
                React.createElement(
                    'div',
                    {className:'Articles_featured'},
                    this.state.card_contents.map((content,mapIndex)=>(
                        React.createElement(
                            Articles_featured_card,
                            {key:mapIndex, content:content},
                            []
                        )                   
                    ))
                )
            );
        }
    }
}
class Articles_featured_card extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            React.createElement(
                'div',
                {className:'Articles_featured_card'},
                this.props.content.title
            )
        )
    }
}

class Articles_recents extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return React.createElement(
            'div',
            {},
            [
                'Articles_recents'
            ]
        );
    }
}

export default App
