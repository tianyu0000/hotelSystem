import React from 'react';
import {
  Redirect, RouteProps, Route as ReactRouter,
} from 'react-router-dom';
import routerPath from '@/router/router-path';
import Home from '@/views/Home';
import { getUserInfo } from '@/utils/storageUtils';

export const LoginPartRoute: React.FC<RouteProps> = (props) => {
  const { component: Component, ...rest } = props;
  if (!Component) return null;

  return (
    <ReactRouter
      {...rest}
      render={() => {
        if (getUserInfo()) {
          return (
            <>
              <Redirect to={routerPath.Home} />
              <Home />
            </>
          );
        }
        return (
          <ReactRouter {...props} />
        );
      }}
    />
  );
};
