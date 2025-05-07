import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
                <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;