
import { useNavigate } from "react-router-dom";
import Navbaruser from "../components/Navbaruser";
import "./createfoundpost.css";

function CreateFoundPost() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ตอนนี้ยังไม่ได้เชื่อมต่อ Backend
    // ไว้เพิ่มการบันทึกประกาศในขั้นตอนถัดไป
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
                placeholder="กรอกชื่อสิ่งของ"
                required
              />
            </div>

            <div className="form-group">
              <label>ชนิด</label>
              <select required defaultValue="">
                <option value="" disabled>เลือกชนิด</option>
                <option value="electronics">อุปกรณ์อิเล็กทรอนิกส์</option>
                <option value="document">เอกสาร</option>
                <option value="accessory">เครื่องประดับ / ของใช้</option>
                <option value="other">อื่น ๆ</option>
              </select>
            </div>

            <div className="form-group">
              <label>สถานะ</label>
              <select required defaultValue="">
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
              placeholder="กรอกสถานที่ที่ทำหายหรือพบเจอ"
              required
            />
          </div>

          {/* รายละเอียด */}
          <div className="form-group">
            <label>รายละเอียด</label>
            <textarea
              placeholder="กรอกรายละเอียดเพิ่มเติมเกี่ยวกับสิ่งของ..."
              rows="5"
            />
          </div>

          {/* วันที่ + รูปภาพ */}
          <div className="form-row bottom-row">
            <div className="form-group">
              <label>วันที่</label>
              <input type="date" required />
            </div>

            <div className="form-group image-group">
              <label>รูปภาพ</label>
              <input
                type="file"
                accept="image/*"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="form-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/")}
            >
              ยกเลิก
            </button>

            <button type="submit" className="confirm-button">
              ยืนยัน
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}

export default CreateFoundPost;
