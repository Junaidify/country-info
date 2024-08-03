import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { CountryData } from "./components/CountryData";
// import Login from "./components/Login";
import { Welcome } from "./components/Welcome";
import { FavCountry } from "./components/FavCountry";
import Login from "./components/Login";

function App() {
  return (
    <>
      <nav className="nav">
        <Link to="/login">Login</Link>
        <Link to="/welcome">Welcome</Link>
        <Link to="/country">Country</Link>
        <Link to={"/favCountry"}>Fav-Country</Link>
      </nav>

      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/country" element={<CountryData />} />
        <Route path="/country/:name" element={<CountryData />} />
        <Route path="/login" element={<Login />} />
        <Route path="favCountry" element={<FavCountry />} />
      </Routes>
    </>
  );
}

export default App;
