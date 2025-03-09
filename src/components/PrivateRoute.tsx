import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAlert } from "../contexts/AlertContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { showAlert } = useAlert();

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

    // If the user is not active, show a message and log them out
    // if (!user?.email_verified) {
    //     showAlert("error", "Please verify your email to continue");
    //     supabase.auth.signOut();
    //     return <Navigate to="/auth" replace />;
    // }

    // Render the child routes if the user is authenticated
    return children;
};

export default PrivateRoute;
