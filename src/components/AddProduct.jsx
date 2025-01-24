import  { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    images: [],
    ownerId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      location: formData.location,
      images: formData.images.split(', ').map((image) => image.trim()),
      ownerId: formData.ownerId,
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/add-product",
        formData
      );
      alert("Product added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>
        <br />
        <div>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Images
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
            />
          </label>
          <br />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
