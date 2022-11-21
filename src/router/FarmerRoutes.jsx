import React from "react";
import { Route, Routes } from "react-router-native";
import ListFarmer from "../modules/farmer/screens/listFarmer/listFarmer";

const FarmerRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<ListFarmer />} />
    </Routes>
  );
};

export default FarmerRoutes;
