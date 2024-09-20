import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute, Login } from "./auth";
import { Main } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="*" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
