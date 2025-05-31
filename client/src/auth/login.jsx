import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/service/axiosInstance";
import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose, switchToSignup }) => {
    const {login} =useAuth();
    const [authState, setAuthState] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setAuthState({ ...authState, [e.target.name]: e.target.value });
        setError("");
    };

    const formSubmit = async (e) => {
        e.preventDefault();

        if (!authState.email || !authState.password) {
            setError("Please enter a valid email and password.");
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await axiosInstance.post("/auth/login", {
                email: authState.email,
                password: authState.password,
            });

            const { token,data:userData } = data;
             login(userData, token);
            
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "login failed. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={formSubmit} className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-700">
                    Login
                </h2>

                <button
                    className="hover:text-bluse-600"
                    onClick={() => onClose()}
                >
                    <X />
                </button>
            </div>

            <Input
                name="email"
                type="email"
                placeholder="Email"
                value={authState.email}
                onChange={changeHandler}
                className="bg-gray-100"
            />
            <Input
                name="password"
                type="password"
                placeholder="Password"
                value={authState.password}
                onChange={changeHandler}
                className="bg-gray-100"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={authState.loading}
            >
                {authState.loading ? "Logging in..." : "Login"}
            </Button>
            <p className="text-sm text-center">Don't have an account?</p>
            <Button
                type="button"
                variant="outline"
                onClick={switchToSignup}
                className="w-full"
            >
                Create Account
            </Button>
        </form>
    );
};

export default Login;
