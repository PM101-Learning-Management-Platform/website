import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function SetGuest() {
    const authContext = useContext(AuthContext);
    const { user } = authContext || {};

    if (user) {
        if (user.role === 'admin') {
            return <Navigate to="/admin" replace />;
        }
        return <Navigate to="/student" replace />;
    }

    return <Outlet />;
}
