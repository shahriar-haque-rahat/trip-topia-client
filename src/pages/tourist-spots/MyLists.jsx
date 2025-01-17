import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { BASE_URL } from "../../constent/constent";
import userIcon from "../../assets/images/userIcon.webp"
import { Helmet } from "react-helmet-async";


const MyLists = () => {
    const { data, user, updateUserProfile, setData } = useContext(AuthContext);
    const filterData = data?.filter((e) => e.email === user?.email);
    const [count, setCount] = useState(5);

    const handleSetCount = () => {
        setCount(count + 3);
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(BASE_URL + `/tourists-spots/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(deletedData => {
                        if (deletedData.deletedCount > 0) {
                            setData(prevData => prevData.filter(item => item._id !== id));
                            Swal.fire(
                                'Deleted!',
                                'Your tourist spot has been deleted.',
                                'success'
                            )
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting tourist spot:', error);
                        Swal.fire({
                            title: 'Error',
                            text: 'Failed to delete tourist spot',
                            icon: 'error',
                        });
                    });
            }
        })
    }

    const handleEditProfile = () => {
        Swal.fire({
            title: 'Edit Profile',
            html:
                `<input id="swal-input-name" class="swal2-input w-3/5 md:w-4/5" placeholder="Name" value="${user.displayName}">` +
                `<input id="swal-input-photoUrl" class="swal2-input w-3/5 md:w-4/5" placeholder="Photo URL" value="${user.photoURL}">`,
            focusConfirm: false,
            preConfirm: () => {
                const name = Swal.getPopup().querySelector('#swal-input-name').value;
                const photoUrl = Swal.getPopup().querySelector('#swal-input-photoUrl').value;
                return updateUserProfile(name, photoUrl)
                    .then(() => {
                        Swal.fire({
                            title: 'Profile Updated!',
                            icon: 'success',
                        });
                    })
                    .catch((error) => {
                        console.error('Error updating profile:', error);
                        Swal.fire({
                            title: 'Error',
                            text: 'Failed to update profile',
                            icon: 'error',
                        });
                    });
            }
        });
    };

    return (
        <div>
            <Helmet>
                <title>Trip Topia | {user.displayName}</title>
            </Helmet>
            <div className="relative w-fit mx-auto mb-20 text-center">
                <img className="w-36 h-36 rounded-full object-center object-cover mx-auto mb-4" src={user.photoURL ? user.photoURL : userIcon} alt="" />
                <h1 className="text-xl font-bold text-gray-700 dark:text-white">{user.displayName}</h1>
                <p className="text-gray-700 dark:text-white">{user.email}</p>
                <button onClick={handleEditProfile} className="p-2 absolute top-0 right-0 dark:text-white">
                    <FaRegEdit size={23} />
                </button>
            </div>
            <h1 className=" text-center text-3xl font-semibold mb-10 dark:text-white">My Lists</h1>
            <div className="grid grid-cols-1 gap-6">
                {
                    filterData < 1 ? <p className=" text-center">No Data Found</p>
                        : filterData?.slice(0, count).map((e, idx) => (
                            <div key={idx} className="grid grid-cols-1 lg:grid-cols-3 gap-2 bg-transparent rounded-lg overflow-hidden shadow-lg">
                                <img className="h-full w-full object-cover object-center rounded-lg" src={e.image} alt="loading image..." />
                                <div className="p-4 lg:col-span-2 flex flex-col justify-between">
                                    <div>
                                        <p className="text-xl font-semibold text-gray-800 dark:text-white">{e.spot}</p>
                                        <p className="text-gray-600 dark:text-white mt-2">{e.location}, {e.country}</p>
                                        <p className="text-lg text-gray-600 dark:text-white mt-2">{e.description}</p>
                                    </div>
                                    <div className=" flex justify-between items-center dark:text-white">
                                        <Link to={`/tourists-spots-details-page/${e._id}`} className="mt-2 text-primary font-semibold flex items-center gap-1">
                                            View Details <IoIosArrowDropright size={22} />
                                        </Link>
                                        <div>
                                            <Link to={`/update-tourists-spots/${e._id}`}><button className=" p-2"><FaRegEdit size={23} /></button></Link>
                                            <button onClick={() => handleDelete(e._id)} className=" p-2 text-red-500"><RiDeleteBin2Line teForever size={25} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                }
            </div>
            <div className=" w-full flex justify-center mt-10">
                {
                    filterData?.length > 5 && count < filterData?.length && (
                        <button onClick={handleSetCount} className=" text-primary border border-primary py-2 px-4 rounded">Show More</button>
                    )
                }
            </div>
        </div>
    );
};

export default MyLists;