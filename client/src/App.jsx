import './App.css'
import Navbar from "./components/Navbar";
import logo from "./assets/logo.jpg";
import GlowCircles from "./components/GlowCircles";
import { useState } from "react";
// import Navbaruser from "./components/Navbaruser";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgotpassword";
import CreatePost from "./pages/createpost";
import CreateFoundPost from "./pages/createfoundpost";
import SendClue from "./pages/sendclue";
import MyPosts from "./pages/myposts";
import ChatPage from "./pages/chat";
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";


function Home() {
  const lostItems = [
    {
      id: 2310,
      name: "กระเป๋าสตางค์",
      location: "ใต้ตึก",
      status: "กำลังตามหา",
      image: "/src/assets/it.jpg",
      type: "ของใช้",
      description: "กระเป๋าสตางค์สีดำ ภายในมีบัตรนักศึกษา",
      date: "2026-11-15"
    },
    {
      id: 2311,
      name: "โทรศัพท์",
      location: "โรงอาหาร",
      status: "กำลังตามหา",
      image: "/src/assets/it.jpg",
      type: "ของใช้",
      description: "กระเป๋าสตางค์สีดำ ภายในมีบัตรนักศึกษา",
      date: "2026-11-15"
    },
    {
      id: 2312,
      name: "กระเป๋าสะพาย",
      location: "ห้องสมุด",
      status: "กำลังตามหา",
      image: "/src/assets/it.jpg",
      type: "ของใช้",
      description: "กระเป๋าสตางค์สีดำ ภายในมีบัตรนักศึกษา",
      date: "2026-11-15"
    },
    {
      id: 2313,
      name: "กุญแจรถ",
      location: "หน้าคณะ",
      status: "กำลังตามหา",
      image: "/src/assets/it.jpg",
      type: "ของใช้",
      description: "กระเป๋าสตางค์สีดำ ภายในมีบัตรนักศึกษา",
      date: "2026-11-15"
    },
    {
      id: 2314,
      name: "กระเป๋าสะพาย",
      location: "ห้องสมุด",
      status: "กำลังตามหา",
      image: "/src/assets/it.jpg",
      type: "ของใช้",
      description: "กระเป๋าสตางค์สีดำ ภายในมีบัตรนักศึกษา",
      date: "2026-11-15"
    },
  ];

  const foundItems = [
    {
      id: 1210,
      name: "กระเป๋า",
      location: "ใต้ตึก",
      image: "/src/assets/it.jpg",
      type: "ของใช้",
      description: "กระเป๋าสตางค์สีดำ ภายในมีบัตรนักศึกษา",
      date: "2026-11-15"
    },
    {
      id: 1211,
      name: "โทรศัพท์",
      location: "โรงอาหาร",
      image: "/src/assets/it.jpg",
      type: "ของใช้",
      description: "กระเป๋าสตางค์สีดำ ภายในมีบัตรนักศึกษา",
      date: "2026-11-15"
    },
  ];

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("lost");
  const [selectedItem, setSelectedItem] = useState(null);
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <GlowCircles />
      <Navbar />
      <section className="App-homepage">

        <div className="home-content">
          <h1>เจอมั้ย.com</h1>

          <p>
            แพลตฟอร์มคอมมูนิตี้สำหรับการประกาศของหายและแจ้งพบของ
            โดยเปิดโอกาสให้ผู้ใช้งานช่วยกันติดตามสิ่งของที่สูญหาย
            และติดต่อส่งคืนให้เจ้าของได้อย่างสะดวกและรวดเร็ว
          </p>
          <div className="home-line"></div>

          <div className="button-home">
            <Link to="/createpost" className="create-post-link">
              สร้างประกาศ +
            </Link>

            <Link to="/createfoundpost" className="create-post-link">
              ประกาศตามหา +
            </Link>
          </div>

        </div>

        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
      </section>


      <section className="about" id="about">
        <GlowCircles variant="about" />
        <div className='right-side'>
          <div className='hook1'>
            เคยทำกระเป๋า โทรศัพท์ หรือกุญแจหายมั้ย?
          </div>
          <div className='hook1'>
            เคยกังวลเพราะไม่รู้จะไปตามหาที่ไหนหรือเปล่า?
          </div>
          <div className='hook1'>
            หรือเคยเก็บของได้ แต่ไม่รู้ว่าเจ้าของเป็นใคร?
          </div>
          <div className='hook1'>
            เราสร้างพื้นที่ที่ให้ทุกคนช่วยกันประกาศของหาย แจ้งพบของ และตามหาเจ้าของได้ง่ายขึ้น
          </div>
        </div>
      </section>


      {/* ประกาศของหายและแจ้งพบของ */}
      <section className="announcement" id="announcement">
        <div className="announcement-search">
          <input
            type="text"
            placeholder="ค้นหาสิ่งของที่หายหรือพบ..."
          />

          <button className="search-button">
            <span>⌕</span> ค้นหา
          </button>

          <select className="announcement-filter" defaultValue="all">
            <option value="all">ประเภท</option>
            <option value="bag">กระเป๋า</option>
          </select>


          <select className="status-filter" defaultValue="all">
            <option value="all">สถานะ</option>
            <option value="bag">ยังไม่พบ</option>
            <option value="bag">พบแล้ว</option>
          </select>

        </div>


        {/* ปุ่มเลือกประเภทประกาศ */}
        <div className="announcement-tabs">
          <button
            className={activeTab === "lost" ? "active" : ""}
            onClick={() => setActiveTab("lost")}
          >
            ของใครใครก็รัก
          </button>

          <button
            className={activeTab === "found" ? "active" : ""}
            onClick={() => setActiveTab("found")}
          >
            ของใครหล่นแถวนี้มั้ยจ๊ะ
          </button>
        </div>

        {/* พื้นที่แสดงประกาศ */}
        <div className="announcement-content">
          {activeTab === "lost" ? (
            <div className="lost-items">
              <div className="announcement-heading">
                <h2>ประกาศตามหาของที่หาย</h2>
                <span>{lostItems.length} รายการ</span>
              </div>
              {/* รายการประกาศตามหาของ */}
            </div>
          ) : (
            <div className="found-items">
              <div className="announcement-heading">
                <h2>ประกาศพบของ</h2>
                <span>{foundItems.length} รายการ</span>
              </div>
              {/* รายการประกาศพบของ */}
            </div>
          )}
        </div>

        {/* พื้นที่แสดงประกาศ */}
        <div className={`announcement-content ${activeTab}`}>

          {activeTab === "lost" ? (

            /* ประกาศตามหาของ: 3 กล่องเรียงแนวนอน */
            <div className="lost-items-grid">

              {lostItems.map((item) => (
                <div className="lost-card" key={item.id}>

                  <div className="card-header">
                    <span className="card-type">LOST</span>
                    <span className="card-status">
                      {item.status}
                    </span>
                  </div>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-image"
                  />

                  <div className="card-info">
                    <p>ID: {item.id}</p>
                    <h3>{item.name}</h3>
                    <p>หายที่ไหน: {item.location}</p>
                  </div>

                  <div className="card-footer">
                    <button onClick={() => setSelectedItem(item)}>
                      รายละเอียด
                    </button>
                  </div>

                </div>
              ))}

            </div>

          ) : (

            /* ประกาศพบของ: กล่องแนวยาวเรียงลงมา */
            <div className="found-items-list">

              {foundItems.map((item) => (
                <div className="found-card" key={item.id}>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="found-card-image"
                  />

                  <div className="found-card-info">

                    <span className="card-type">FOUND</span>

                    <p>ID: {item.id}</p>

                    <h3>{item.name}</h3>

                    <p>เจอที่ไหน: {item.location}</p>

                    <div className="found-card-footer">
                      <button onClick={() => setSelectedItem(item)}>
                        รายละเอียด
                      </button>
                    </div>

                  </div>

                </div>
              ))}

            </div>

          )}

        </div>


        {/* หน้าต่างรายละเอียดประกาศ */}
        {selectedItem && (
          <div className="detail-overlay">
            <div className="detail-modal">

              {/* ปุ่มปิด */}
              <button
                className="close-detail"
                onClick={() => setSelectedItem(null)}
              >
                ✕
              </button>

              <h2>รายละเอียดประกาศ</h2>

              {/* รูปภาพ */}
              <div className="detail-image">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                />
              </div>

              {/* ชื่อสิ่งของ */}
              <h3 className="detail-item-name">
                {selectedItem.name}
              </h3>

              {/* ข้อมูลประกาศ */}
              <div className="detail-info">

                <div className="detail-info-item">
                  <span>ID ประกาศ</span>
                  <p>{selectedItem.id}</p>
                </div>

                <div className="detail-info-item">
                  <span>ชื่อสิ่งของ</span>
                  <p>{selectedItem.name}</p>
                </div>

                <div className="detail-info-item">
                  <span>สถานที่</span>
                  <p>{selectedItem.location || "ไม่ได้ระบุ"}</p>
                </div>

                <div className="detail-info-item">
                  <span>ประเภท</span>
                  <p>{selectedItem.type || selectedItem.category || "ไม่ได้ระบุ"}</p>
                </div>

                <div className="detail-info-item">
                  <span>สถานะ</span>
                  <p>{selectedItem.status || "ไม่ได้ระบุ"}</p>
                </div>

                <div className="detail-info-item">
                  <span>รายละเอียด</span>
                  <p>{selectedItem.description || "ไม่ได้ระบุรายละเอียด"}</p>
                </div>

                <div className="detail-info-item">
                  <span>วันที่</span>
                  <p>{selectedItem.date || "ไม่ได้ระบุ"}</p>
                </div>

              </div>

              {/* ปุ่มด้านล่าง */}
              <div className="detail-actions">
                <button
                  className="detail-chat-button"
                  onClick={() => navigate("/chat")}
                >
                  Chat
                </button>

                <button
                  className="detail-clue-button"
                  onClick={() => navigate("/sendclue")}
                >
                  ส่งเบาะแส
                </button>
              </div>

            </div>
          </div>
        )}

      </section>

    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/createfoundpost" element={<CreateFoundPost />} />
        <Route path="/sendclue" element={<SendClue />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/chat" element={<ChatPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;