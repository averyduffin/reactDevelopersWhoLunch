import React, { useState }  from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from 'react-router-dom';
import Preview from './Preview';
import NotFound from './components/NotFound';
import Post from './components/Post';
import BlogHome from './components/BlogHome';
import { createBrowserHistory } from 'history';
// import { Menu } from 'semantic-ui-react'
import ReactGA from 'react-ga';
import 'semantic-ui-css/semantic.min.css'
import StickyHeader from './components/Header';
import Prismic from 'prismic-javascript';
import Footer from './components/Footer';
import Talks from './components/Talks';

export const TAB_BLOG = '/';
export const TAB_TALKS = '/talks';

const history = createBrowserHistory();
const trackingId = "UA-144099775-2";
ReactGA.initialize(trackingId);

// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			doc: null,
			notFound: false,
      posts: [],
      talks: [],
      tab: TAB_BLOG,
		}
		if (props.prismicCtx) {
			this.fetchPage(props);
		}
	}

	componentDidUpdate(prevProps) {
	  this.props.prismicCtx.toolbar();
	  if (!prevProps.prismicCtx) {
	  	this.fetchPage(this.props);
	  }
	}

	fetchPage(props) {
		// We are using the function to get single type document
		return props.prismicCtx.api.getSingle('blog_home').then(doc => {
		if (doc) {
			// We put the retrieved content in the state as a doc variable
      this.setState({ doc });
      console.log(doc)
			props.prismicCtx.api.query(
				// Get the blog posts in descending order
				Prismic.Predicates.at('document.type', 'post'),
				{orderings : '[my.post.date desc]'}
			).then(res => {
        console.log(res.results)
				this.setState({posts: res.results});
      });
      props.prismicCtx.api.query(
				// Get the blog posts in descending order
        Prismic.Predicates.at('document.type', 'talks'),
        {orderings : '[my.post.date desc]'}
			).then(res => {
        console.log(res.results)
				this.setState({talks: res.results});
			});
		} else {
			// We changed the state to display error not found if no matched doc
			this.setState({ notFound: !doc });
		}
		});
  }

  setTab = (tab) => this.setState({ tab })
  
  render() {
    const { doc, notFound, posts, tab, talks } = this.state
    return (
      <Router history={history}>
        <div>
          <StickyHeader doc={doc} tab={tab}>
            <Switch>
              <Redirect exact from="/blog/" to={TAB_BLOG} />
              <Route exact path={TAB_BLOG} render={routeProps => <BlogHome {...routeProps} doc={doc} notFound={notFound} posts={posts}  prismicCtx={this.props.prismicCtx} />} />
              <Route exact path="/preview" render={routeProps => <Preview {...routeProps} prismicCtx={this.props.prismicCtx} />} />
              <Route exact path="/blog/:uid" render={routeProps => <Post {...routeProps} prismicCtx={this.props.prismicCtx} />} />
              <Route exact path={TAB_TALKS} render={routeProps => <Talks {...routeProps} talks={talks} prismicCtx={this.props.prismicCtx}/>} />
              <Route component={NotFound} />
            </Switch>
          </StickyHeader>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
