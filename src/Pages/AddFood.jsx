import React, { useState, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider'; // Adjust the import path as needed
import toast from 'react-hot-toast';

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    foodName: '',
    foodImage: '',
    foodCategory: '',
    quantity: '',
    price: '',
    buyerName: user?.displayName || 'Anonymous',
    buyerEmail: user?.email || 'No Email',
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
      const response = await fetch('http://localhost:5000/foods', {
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
          quantity: '',
          price: '',
          buyerName: user?.displayName || 'Anonymous',
          buyerEmail: user?.email || 'No Email',
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
    <div className="add-food-page p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Food Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <label className="block text-sm font-medium">Food Name</label>
            <input
              type="text"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Food Image URL</label>
            <input
              type="url"
              name="foodImage"
              value={formData.foodImage}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Food Category</label>
            <input
              type="text"
              name="foodCategory"
              value={formData.foodCategory}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Food Origin</label>
            <input
              type="text"
              name="foodOrigin"
              value={formData.foodOrigin}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Added By</label>
            <input
              type="text"
              name="username"
              value={user?.displayName || 'Guest'}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="text"
              name="username"
              value={user?.email || 'Guest'}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Ingredients</label>
          <textarea
            name="ingredients"
            value={formData.description.ingredients}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Making Procedure</label>
          <textarea
            name="makingProcedure"
            value={formData.description.makingProcedure}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddFood;
