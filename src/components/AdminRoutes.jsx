import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
	// TODO: Use authentication token
	const localStorageToken = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    
	return localStorageToken && userRole === "admin" ? <Outlet /> : <Navigate to="/"  replace />;
};

export default AdminRoutes;