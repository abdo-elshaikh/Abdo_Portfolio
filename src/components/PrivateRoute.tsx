import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../lib/supabase";

const PrivateRoute = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check the current session when the component mounts
        const checkSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setUser(session?.user || null);
            setLoading(false);
        };

        checkSession();

        // Listen for authentication state changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user || null);
                setLoading(false);
            },
        );

        // Cleanup the listener when the component unmounts
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    if (loading) {
        // Show a loading spinner or placeholder while checking authentication
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-20 h-20 border-4 border-turquoise-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    // Render the child routes if the user is authenticated
    return <Outlet />;
};

export default PrivateRoute;
