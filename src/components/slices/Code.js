import React from 'react';
import {RichText} from 'prismic-reactjs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default class Code extends React.Component {
	render() {
		return (
			<div className="post-part single container">
				<SyntaxHighlighter language="javascript" style={docco}>
                    {RichText.asText(this.props.slice.primary.code_block)}
                </SyntaxHighlighter>
			</div>
		);
	}
} 