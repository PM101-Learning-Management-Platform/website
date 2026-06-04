import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function SetAuthorized() {
    const authContext = useContext(AuthContext);
    const { user } = authContext || {};

    if (!user) {
        return <Navigate to="auth/login" replace />;
    }

    return <Outlet />;
}
