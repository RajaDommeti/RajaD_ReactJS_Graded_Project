
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExpenseList from "./components/ExpenseList";
import AddExpenseForm from "./components/AddExpenseForm";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/expenses" element={<ExpenseList />} />
        <Route path="/add" element={<AddExpenseForm />} />
      </Routes>
    </Router>
  );
}

export default App;
