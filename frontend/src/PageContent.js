// Modules
import React from 'react';
import styled from 'styled-components'
import { Route } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';

// Styled Components
const StyledPageContent = styled.div`
	
`;

// PageContent - loads in routes depending on the page
const PageContent = () => (
	<StyledPageContent>
		<Route exact path="/" component={Home} />
		<Route exact path="/login" component={Login} />
	</StyledPageContent>
)

export default PageContent;