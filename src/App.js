import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Preview from './Preview';
import NotFound from './components/NotFound';
import Post from './components/Post';
import BlogHome from './components/BlogHome';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';

const history = createBrowserHistory();

const trackingId = "UA-144099775-2";
ReactGA.initialize(trackingId);

// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

const App = (props) => (
  <Router history={history}>
    <Switch>
      <Redirect exact from="/blog/" to="/" />
      <Route exact path="/" render={routeProps => <BlogHome{...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/preview" render={routeProps => <Preview {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/blog/:uid" render={routeProps => <Post {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
