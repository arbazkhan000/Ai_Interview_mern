import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const { user, logout } = useAuth();
    const handleLogoClick = () => {
        navigate("/");
    };

    const handleLogOutClick = () => {
        logout();
        navigate("/");
    };

    const getUserInitials = () => {
        if (!user?.name) return "U";
        const names = user.name.split(" ");
        return names
            .map((name) => name[0])
            .join("")
            .toUpperCase();
    };

    return (
        <div className="px-5 h-20 flex items-center border justify-between ">
            <div className="cursor-pointer" onClick={handleLogoClick}>
                <h2 className="text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition-colors">
                    I Prep
                </h2>
            </div>


            {/* profile */}
            {user && (
                <div className="flex items-center gap-4">
                    <Avatar className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                            {getUserInitials()}
                        </AvatarFallback>
                    </Avatar>
                    <button
                        onClick={handleLogOutClick}
                        className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                        logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
