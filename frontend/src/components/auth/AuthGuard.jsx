// src/components/AuthGuard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!user || !token) {
            navigate('/login');
        }
    }, [navigate]);

    return <>{children}</>;
};

export default AuthGuard;
