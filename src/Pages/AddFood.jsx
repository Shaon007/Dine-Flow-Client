import React, { useState, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider'; // Adjust the import path as needed
import toast from 'react-hot-toast';

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    foodName: '',
    foodImage: '',
    foodCategory: '',
    quantity: '',  // Make sure this field is included
    price: '',
    addedByName: user?.displayName || 'Anonymous',
    addedByEmail: user?.email || 'No Email',
    foodOrigin: '',
    description: {
      ingredients: '',
      makingProcedure: '',
    },
  });

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
      const response = await fetch('https://dine-flow-server-neon.vercel.app/foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Food item added successfully!');
        setFormData({
          foodName: '',
          foodImage: '',
          foodCategory: '',
          quantity: '',  // Reset quantity after adding
          price: '',
          addedByName: user?.displayName || 'Anonymous',
          addedByEmail: user?.email || 'No Email',
          foodOrigin: '',
          description: {
            ingredients: '',
            makingProcedure: '',
          },
        });
      } else {
        toast.error('Failed to add food item.');
      }
    } catch (error) {
      toast.error('Error occurred while adding the food.');
    }
  };

  return (
    <div className="py-10 p-8  mx-auto w-screen bg-stone-200 dark:bg-gray-900">
      <h1 className="text-3xl md:text-4xl font-bold py-12 text-center font-mono dark:text-gray-200">Add Food Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
        <div className='grid grid-cols-2 gap-5'>
          <div >
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Food Name</label>
            <input
              type="text"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              required
              className="input input-bordered bg-white w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200 text-gray-700">Food Image URL</label>
            <input
              type="url"
              name="foodImage"
              value={formData.foodImage}
              onChange={handleChange}
              required
              className="input input-bordered bg-white w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200 text-gray-700">Food Category</label>
            <input
              type="text"
              name="foodCategory"
              value={formData.foodCategory}
              onChange={handleChange}
              required
              className="input input-bordered bg-white w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200 text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="input input-bordered bg-white w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200 text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="input input-bordered bg-white w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200 text-gray-700">Food Origin</label>
            <input
              type="text"
              name="foodOrigin"
              value={formData.foodOrigin}
              onChange={handleChange}
              required
              className="input input-bordered bg-white w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200 text-gray-700">Added By</label>
            <input
              type="text"
              name="addedByName"
              value={user?.displayName || 'Guest'}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200 text-gray-700">Email</label>
            <input
              type="text"
              name="addedByEmail"
              value={user?.email || 'Guest'}
              readOnly
              className="input text-gray-500 input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200 text-gray-700">Ingredients</label>
          <textarea
            name="ingredients"
            value={formData.description.ingredients}
            onChange={handleChange}
            required
            className="textarea textarea-bordered bg-white w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200 text-gray-700">Making Procedure</label>
          <textarea
            name="makingProcedure"
            value={formData.description.makingProcedure}
            onChange={handleChange}
            required
            className="textarea textarea-bordered bg-white w-full"
          />
        </div>
        <button type="submit" className="btn bg-cyan-600 w-full text-white hover:bg-cyan-700">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddFood;