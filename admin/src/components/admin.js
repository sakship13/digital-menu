import React from 'react'
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import Add from './Add';
import List from "./List";
import AddCategory from './AddCategory';
import ListCategories from './ListCategories';
import AddEvents from './AddEvents';
import Order from "./Order";
function admin() {
  return (
    <div>
    <Navbar />
    <hr />
    <div className="app-content">
      <Sidebar />
      <Routes>
        <Route path="add" element={<Add />} />
        <Route path="list" element={<List />} />
        <Route path="orders" element={<Order />} />
        <Route path="addcategory" element={<AddCategory/>} />
        <Route path="categories" element={<ListCategories/>} />
        <Route path="addevent" element={<AddEvents/>} />
      </Routes>
    </div>
  </div>
  )
}

export default admin
