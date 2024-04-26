import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";


const Navbar = () => {
    const { user, userLogout } = useContext(AuthContext)

    const handleUserLogout = () => {
        userLogout()
    }

    const links = (
        <>
            <NavLink to={"/"} className={({ isActive }) =>
                isActive
                    ? " border-b-2 border-primary font-bold text-primary"
                    : " "
            }>
                Home
            </NavLink>
        </>
    );

    return (
        <div className="navbar p-0 bg-base-100 mb-16">
            {/* dropdown and website title */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} className="btn btn-ghost lg:hidden" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-sm bg-base-100 rounded w-40"
                    >
                        {links}
                    </ul>
                </div>
                <p className=" text-lg text-primary font-bold">
                    <Link to={"/"}>Trip Topia</Link>
                </p>
            </div>

            {/* links */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 flex gap-4">
                    {links}
                </ul>
            </div>

            {/* buttons */}
            <div className="navbar-end">
                {
                    user 
                    ? <button onClick={handleUserLogout} className=" bg-primary text-white py-2 px-4 rounded">Logout</button>
                    : <Link to={'/login'}><button className=" bg-primary text-white py-2 px-4 rounded">Login</button></Link>
                }
                
            </div>
        </div>
    );
};

export default Navbar;