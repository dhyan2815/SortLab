// Footer.jsx

const Footer = () => {
    return (
        <footer className="dark:bg-gray-900 text-black border-t dark:text-gray-300 py-4 text-center dark:border-cyan-500">
            <p className="text-md">
                Developed by{" "}
                <span className="font-base">
                    <span className="dark:text-cyan-400 text-blue-500">Diksha Pareek, </span>
                    <a
                        href="https://www.linkedin.com/in/dhyan2815/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dark:text-cyan-400 text-blue-500 hover:underline hover:text-cyan-500 transition-colors duration-200"
                    >
                        Dhyan Patel
                    </a>
                    <span className="dark:text-cyan-400 text-blue-500"> & Vraj Shah</span>
                </span>
                .
            </p>
            <p className="text-sm text-gray-500 mt-1">
                © Team SortLab VAC_{new Date().getFullYear()} | Mentor: Prof. Palwinder Singh
            </p>
        </footer>
    );
};

export default Footer;
