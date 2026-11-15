
import { Link } from "react-router-dom";

function Navbaruser() {
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

        .top-bar-user a:hover {
          color: rgb(116, 252, 197);
        }
      `}</style>

      <nav className="navbar-user">
        <div className="top-bar-user">
          <Link to="/myposts">ประกาศของฉัน</Link>
          <a href="#Login">Logout</a>
          <Link to="/chat">Chat</Link>
        </div>
      </nav>
    </>
  );
}

export default Navbaruser;
