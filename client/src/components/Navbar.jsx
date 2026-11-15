import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
        <div className="green-logo">
            <h1>เจอมั้ย.com</h1>
        </div>

        <div className="top-bar">
            <a href="#about">About</a>
            <Link to="/login">Login</Link>
            <Link to="/chat">Chat</Link>
        </div>
    </nav>
  );
}

export default Navbar;