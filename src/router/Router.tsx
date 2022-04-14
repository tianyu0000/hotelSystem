import React from 'react';
import { Router as BaseRouter, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { LoginPartRoute } from '@/router/LoginPartRoute';
import { NeedLoginRoute } from '@/router/NeedLoginRoute'
import NotFind from '@/views/NotFind'
import Login from '@/views/Login';
import Home from '@/views/Home'
import routerPath from '@/router/router-path';
import Room from '@/views/Room';
import Order from '@/views/Order';
import User from '@/views/User';
const Router: React.FC = () => {
	const history = createBrowserHistory();
	return (
		<BaseRouter history={history}>
			<Switch>
				<LoginPartRoute path={routerPath.Login} exact component={Login} />
				<NeedLoginRoute path={routerPath.Home} exact component={Home} />
				<NeedLoginRoute path={routerPath.Rooms} exact component={Room} />
				<NeedLoginRoute path={routerPath.Orders} exact component={Order} />
				<NeedLoginRoute path={routerPath.Users} exact component={User} />
				<Route path="*" exact component={NotFind} />
			</Switch>
		</BaseRouter>
	);
};

export default Router;
