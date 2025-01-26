import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { token, loading, user, fetchUserData } = useAuth();

    useEffect(() => {
        if (token && !user) {
            fetchUserData(); // Ensure user data is fetched if token exists
        }
    }, [token, user]);

    if (loading) {
        return <div>Loading...</div>; // Optional: Add a more polished loading UI
    }

    if (!token) {
        return <Navigate to="/login" replace />; // Redirect to login if not authenticated
    }

    return children;
};

export default ProtectedRoute;
