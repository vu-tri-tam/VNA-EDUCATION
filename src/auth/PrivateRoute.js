import Cookies from 'js-cookie'
import React from 'react'
import { Redirect, Route } from 'react-router'
import { decodeTokenRole, getPath } from './AuthFun'


const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = Cookies.get("_token");
    return (
        <Route {...rest} render={props => {
            if (token) {
                let decodeRole = decodeTokenRole(token)
                let pathRole = getPath(decodeRole)
                if (pathRole === undefined) {
                    Cookies.remove('_token')
                    window.location.href = "/"
                }
                if (rest.path === pathRole) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={pathRole} />
                }
            } else {
                return <Redirect to="/dang-nhap" />
            }
        }} />
    )
}

export default PrivateRoute
