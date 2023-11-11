import LandingPage from "./screens/LandingPage";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import BasicInformationPage from "./screens/BasicInformationPage";
import MenuPage from "./screens/MenuPage";
import MaintenancePage from "./screens/MaintenancePage";
import Confirmation from "./screens/Confirmation";


function App() {
  const pageStyle = {
    backgroundColor: "#f0f0f0",
  };
  return (
    <BrowserRouter style={pageStyle}>
      <Routes>
        <Route path="/" Component={LandingPage}></Route>
        <Route path="/BasicInformationPage" Component={BasicInformationPage}></Route>
        <Route path="/MenuPage" Component={MenuPage}></Route>
        <Route path="/MaintenancePage" Component={MaintenancePage}></Route>
        <Route path="/Confirmation" Component={Confirmation}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
