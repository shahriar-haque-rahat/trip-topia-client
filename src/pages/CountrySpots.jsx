import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "./provider/AuthProvider";
import { LuArrowRightCircle } from "react-icons/lu";
import { Helmet } from "react-helmet-async";


const CountrySpots = () => {
    const { country } = useParams();
    const { data } = useContext(AuthContext);
    const countrySpots = data?.filter(e => e.country === country);


    return (
        <div>
            <Helmet>
                <title>Trip Topia | Country Spots</title>
            </Helmet>
            <h1 className=" dark:text-white text-center text-3xl mb-10">{country}</h1>
            <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    countrySpots?.map((e, idx) => (
                        <div key={idx} className=" p-4 border rounded-md space-y-4 dark:text-white">
                            <div>
                                <h1 className=" text-black text-xl font-bold dark:text-white">{e.spot}</h1>
                                <p className="text-gray-600 text-sm dark:text-white">{e.location}, {e.country}</p>
                            </div>
                            <img className="rounded-md h-36 w-full object-cover object-center" src={e.image} alt="" />
                            <p className=" overflow-hidden h-24">{e.description}</p>
                            <p><span className="font-bold">Average Cost:</span> {e.cost}</p>
                            <p><span className="font-bold">Season:</span> {e.seasonality}</p>
                            <div>
                                <Link to={`/tourists-spots-details-page/${e._id}`}>
                                    <button className=" flex items-center gap-2 rounded-xl text-primary">View Details <LuArrowRightCircle size={18} /></button>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

    );
};

export default CountrySpots;