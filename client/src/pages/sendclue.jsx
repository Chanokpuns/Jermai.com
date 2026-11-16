
import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { api } from "../services/api";
import Navbaruser from "../components/Navbaruser";
import "./sendclue.css";

function SendClue() {
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state?.post;
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const f = new FormData(e.target);
      await api(`/posts/${post.id}/clues`, {
        method: "POST",
        body: {
          location: f.get("location"),
          description: f.get("description"),
          date: f.get("date"),
        },
      });
      setDone(true);
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!post) return <Navigate to="/" replace />;

  return (
    <div className="create-found-post-page">

      {/* Header */}
      <header className="create-post-header">

        <div className="create-post-brand">
          <h1>เจอมั้ย.com</h1>

          <button
            className="back-button"
            onClick={() => navigate(-1)}
          >
            ← กลับ
          </button>
        </div>

        <div className="create-post-navbar">
          <Navbaruser />
        </div>

      </header>

      {/* Form */}
      <main className="create-post-main">

        <form
          className="create-found-post-form"
          onSubmit={handleSubmit}
        >

          <h2>ส่งเบาะแส</h2>
          <p>ประกาศ #{post.id}: {post.name}</p>

          {/* สถานที่ */}
          <div className="form-group">
            <label>สถานที่</label>
            <input
              type="text"
              name="location"
              placeholder="กรอกสถานที่ที่พบเห็น"
              required
            />
          </div>

          {/* รายละเอียด */}
          <div className="form-group">
            <label>รายละเอียดเบาะแส</label>
            <textarea
              name="description"
              placeholder="กรอกรายละเอียดหรือข้อมูลเพิ่มเติมเกี่ยวกับเบาะแส..."
              rows="5"
              required
            />
          </div>

          {/* วันที่ */}
          <div className="form-row bottom-row">
            <div className="form-group">
              <label>วันที่พบเห็น</label>
              <input
                name="date"
                type="date"
                required
              />
            </div>
          </div>

          {error && <p style={{ color: "#d33" }}>{error}</p>}
          {done && <p style={{ color: "#2a9d6f" }}>ส่งเบาะแสเรียบร้อยแล้ว</p>}

          {/* Buttons */}
          <div className="form-buttons">

            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate(-1)}
            >
              ยกเลิก
            </button>

            <button
              type="submit"
              className="confirm-button"
            >
              ยืนยัน
            </button>

          </div>

        </form>

      </main>
    </div>
  );
}

export default SendClue;
