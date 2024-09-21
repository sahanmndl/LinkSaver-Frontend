import React, {useEffect, useState} from "react";
import {isAuthenticated} from "@/utils/auth.ts";
import {Navigate} from "react-router-dom";

const AuthRoute: React.FC = () => {
    const [authChecked, setAuthChecked] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const authenticated = await isAuthenticated();
            setAuthChecked(authenticated);
        };

        checkAuth();
    }, []);

    if (authChecked === null) {
        return <div>Loading...</div>;
    }

    return authChecked ? <Navigate to="/home" replace/> : <Navigate to="/login" replace/>;
};

export default AuthRoute;