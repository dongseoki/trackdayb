import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isLogin = localStorage.getItem('jwt-token');

const PublicRoute = ({component : Component, restricted, ...rest}) => {
    return (
        //restricted : true : 로그인한 상태에서 접근 불가능(로그인/회원가입페이지)
        <Route {...rest} render={props => (
            isLogin && restricted ? 
                <Redirect to="/"/>
            :   <Component {...props} />
        )} />
    );
};

export default PublicRoute;