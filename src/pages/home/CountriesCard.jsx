import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import { Link } from "react-router-dom";


const CountriesCard = () => {
    const { dataCountry } = useContext(AuthContext);
    const [head] = useTypewriter({
        words: ['Southeast Asian Countries'],
        loop: true,
        onLoopDone: () => console.log(`loop completed`)
    })

    return (
        <div className=" border p-8 rounded">
            <div className='App text-center mb-6'>
                <span className="text-3xl font-semibold dark:text-white">{head}</span>
                <Cursor cursorColor='red' />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    dataCountry?.map((e, idx) => (
                        <Link to={`/country-spots/${e.country}`} key={idx}>
                            <div className=" shadow-lg rounded-lg overflow-hidden">
                                <img className="h-56 w-full object-cover object-center rounded-t-lg" src={e.image} alt="Country" />
                                <div className="p-4">
                                    <p className="text-xl font-semibold mb-2 text-primary">{e.country}</p>
                                    <p className="text-gray-700 dark:text-white h-24 overflow-hidden">{e.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default CountriesCard;