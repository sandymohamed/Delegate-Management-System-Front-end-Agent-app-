// // components/ProtectedRoute.js
// import React, { useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//     const { user, token, loading, fetchUserData } = useAuth();
//     const storedToken = localStorage.getItem('token');

//     useEffect(() => {
//         if (storedToken && !user) {
//             console.log("token", token, "user:", user);
            
//             // Fetch user data if token exists but user data is not loaded
//             // This ensures the user data is always fresh

//             fetchUserData();
//         }
//     }, [storedToken, user]);

//     if (loading) {
//         return <div>Loading...</div>; // Show a loading spinner
//     }

//     if (!storedToken) {
//         console.log("not token", token, "storedToken", storedToken);

//         return <Navigate to="/login" />; // Redirect to login if not authenticated
//     }

//     return children;
// };

// export default ProtectedRoute;



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
