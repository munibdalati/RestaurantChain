import React from "react";
import NavComponent from "../components/Shared/NavComponent";
import Footer from "../components/Shared/Footer";
import MenuForm from "../components/MenuPage/MenuForm";

function PersonalInfo() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const contentStyle = {
    flex: 1, 
  };

  return (
    <div style={containerStyle}>
      <NavComponent />
      <div style={contentStyle}>
        <MenuForm />
      </div>
      <Footer />
    </div>
  );
}

export default PersonalInfo;
