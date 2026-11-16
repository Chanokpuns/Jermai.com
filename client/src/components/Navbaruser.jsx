
import { Link, useNavigate } from "react-router-dom";
import { clearAuth } from "../services/api";

function Navbaruser() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/", { state: { loggedOutAt: Date.now() } });
  };

  return (
    <>
      <style>{`
        .navbar-user {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 100%;
          padding: 0;
        }

        .green-logo {
          color: rgb(109, 231, 197);
          font-weight: 300;
          font-family: 'K2D', sans-serif;
          font-size: 15px;
        }

        .top-bar-user {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 0;
          font-size: 18px;
          font-family: 'K2D', sans-serif;
        }

        .top-bar-user a {
          color: rgb(86, 239, 219);
          text-decoration: none;
          font: inherit;
          cursor: pointer;
        }

        .top-bar-user button {
          background: transparent;
          border: none;
          padding: 0;
          color: rgb(86, 239, 219);
          font: inherit;
          cursor: pointer;
        }

        .top-bar-user a:hover,
        .top-bar-user button:hover {
          color: rgb(116, 252, 197);
        }
      `}</style>

      <nav className="navbar-user">
        <div className="top-bar-user">
          <Link to="/myposts">ประกาศของฉัน</Link>
          <button type="button" onClick={handleLogout}>Logout</button>
          <Link to="/chat">Chat</Link>
        </div>
      </nav>
    </>
  );
}

export default Navbaruser;
