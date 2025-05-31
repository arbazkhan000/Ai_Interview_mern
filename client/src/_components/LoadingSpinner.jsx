const LoadingSpinner = ({ size = "md" }) => {
    const sizes = {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12",
    };

    return (
        <div className="flex justify-center items-center">
            <div
                className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 ${sizes[size]}`}
            />
        </div>
    );
};

export default LoadingSpinner;
