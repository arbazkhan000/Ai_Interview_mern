import axiosInstance from "@/service/axiosInstance";
import { Plus } from "lucide-react"; // Import the plus icon
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";
import SessionsCard from "./SessionsCard";

const Home = () => {
    const [sessionData, setSessionData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getMySession = async () => {
        try {
            setError(null);
            setLoading(true);

            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found");
            }

            const { data } = await axiosInstance.get("/sessions/my-sessions", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("All session", data.sessions);

            setSessionData(data.sessions);
        } catch (error) {
            console.error("Error fetching sessions:", error);
            setError(
                error.message ||
                    "Failed to fetch session data. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };

    const deleteSessions = async (sessionId) => {
        setLoading(true);

        try {
            const { data } = await axiosInstance.delete(
                `/sessions/${sessionId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setSessionData((prev) => prev.filter((s) => s._id !== sessionId));

            navigate("/dashboard");
        } catch (error) {
            console.error("delete error:", error);
            setError(
                error.response?.data?.message ||
                    error.message ||
                    "Failed to delete session"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCreateNewSession = () => {
        navigate("/sessions"); // Adjust this route as needed
    };

    useEffect(() => {
        getMySession();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="px-4 py-8">
                <ErrorMessage
                    message={error}
                    onRetry={getMySession}
                    retryText="Try Again"
                />
            </div>
        );
    }

    return (
        <div className="px-4 py-8 pb-16">
            {/* Added pb-16 to prevent content from being hidden behind the fixed button */}
            {sessionData?.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-700">
                        No sessions found
                    </h3>
                    <p className="text-gray-500 mt-2">
                        You don't have any sessions yet. Create one to get
                        started!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {sessionData?.map((session) => (
                        <SessionsCard
                            sessions={session}
                            key={session._id}
                            onDelete={deleteSessions}
                        />
                    ))}
                </div>
            )}
            {/* Fixed Create New Session Button */}
            <button
                onClick={handleCreateNewSession}
                className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 flex items-center justify-center"
                aria-label="Create new session"
            >
                <Plus className="w-6 h-6" />
                <span className="sr-only">Create New Session</span>
            </button>
        </div>
    );
};

export default Home;
