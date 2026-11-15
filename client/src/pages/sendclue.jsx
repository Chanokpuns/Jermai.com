
import { useNavigate } from "react-router-dom";
import Navbaruser from "../components/Navbaruser";
import "./sendclue.css";

function SendClue() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ตอนนี้ยังไม่ได้เชื่อมต่อ Backend
    // ไว้เพิ่มการบันทึกเบาะแสในขั้นตอนถัดไป
  };

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

          {/* สถานที่ */}
          <div className="form-group">
            <label>สถานที่</label>
            <input
              type="text"
              placeholder="กรอกสถานที่ที่พบเห็น"
              required
            />
          </div>

          {/* รายละเอียด */}
          <div className="form-group">
            <label>รายละเอียดเบาะแส</label>
            <textarea
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
                type="date"
                required
              />
            </div>
          </div>

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
