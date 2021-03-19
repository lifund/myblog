import React from "react";
const e = React.createElement;
const Header = e('header',{key:1},'this is header');
const Footer = e('footer',{key:2},'this is footer');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
		this.handleChange = this.handleChange.bind(this)
  }


  render() {
		let buttonText = `clicked ${this.state.count} times`
    return (
				e(
					'div',
					{
						className:'app'
					},
					[
						Header,
						e('button',{key:3,onClick:function(e){console.log('yes'); setState({count:count+1});}},buttonText),
						Footer
					]
				)
		)
	}
	handleChange(e) {
		this.setState({
			count: count++,
		})
	}
}


export default App;
