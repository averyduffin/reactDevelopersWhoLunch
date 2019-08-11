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
import { Menu } from 'semantic-ui-react'
import ReactGA from 'react-ga';
import 'semantic-ui-css/semantic.min.css'

const TAB_BLOG = '/';
const TAB_TALKS = '/talks';

const history = createBrowserHistory();
const trackingId = "UA-144099775-2";
ReactGA.initialize(trackingId);

// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

const App = (props) => {
  const [tab, setTab] = useState(TAB_BLOG)
  return (
    <div>
      
      
      <Router history={history}>
      <div>
        <Menu borderless>
          <Menu.Item name='editorials' active={tab === TAB_BLOG} >
          <Link to={TAB_BLOG} onClick={() => setTab(TAB_BLOG)}>Blog</Link>
          </Menu.Item>
          <Menu.Item name='reviews' active={tab === TAB_TALKS} >
          <Link to={TAB_TALKS} onClick={() => setTab(TAB_TALKS)}>Talks</Link>
          </Menu.Item>
        </Menu>
        <Switch>
          <Redirect exact from="/blog/" to={TAB_BLOG} />
          <Route exact path={TAB_BLOG} render={routeProps => <BlogHome {...routeProps} prismicCtx={props.prismicCtx} />} />
          <Route exact path="/preview" render={routeProps => <Preview {...routeProps} prismicCtx={props.prismicCtx} />} />
          <Route exact path="/blog/:uid" render={routeProps => <Post {...routeProps} prismicCtx={props.prismicCtx} />} />
          <Route exact path={TAB_TALKS} render={routeProps => <div>TEST</div>} />
          <Route component={NotFound} />
        </Switch>
      </div>
      </Router>
    </div>
  )
};

export default App;
