import React from 'react';
import { SocialIcon } from 'react-social-icons';

export default class Footer extends React.Component {
	render() {
		return (
			<footer><p>
				Follow me on all the platforms
				<br/> 
				<br/> 
				<br/> 
				<span style={{ padding: 10 }}><SocialIcon url="https://twitter.com/DuffinAvery" /></span>
				<span style={{ padding: 10 }}><SocialIcon url="https://www.linkedin.com/in/avery-duffin-69317228/" /></span>
				<span style={{ padding: 10 }}><SocialIcon url="https://github.com/averyduffin" /></span>
			</p></footer>
		);
	}
}