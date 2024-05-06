import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

const Header: React.FC = () => {
    return (
            <nav className="sticky top-0 z-50 bg-yellow-700">
                <ul className="flex justify-center gap-16 p-4 text-white text-xl">
                    <li>
                        <Link to={ROUTES.HOME} className="px-4 py-2 hover:bg-gray-800 rounded">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to={ROUTES.POPULAR} className="px-4 py-2 hover:bg-gray-800 rounded">
                            Popular
                        </Link>
                    </li>
                    <li>
                        <Link to={ROUTES.TOPRATED} className="px-4 py-2 hover:bg-gray-800 rounded">
                            Top Rated
                        </Link>
                    </li>
                    <li>
                        <Link to={ROUTES.UPCOMING} className="px-4 py-2 hover:bg-gray-800 rounded">
                            Upcoming
                        </Link>
                    </li>
                    <li>
                        <Link to={ROUTES.FAVORITES} className="px-4 py-2 hover:bg-gray-800 rounded">
                            My Favorites
                        </Link>
                    </li>
                </ul>
            </nav>
        
    );
};

export default Header;
