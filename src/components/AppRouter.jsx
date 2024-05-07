import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../router/index'

const AppRouter = () => {
    const isAuth = true

    return isAuth ? (
        <Routes>
            {privateRoutes.map((route) => (
                <Route
                    element={<route.component />}
                    path={route.path}
                    key={route.path}
                    exact={route.exact}
                />
            ))}
        </Routes>
    ) : (
        <>
            <Routes>
                {publicRoutes.map((route) => (
                    <Route
                        element={<route.component />}
                        path={route.path}
                        key={route.path}
                        exact={route.exact}
                    />
                ))}
            </Routes>
            <Navigate to="/login" replace />
        </>
    )
}

export default AppRouter
