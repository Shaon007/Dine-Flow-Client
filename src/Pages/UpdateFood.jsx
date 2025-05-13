import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foodName: '',
    foodImage: '',
    foodCategory: '',
    quantity: '',
    price: '',
    foodOrigin: '',
    description: {
      ingredients: '',
      makingProcedure: '',
    },
  });

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await fetch(`https://dine-flow-server-neon.vercel.app/foods/${id}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        toast.error('Error fetching food details');
      }
    };

    fetchFoodDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ingredients' || name === 'makingProcedure') {
      setFormData((prevData) => ({
        ...prevData,
        description: {
          ...prevData.description,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://dine-flow-server-neon.vercel.app/updateFoods/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Food item updated successfully!');
        navigate('/allFoods');
      } else {
        toast.error('Failed to update food item');
      }
    } catch (error) {
      toast.error('Error occurred while updating the food');
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-stone-300 shadow-lg rounded-lg p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">Update Food Item</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold text-gray-700" htmlFor="foodName">Food Name</label>
            <input
              type="text"
              id="foodName"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              className="input input-bordered w-full bg-stone-100"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700" htmlFor="foodImage">Food Image URL</label>
            <input
              type="text"
              id="foodImage"
              name="foodImage"
              value={formData.foodImage}
              onChange={handleChange}
              className="input input-bordered w-full  bg-stone-100"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700" htmlFor="foodCategory">Food Category</label>
            <input
              type="text"
              id="foodCategory"
              name="foodCategory"
              value={formData.foodCategory}
              onChange={handleChange}
              className="input input-bordered w-full  bg-stone-100"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-gray-700" htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="input input-bordered w-full  bg-stone-100"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700" htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input input-bordered w-full  bg-stone-100"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700" htmlFor="foodOrigin">Food Origin</label>
            <input
              type="text"
              id="foodOrigin"
              name="foodOrigin"
              value={formData.foodOrigin}
              onChange={handleChange}
              className="input input-bordered w-full  bg-stone-100"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700" htmlFor="ingredients">Ingredients</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.description.ingredients}
              onChange={handleChange}
              className="textarea textarea-bordered w-full  bg-stone-100"
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-semibold" htmlFor="makingProcedure">Making Procedure</label>
            <textarea
              id="makingProcedure"
              name="makingProcedure"
              value={formData.description.makingProcedure}
              onChange={handleChange}
              className="textarea textarea-bordered w-full  bg-stone-100"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn bg-cyan-700 hover:bg-cyan-800 text-lg font-semibold text-gray-300 w-full">
            Update Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFood;