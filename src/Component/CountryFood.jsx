import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const CountryFood = ({ country, reverse, foodId }) => {
  const [food, setFood] = useState(null);

  useEffect(() => {
    fetch(`https://dine-flow-server-neon.vercel.app/foods/${foodId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Data for", country, data);
        if (data) {
          setFood(data);
        }
      })
      .catch((err) => console.error("Error fetching country food:", err));
  }, [foodId]);

  if (!food) {
    return <Loading />;
  }

  return (
    <Link
      to={`/foods/${food._id}`}
      className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center bg-gray-100 dark:bg-stone-300 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow`}
    >
      <div className="w-full md:w-1/2">
        <img
          src={food.foodImage}
          alt={food.foodName}
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="md:w-1/2 p-6">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{country}</h3>
        <p className="text-md md:text-lg text-gray-600 mt-4">
          Discover the taste of {country}! Featuring {food.foodName}, a
          traditional dish that has been loved for generations.
        </p>
        <p className="mt-4 text-blue-500 text-sm md:text-lg font-semibold">
          Starting from ${food.price}
        </p>
      </div>
    </Link>
  );
};

export default CountryFood;
