import React, { Component } from 'react'
import {RichText} from 'prismic-reactjs';


const Talks = ({ talks, prismicCtx }) => {
    console.log(talks)
    return (
        <div className="blog-main">
            {/* Working from the array of all blog posts, we process each one */}
            {talks.map((post) => {
                /* Store the date as a Date object so we can format it to whatever we need */
                let postDate = Date(post.data.date);
                console.log(postDate)
                /* Default title when post has no title set */
                const defaultTitle = [<h1 key="title">Untitled</h1>]
                return (
                    <div className="blog-post" data-wio-id={post.id} key={post.id} >
                        
                            {/* We render a link to a particular post using the linkResolver for the url and its title */}
                            <a href={post.data.link.url}>
                                {post.data.title.length !== 0 ? RichText.render(post.data.title, prismicCtx.linkResolver) : defaultTitle}
                            </a>
                        {/* <p className="blog-post-meta">
                            <time className="created-at">
                                Format the date to M d, Y
                                {postDate ? new Intl.DateTimeFormat('en-US', {
                                    month: 'short', 
                                    day: '2-digit', 
                                    year: 'numeric'
                                }).format(postDate) : ''}
                            </time>
                        </p> */}
                    {/* Renders a small preview of the post's text */}
                    {/* {this.firstParagraph(post)} */}
                    </div>
                );
            })}
        </div>
    );
}

export default Talks