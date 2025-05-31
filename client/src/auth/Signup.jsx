import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/service/axiosInstance";
import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ onClose, switchToLogin }) => {

    const {login} =useAuth();
    const [authState, setAuthState] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setAuthState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleForm = async (e) => {
        e.preventDefault();
        const { name, email, password } = authState;

        if (!name || !email || !password) {
            setError("All fields are required.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        setLoading(true);
        try {
            const { data } = await axiosInstance.post("/auth/register", {
                name: authState.name,
                email: authState.email,
                password: authState.password,
            });

            const { token ,data:userData} = data;

            login(userData, token);
          

            // Redirect to login page as you want
            switchToLogin();
        } catch (err) {
            setError(
                err.response?.data?.message || "Signup failed. Try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleForm} className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-blue-600">
                    Sign Up
                </h2>
                <button
                    type="button"
                    onClick={onClose}
                    className="hover:text-red-600"
                >
                    <X />
                </button>
            </div>

            <Input
                name="name"
                type="text"
                placeholder="Full Name"
                value={authState.name}
                onChange={changeHandler}
                className="bg-gray-100"
            />
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
                className="w-full bg-blue-600 hover:bg-bluse-700 text-white"
                disabled={loading}
            >
                {loading ? "Signing up..." : "Sign Up"}
            </Button>

            <p className="text-sm text-center">Already have an account?</p>
            <Button
                type="button"
                variant="outline"
                onClick={switchToLogin}
                className="w-full"
            >
                login
            </Button>
        </form>
    );
};

export default Signup;
