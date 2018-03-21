import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'
import { StaticRouter as Router, Route, Link, Switch } from "react-router-dom";

const context = {}

function Loading() {
	return <div>Loading...</div>;
}

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "index"*/ './routes/index'),
  loading: () => null
})

const About = Loadable({
	loader: () => import(/* webpackChunkName: "about"*/ './routes/about'),
	loading: () => null,
})

const Topics = Loadable({
	loader: () => import(/* webpackChunkName: "topics"*/ './routes/topics'),
	loading: () => null,
})

const NoMatch = ({ location }) => (
	<div>
		<h3>
		No match for <code>{location.pathname}</code>
		</h3>
	</div>
);

const Root = ({ url }) => {
	return (
		<Router
			location={url}
			context={context}>
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
	)
}

export default Root