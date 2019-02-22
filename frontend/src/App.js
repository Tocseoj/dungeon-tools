// Modules
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import cookies from 'react-cookies';
import styled from 'styled-components'
// Components
import PageContent from './PageContent';
import TopNavigation from './components/TopNavigation';

// Styling
const StyledApp = styled.div`
	// Size of self

	// Positioning of self

	// Positioning of children

	// Looks of self

	// Looks of children
	text-align: center;
`;

// App - the main/global component
class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	// Check for session token in cookie set by backend
    	// If session cookie available then use is logged in
    	backend_token: cookies.load('session_token') || "",
    };
  }

	render() {
		return (
			<BrowserRouter>
				<StyledApp>
					<TopNavigation />
					<PageContent />
				</StyledApp>
			</BrowserRouter>
		);
	}
}

export default App;