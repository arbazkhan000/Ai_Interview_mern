import axiosInstance from "@/service/axiosInstance";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";

const SingleSession = () => {
    const { id } = useParams();
    const [sessionData, setSessionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openIndexes, setOpenIndexes] = useState([]);

    const navigate = useNavigate();

    const fetchSession = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axiosInstance.get(`/sessions/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!data || !data.session) throw new Error("Invalid session data");
            setSessionData(data.session);
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to load session data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSession();
    }, [id]);

    const toggleQuestion = (index) => {
        setOpenIndexes((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

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
                    onRetry={fetchSession}
                    retryText="Retry"
                />
            </div>
        );
    }

    if (!sessionData) return null;

    return (
        <div className="px-4 py-8 max-w-3xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-blue-600 hover:underline flex items-center"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
            </button>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Session: {sessionData.role}
            </h1>
            <p className="text-gray-600 mb-2">
                <strong>Experience:</strong> {sessionData.experience} years
            </p>
            <p className="text-gray-600 mb-6">
                <strong>Description:</strong> {sessionData.description}
            </p>

            <div className="space-y-4">
                {sessionData.questions?.map((q, index) => {
                    const isOpen = openIndexes.includes(index);
                    return (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-xl shadow-sm"
                        >
                            <button
                                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 hover:bg-gray-50 focus:outline-none"
                                onClick={() => toggleQuestion(index)}
                            >
                                <div className="text-base font-medium flex items-start gap-2">
                                    <span className="text-blue-600">
                                        Q{index + 1}:
                                    </span>
                                    <span>{q.question}</span>
                                </div>
                                {isOpen ? (
                                    <ChevronUp className="w-5 h-5 text-gray-500" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                )}
                            </button>
                            {isOpen && (
                                <div className="px-6 pb-4 text-gray-700 text-sm leading-relaxed border-t">
                                    {q.answer}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SingleSession;
