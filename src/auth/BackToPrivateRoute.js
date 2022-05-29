import React from 'react'
import { Redirect, Route } from 'react-router'
import Cookies from 'js-cookie'
import { decodeTokenRole, getPath } from './AuthFun'

const BackToPrivateRoute = ({component: Component,...rest}) => {
    
    const token = Cookies.get("_token") 

    
    return (
        <Route {...rest} render={ props => {   
            if (token) {
                let decodeRole = decodeTokenRole(token)
                let pathRole = getPath(decodeRole)
                if (pathRole === undefined) {
                    Cookies.remove('_token')
                    window.location.href ="/"
                }
                return  <Redirect to={pathRole} /> 
            }
            return <Component {...props} />
        }} />
    )
}

export default BackToPrivateRoute
