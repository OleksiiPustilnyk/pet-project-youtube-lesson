import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../router/index'
import { AuthContext } from '../context'
import Loader from './UI/loader/Loader'

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext)
    console.log(isAuth)

    if (isLoading) {
        return <Loader />
    }

    return isAuth ? (
        <>
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

            {/* <Navigate to="/posts" replace /> */}
        </>
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
