import { Link } from "react-router-dom";
import notFoundImage from '../assets/404 Page.png'; // Adjust the path as necessary

const NotFoundPage = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
            <img
                src={notFoundImage}
                alt="Page Not Found Illustration"
                className="w-[80%] md:w-[45%] mr-5"
            />
            <div className="text-center space-y-4">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-2xl text-gray-600">Page Not Found</p>
                <Link
                    to='/'
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage;