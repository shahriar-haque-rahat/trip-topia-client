import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import userIcon from "../../assets/images/userIcon.webp"

const Navbar = () => {
    const { user, userLogout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleUserLogout = () => {
        userLogout();
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const links = (
        <>
            <NavLink to={"/"} className={({ isActive }) =>
                isActive
                    ? "border-b-2 border-primary font-bold text-primary"
                    : " "
            }
            >
                Home
            </NavLink>

            <NavLink to={"/tourists-spots"} className={({ isActive }) =>
                isActive
                    ? "border-b-2 border-primary font-bold text-primary"
                    : " "
            }
            >
                Tourists Spots
            </NavLink>

            <NavLink to={"/add-tourists-spots"} className={({ isActive }) =>
                isActive
                    ? "border-b-2 border-primary font-bold text-primary"
                    : " "
            }
            >
                Add Tourists Spots
            </NavLink>

            <NavLink to={"/my-lists"} className={({ isActive }) =>
                isActive
                    ? "border-b-2 border-primary font-bold text-primary"
                    : " "
            }
            >
                My Lists
            </NavLink>

            <NavLink to={"/profile"} className={({ isActive }) =>
                isActive
                    ? "border-b-2 border-primary font-bold text-primary"
                    : " "
            }
            >
                Profile
            </NavLink>
        </>
    );

    return (
        <div className="navbar mb-16 px-0 bg-transparent py-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} className=" pr-4 lg:hidden" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul className={`menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow-sm bg-base-100 rounded w-40 ${isOpen ? "translate-x-0" : "-translate-x-96"
                        } transition-transform duration-300 ease-in-out`}>
                        {links}
                    </ul>
                </div>
                <p className="text-lg text-primary font-bold">
                    <Link to={"/"}>Trip Topia</Link>
                </p>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 flex gap-4">
                    {links}
                </ul>
            </div>

            <div className="navbar-end">
                {
                    user ? (
                        <div className=" flex gap-2 items-center">
                            <div className="tooltip tooltip-left" data-tip={user.displayName} >
                                <img className=" w-12 h-12 rounded-full object-cover object-center" src={user.photoURL ? user.photoURL : userIcon} alt="" />
                            </div>
                            <button onClick={handleUserLogout} className="bg-primary text-white py-2 px-4 rounded hover:bg-transparent hover:outline hover:outline-1 hover:outline-primary hover:text-primary transition duration-300 ease-in-out">
                                Logout
                            </button>
                        </div>

                    ) : (
                        <span className="flex gap-2">
                            <Link to={"/login"}>
                                <button className="bg-primary text-white py-2 px-4 rounded hover:bg-transparent hover:outline hover:outline-1 hover:outline-primary hover:text-primary transition duration-300 ease-in-out">
                                    Login
                                </button>
                            </Link>
                            <Link to={"/register"}>
                                <button className="bg-primary text-white py-2 px-4 rounded hover:bg-transparent hover:outline hover:outline-1 hover:outline-primary hover:text-primary transition duration-300 ease-in-out">
                                    Register
                                </button>
                            </Link>
                        </span>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;
