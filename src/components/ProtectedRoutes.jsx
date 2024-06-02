import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
	// TODO: Use authentication token
	const localStorageToken = localStorage.getItem("token");
	const userRole = localStorage.getItem("userRole");

	return localStorageToken ? <>
		{
			userRole !== "admin" ? <Outlet /> : <Navigate to="/admin/dashboard" replace />
		}
	</> : <Navigate to="/signin" replace />;
};

export default ProtectedRoutes;