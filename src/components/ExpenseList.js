import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/expenses");
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchData();
  }, []);

  const calculateTotals = () => {
    let totalSpent = 0;
    let personASpent = 0;
    let personBSpent = 0;

    expenses.forEach((expense) => {
      totalSpent += Number(expense.price);

      if (expense.payee === "Person A") {
        personASpent += Number(expense.price);
      } else {
        personBSpent += Number(expense.price);
      }
    });

    const balance = personASpent - personBSpent;

    return {
      totalSpent: Number(totalSpent.toFixed(2)),
      personASpent: Number(personASpent.toFixed(2)),
      personBSpent: Number(personBSpent.toFixed(2)),
      balance: Number(balance.toFixed(2)),
    };
  };
  const renderExpenseTable = () => {
    return (
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product Purchased</th>
              <th>Price</th>
              <th>Payee</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.product}</td>
                <td>{expense.price}</td>
                <td>{expense.payee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTotalsTable = () => {
    const { totalSpent, personASpent, personBSpent } = calculateTotals();

    return (
      <div className="table-responsive mt-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Total Spent</th>
              <th>Person A Paid</th>
              <th>Person B Paid</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{totalSpent}</td>
              <td>{personASpent}</td>
              <td>{personBSpent}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Expense Tracker</h1>
      <Link to="/add" className="btn btn-primary mb-3">
        Add New Expense
      </Link>
      {renderExpenseTable()}
      {renderTotalsTable()}
    </div>
  );
};

export default ExpenseList;
