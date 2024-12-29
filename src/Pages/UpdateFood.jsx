import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const UpdateFood = () => {
  const { foodId } = useParams();
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
        const response = await fetch(`http://localhost:5000/foods/${foodId}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        toast.error('Error fetching food details');
      }
    };

    fetchFoodDetails();
  }, [foodId]);

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
      const response = await fetch(`http://localhost:5000/foods/${foodId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Food item updated successfully!');
        navigate('/foods'); // Navigate to another page after updating
      } else {
        toast.error('Failed to update food item');
      }
    } catch (error) {
      toast.error('Error occurred while updating the food');
    }
  };

  return (
    <div className="update-food-page p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Food Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="foodName">Food Name</label>
          <input
            type="text"
            id="foodName"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="foodImage">Food Image URL</label>
          <input
            type="text"
            id="foodImage"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="foodCategory">Food Category</label>
          <input
            type="text"
            id="foodCategory"
            name="foodCategory"
            value={formData.foodCategory}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="foodOrigin">Food Origin</label>
          <input
            type="text"
            id="foodOrigin"
            name="foodOrigin"
            value={formData.foodOrigin}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.description.ingredients}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="makingProcedure">Making Procedure</label>
          <textarea
            id="makingProcedure"
            name="makingProcedure"
            value={formData.description.makingProcedure}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Item
        </button>
      </form>
    </div>
  );
};

export default UpdateFood;
