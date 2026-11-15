
import GlowCircles from "../components/GlowCircles";
import logo from "../assets/logo.jpg";

function ForgotPassword() {
  return (
    <div className="login-page">
      <style>{`
        .login-page {
        min-height: 100vh;
        position: relative;
        isolation: isolate;
        overflow: hidden;
        background: white;
        font-family: 'K2D', sans-serif;
        color: white;
        padding: 30px 60px;
        box-sizing: border-box;
        }

        .login-brand {
        text-align: left;
        color: rgb(109, 231, 197);
        font-size: 16px;
        position: relative;
        z-index: 1;
        margin-left: 20px;
        }

        .login-content {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 100px;
          max-width: 1000px;
          margin: 55px auto;
        }

        .login-logo {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .login-logo img {
          width: 100%;
          max-width: 350px;
          height: auto;
          object-fit: contain;
        }

        .forgotpassword-form {
          flex: 1;
          max-width: 400px;
        }

        .forgotpassword-form h1 {
          font-size: 45px;
          margin-bottom: 5px;
          color: rgb(109, 231, 197);
        }

        .forgotpassword-form p {
          margin-bottom: 30px;
          color: #1e1f1f;
          font-size: 20px;
        }

        .forgotpassword-input {
          width: 100%;
          box-sizing: border-box;
          padding: 14px 16px;
          margin-bottom: 18px;
          border: 1px solid #b8d5d1;
          border-radius: 10px;
          outline: none;
          font-family: inherit;
          font-size: 15px;
        }

        .forgotpassword-input:focus {
          border-color: rgb(109, 231, 197);
        }

        .forgot-password {
          display: block;
          text-align: right;
          color: rgb(12, 13, 13);
          text-decoration: none;
          font-size: 15px;
          margin-top: -5px;
          margin-bottom: 25px;
        }

        .forgotpassword-button {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: rgb(109, 231, 197);
          color: #f6f9fc;
          font-family: inherit;
          font-size: 17px;
          font-weight: bold;
          cursor: pointer;
        }

        .login-glow-top,
        .login-glow-bottom {
          position: absolute;
          z-index: 0;
          pointer-events: none;
        }

        .login-glow-top {
          top: 0;
          left: 0;
        }

        .login-glow-bottom {
          right: 0;
          bottom: 0;
        }

        @media (max-width: 768px) {
          .login-page {
            padding: 25px 20px;
          }

          .login-content {
            flex-direction: column;
            gap: 30px;
            margin-top: 35px;
          }

          .login-logo img {
            max-width: 200px;
          }

          .login-form {
            width: 100%;
          }
        }
      `}</style>

      {/* Glow ด้านบน */}
        <GlowCircles variant="login-top" />

      {/* ชื่อเว็บไซต์ */}
      <div className="login-brand">
        <h1>เจอมั้ย.com</h1>
      </div>

      {/* เนื้อหาหลัก */}
      <div className="login-content">

        {/* ฝั่งซ้าย: Logo */}
        <div className="login-logo">
          <img src={logo} alt="เจอมั้ย.com Logo" />
        </div>

        {/* ฝั่งขวา: Login Form */}
        <div className="forgotpassword-form">
          <h1>Welcome</h1>
          <p>Don’t worry. We can help</p>

          <form onSubmit={(e) => e.preventDefault()}>       
              <input
              className="forgotpassword-input"
              type="email"
              placeholder="Please fill your email address"
              required
            />

            <button type="submit" className="forgotpassword-button">
              Send Reset Link
            </button>
          </form>

        </div>
      </div>

      {/* Glow มุมขวาล่าง */}
        <GlowCircles variant="login-bottom" />
    </div>
  );
}

export default ForgotPassword;
