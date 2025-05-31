import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SessionsCard = ({ sessions, onDelete }) => {
    const navigate = useNavigate();

    if (!sessions) return null;

    const sessionId = sessions._id || sessions.id;

    const handleClick = () => {
        navigate(`/session/${sessionId}`);
    };

    const handleDelete = async (e) => {
        e.stopPropagation(); // prevent navigation on delete click
        if (onDelete && sessionId) {
            onDelete(sessionId);
        }
    };

    return (
        <div
            onClick={handleClick}
            className="relative bg-white border border-gray-200 rounded-2xl shadow-sm p-4 w-full sm:w-[300px] md:w-[320px] hover:shadow-md transition-all cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={`Session for ${sessions.role}`}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
        >
            {/* Delete Icon */}
            <button
                onClick={handleDelete}
                className="absolute top-3 right-3 text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-100 transition"
                aria-label="Delete session"
            >
                <Trash2 size={18} />
            </button>

            {/* Role and Title */}
            <div className="flex items-center gap-2 mb-2">
                <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded font-semibold text-sm">
                    {sessions.role
                        ?.split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}
                </div>
                <h2 className="font-bold text-lg text-gray-800">
                    {sessions.role || "No role specified"}
                </h2>
            </div>

            {/* Tags */}
            {Array.isArray(sessions.topicToFocus) &&
                sessions.topicToFocus.length > 0 && (
                    <div className="flex flex-wrap gap-2 my-2">
                        {sessions.topicToFocus.map((tag, idx) => (
                            <span
                                key={idx}
                                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

            {/* Questions Count */}
            {Array.isArray(sessions.questions) && (
                <p className="text-sm text-gray-600 font-medium my-1">
                    Questions: {sessions.questions.length}
                </p>
            )}

            {/* Experience */}
            {sessions.experience && (
                <p className="text-sm text-gray-600 font-medium my-1">
                    Experience: {sessions.experience}
                </p>
            )}

            {/* Description */}
            {sessions.description && (
                <p className="text-gray-700 text-sm mt-2">
                    {sessions.description.length > 100
                        ? `${sessions.description.substring(0, 100)}...`
                        : sessions.description}
                </p>
            )}
        </div>
    );
};

export default SessionsCard;
