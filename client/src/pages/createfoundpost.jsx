
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Navbaruser from "../components/Navbaruser";
import "./createfoundpost.css";

function CreateFoundPost() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api("/posts", { method: "POST", body: new FormData(e.target) });
      navigate("/myposts");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-found-post-page">

      {/* Header */}
{/* Header */}
<header className="create-post-header">

  <div className="create-post-brand">
    <h1>เจอมั้ย.com</h1>

    <button
      className="back-button"
      onClick={() => navigate("/")}
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
        <form className="create-found-post-form" onSubmit={handleSubmit}>

          <h2>สร้างประกาศตามหาเจ้าของ</h2>

          {/* ชื่อสิ่งของ + ชนิด + สถานะ */}
          <div className="form-row name-row">
            <div className="form-group item-name">
              <label>ชื่อสิ่งของ</label>
              <input
                type="text"
                name="name"
                placeholder="กรอกชื่อสิ่งของ"
                required
              />
            </div>

            <div className="form-group">
              <label>ชนิด</label>
              <select name="category" required defaultValue="">
                <option value="" disabled>เลือกชนิด</option>
                <option value="electronics">อุปกรณ์อิเล็กทรอนิกส์</option>
                <option value="document">เอกสาร</option>
                <option value="accessory">เครื่องประดับ / ของใช้</option>
                <option value="other">อื่น ๆ</option>
              </select>
            </div>

            <div className="form-group">
              <label>สถานะ</label>
              <select name="type" required defaultValue="">
                <option value="" disabled>เลือกสถานะ</option>
                <option value="lost">สูญหาย</option>
                <option value="found">พบเจอ</option>
              </select>
            </div>
          </div>

          {/* สถานที่ */}
          <div className="form-group">
            <label>สถานที่</label>
            <input
              type="text"
              name="location"
              placeholder="กรอกสถานที่ที่ทำหายหรือพบเจอ"
              required
            />
          </div>

          {/* รายละเอียด */}
          <div className="form-group">
            <label>รายละเอียด</label>
            <textarea
              name="description"
              placeholder="กรอกรายละเอียดเพิ่มเติมเกี่ยวกับสิ่งของ..."
              rows="5"
            />
          </div>

          {/* วันที่ + รูปภาพ */}
          <div className="form-row bottom-row">
            <div className="form-group">
              <label>วันที่</label>
              <input type="date" name="date" required />
            </div>

            <div className="form-group image-group">
              <label>รูปภาพ</label>
              <input
                type="file"
                name="image"
                accept="image/*"
              />
            </div>
          </div>

          {error && <p style={{ color: "#d33" }}>{error}</p>}

          {/* Buttons */}
          <div className="form-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/")}
            >
              ยกเลิก
            </button>

            <button type="submit" className="confirm-button" disabled={loading}>
              {loading ? "กำลังบันทึก..." : "ยืนยัน"}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}

export default CreateFoundPost;
