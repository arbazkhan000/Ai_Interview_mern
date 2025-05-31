const Footer = () => {
    return (
        <footer className="mt-16 bg-white border-t border-gray-200 py-6 px-4 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
                <p>
                    &copy; {new Date().getFullYear()} AI Interview Prep. All
                    rights reserved.
                </p>
                <div className="flex gap-4">
                    <a href="/privacy" className="hover:text-gray-800">
                        Privacy Policy
                    </a>
                    <a href="/terms" className="hover:text-gray-800">
                        Terms of Service
                    </a>
                    <a
                        href="mailto:support@example.com"
                        className="hover:text-gray-800"
                    >
                        Contact
                    </a>
                </div>
                <p className="text-xs text-gray-500">
                    made ❤️ by{" "}
                    <span className="font-semibold">Arbaz</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
