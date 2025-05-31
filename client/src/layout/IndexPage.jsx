import Login from "@/auth/login"; 
import Signup from "@/auth/Signup";
import { useState } from "react";

const IndexPage = () => {
    const [openAuthModal, setOpenAuthModal] = useState(null);

    const features = [
        "Role-specific interview questions",
        "Detailed AI-generated explanations",
        "Practice coding problems with solutions",
        "Personalized improvement feedback",
    ];

    return (
        <div className=" min-h-screen p-6 md:p-12">
            {/* Hero Section */}
            <section className="text-center max-w-3xl mx-auto space-y-4 mb-12">
                <h3 className="text-xl md:text-2xl font-semibold  text-blue-600 text:bg-blue-700">
                    AI Powered
                </h3>

                <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                    Ace Your Interview with AI-Powered Learning
                </h2>

                <p className="text-gray-600 text-sm md:text-base">
                    Get role-specific questions and explained answers when you
                    need them. Dive deeper into concepts. From preparation to
                    mastery — your ultimate interview toolkit is here.
                </p>

                <div className="mt-4 flex justify-center gap-4">
                    <button
                        onClick={() => setOpenAuthModal("login")}
                        className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition duration-200"
                    >
                        Get Started
                    </button>
                    
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-200"
                    >
                        <h4 className="text-lg font-semibold text-gray-800">
                            {feature}
                        </h4>
                    </div>
                ))}
            </section>

            {/* Modal Section */}
            {openAuthModal === "login" && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
                        <Login
                            onClose={() => setOpenAuthModal(null)}
                            switchToSignup={() => setOpenAuthModal("signup")}
                        />
                    </div>
                </div>
            )}

            {openAuthModal === "signup" && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
                        <Signup
                            onClose={() => setOpenAuthModal(null)}
                            switchToLogin={() => setOpenAuthModal("login")}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default IndexPage;
