import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            {children}
        </div>
    );
}

export default Layout;