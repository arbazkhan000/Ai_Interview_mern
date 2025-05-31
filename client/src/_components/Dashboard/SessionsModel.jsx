import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/service/axiosInstance";
import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";

const CreateSessionsModal = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState({
        role: "",
        experience: "",
        topicToFocus: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError(null); // Clear error on change
    };

    const handleClose = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axiosInstance.post(
                "/sessions/create",
                {
                    role: formState.role.trim(),
                    experience: formState.experience.trim(),
                    topicToFocus: formState.topicToFocus
                        .split(",")
                        .map((t) => t.trim()),
                    description: formState.description.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("create response data", data);

            navigate("/dashboard");
        } catch (error) {
            console.error("Creation error:", error);
            setError(
                error.response?.data?.message ||
                    error.message ||
                    "Failed to create session"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
            <div
                className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
                            Start a new Journey
                        </h2>
                        <p className="text-gray-600 mt-1 text-sm sm:text-base">
                            Fill out a few details to get your personalized set
                            of interview questions
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <ErrorMessage
                        message={error}
                        className="mb-4"
                        onClose={() => setError(null)}
                    />
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Target Role */}
                        <div>
                            <Label htmlFor="role" required>
                                Target role *
                            </Label>
                            <Input
                                onChange={handleChange}
                                value={formState.role}
                                name="role"
                                id="role"
                                className="mt-2"
                                type="text"
                                placeholder="e.g. Frontend Developer"
                                required
                            />
                        </div>

                        {/* Experience */}
                        <div>
                            <Label htmlFor="experience" required>
                                Years of Experience *
                            </Label>
                            <Input
                                onChange={handleChange}
                                value={formState.experience}
                                name="experience"
                                id="experience"
                                className="mt-2"
                                type="number"
                                min="0"
                                max="50"
                                placeholder="e.g. 3"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <Label htmlFor="description" required>
                                Description *
                            </Label>
                            <Input
                                onChange={handleChange}
                                value={formState.description}
                                name="description"
                                id="description"
                                className="mt-2"
                                type="text"
                                placeholder="Briefly describe your goals"
                                required
                            />
                        </div>

                        {/* Topics */}
                        <div>
                            <Label htmlFor="topics">Topics to Focus On</Label>
                            <Input
                                onChange={handleChange}
                                value={formState.topicToFocus}
                                name="topicToFocus"
                                id="topicToFocus"
                                className="mt-2"
                                type="text"
                                placeholder="e.g. React, TypeScript, CSS"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Separate topics with commas
                            </p>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-6"
                        size="lg"
                        disabled={loading}
                    >
                        {loading ? (
                            <LoadingSpinner size="sm" className="mr-2" />
                        ) : (
                            "Create Session"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateSessionsModal;
