import React from "react"

const e = React.createElement;
const Header = e('header',{key:1},'this is header');
const Footer = e('footer',{key:2},'this is footer');
const App = e(
		'app',
		{className:'root'},
		[
				Header,
        Footer
    ]
)

export default App;
