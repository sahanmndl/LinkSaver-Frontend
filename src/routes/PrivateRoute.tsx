import React, {useEffect, useState} from "react";
import {isAuthenticated} from "@/utils/auth.ts";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute: React.FC = () => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const authenticated = await isAuthenticated();
            setIsAuth(authenticated);
        };

        checkAuth();
    }, []);

    if (isAuth === null) {
        return <div>Loading...</div>;
    }

    return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;