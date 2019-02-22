// Modules
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// Components

// Styling
const StyledComponent = styled.div`
	// Size of self

	// Positioning of self
	position: fixed;
	top: 0;
	right: 0;

	// Positioning of children

	// Looks of self

	// Looks of children
	
`;

// TopNavigation Component - this appears at he top of every page
const TopNavigation = () => (
	<StyledComponent>
		<Link to="/login"><img src="favicon.ico" /></Link>
	</StyledComponent>
)

export default TopNavigation;