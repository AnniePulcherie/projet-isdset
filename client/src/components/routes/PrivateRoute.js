import React from 'react';
import { Navigate, Route } from 'react-router-dom';
const PrivateRoute = ({ component: Component, ...rest }) => {
    // Vérifiez la présence du token dans le localStorage
    const isAuthenticated = localStorage.getItem('token') !== null;
    
    return (
        <Route
            {...rest}
            element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;

  