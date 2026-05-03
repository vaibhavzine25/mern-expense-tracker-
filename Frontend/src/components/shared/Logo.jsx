import React from "react";
import { Link } from "react-router-dom";
import expenseLogo from "@/assets/expenselogo.png";

const Logo = () => {
  return (
    <Link to="/">
      <img src={expenseLogo} alt="logo" className="w-15"></img>
    </Link>
  );
};

export default Logo;
