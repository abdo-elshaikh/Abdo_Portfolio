import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const user = localStorage.getItem("user");

    if (!user || user === "null") {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
