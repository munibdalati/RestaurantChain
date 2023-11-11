import React from "react";
import NavComponent from "../components/Shared/NavComponent";
import Footer from "../components/Shared/Footer";
import MaintenanceForm from "../components/MaintenancePage/MaintenanceForm";

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
        <MaintenanceForm />
      </div>
      <Footer />
    </div>
  );
}

export default PersonalInfo;
