import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Loadable from 'react-loadable';

function Loading() {
	return <div>Loading...</div>;
}

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "index"*/ './routes/index'),
  loading: Loading,
})

const About = Loadable({
	loader: () => import(/* webpackChunkName: "about"*/ './routes/about'),
	loading: Loading,
})

const Topics = Loadable({
	loader: () => import(/* webpackChunkName: "topics"*/ './routes/topics'),
	loading: Loading,
})
  
const NoMatch = ({ location }) => (
	<div>
		<h3>
		No match for <code>{location.pathname}</code>
		</h3>
	</div>
);

const Root = () => (
	<Router>
		<div>
		<ul>
			<li>
			<Link to="/">Home</Link>
			</li>
			<li>
			<Link to="/about">About</Link>
			</li>
			<li>
			<Link to="/topics">Topics</Link>
			</li>
		</ul>
		<hr />
      	<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/about" component={About} />
			<Route path="/topics" component={Topics} />
			<Route component={NoMatch} />
		</Switch>
		</div>
	</Router>
);

Loadable.preloadReady().then(() => {
	ReactDOM.hydrate(<Root />, document.getElementById('root'));
});
registerServiceWorker();
