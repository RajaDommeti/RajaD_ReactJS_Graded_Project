import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddExpenseForm = () => {
  const initialFormData = {
    date: "",
    product: "",
    price: 0,
    payee: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/expenses", formData);

      setFormData(initialFormData);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Add New Expense</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Product:</label>
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Payee:</label>
          <input
            type="text"
            name="payee"
            value={formData.payee}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
