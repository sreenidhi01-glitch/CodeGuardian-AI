import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ScannerPage from "./pages/ScannerPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/scan"
          element={<ScannerPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;