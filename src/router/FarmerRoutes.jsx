import React from "react";
import { Route, Routes } from "react-router-native";
import ListFarmer from "../modules/farmer/screens/listFarmer/listFarmer";
import RegisterFarmer from "../modules/farmer/screens/registerFarmer/registerFarmer";
import ViewFarmer from "../modules/farmer/screens/viewFarmer/viewFarmer";

const FarmerRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<ListFarmer />} />
      <Route path="viewFarmer" element={<ViewFarmer />} />
      <Route path="registerFarmer" element={<RegisterFarmer />} />
    </Routes>
  );
};

export default FarmerRoutes;
