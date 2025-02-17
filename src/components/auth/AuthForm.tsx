import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import AuthError from "./AuthError";
import AuthToggle from "./AuthToggle";
import { User, Mail, Lock } from "lucide-react";

interface AuthFormProps {
    isLogin: boolean;
    onToggle: () => void;
}

export default function AuthForm({ isLogin, onToggle }: AuthFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });
                if (error) throw error;
                localStorage.setItem("user", JSON.stringify(data));
                navigate("/dashboard");
            } else {
                const { error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: { data: { name: formData.name } },
                });
                if (error) throw error;
                navigate("/");
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {error && <AuthError error={error} />}

            {!isLogin && (
                <AuthInput
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    icon={User}
                    required={!isLogin}
                />
            )}

            <AuthInput
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                icon={Mail}
                required
            />

            <AuthInput
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                icon={Lock}
                required
            />

            <AuthButton loading={loading} isLogin={isLogin} />
            <AuthToggle isLogin={isLogin} onToggle={onToggle} />
            {/* back to home */}
            <div className="mt-6 text-center">
                <button
                    onClick={() => navigate("/")}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                >
                    Back to home
                </button>
            </div>
        </form>
    );
}