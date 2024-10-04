import React from "react";
import "./Add.css";
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import AddCategoryForm from "../../../components/AddCategoryForm/AddCategoryForm";

const Add = () => {
  return (
    <div className="add">
      <AddItemForm />
      <hr className="forms-separator" />
      <AddCategoryForm />
    </div>
  );
};

export default Add;
