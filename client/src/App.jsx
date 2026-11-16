import './App.css'
import Navbar from "./components/Navbar";
import logo from "./assets/logo.jpg";
import GlowCircles from "./components/GlowCircles";
import { useState, useEffect } from "react";
import Navbaruser from "./components/Navbaruser";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgotpassword";
import CreatePost from "./pages/createpost";
import CreateFoundPost from "./pages/createfoundpost";
import SendClue from "./pages/sendclue";
import MyPosts from "./pages/myposts";
import ChatPage from "./pages/chat";
import { api, imageUrl, isLoggedIn as hasToken, getUser } from "./services/api";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link, Navigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
  useLocation();

  const isLoggedIn = hasToken();
  const currentUser = getUser();

  const [activeTab, setActiveTab] = useState("lost");
  const [selectedItem, setSelectedItem] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const params = new URLSearchParams();
    if (appliedSearch) params.set("q", appliedSearch);
    if (category !== "all") params.set("category", category);
    if (statusFilter !== "all") params.set("status", statusFilter);
    api(`/posts?${params}`)
      .then((data) => {
        setPosts(data);
        setLoadError("");
      })
      .catch((err) => setLoadError(err.message));
  }, [appliedSearch, category, statusFilter]);

  const lostItems = posts.filter((p) => p.type === "lost");
  const foundItems = posts.filter((p) => p.type === "found");

  const statusLabel = (p) =>
    p.status === "closed"
      ? "เจอแล้ว"
      : p.type === "lost"
      ? "กำลังตามหา"
      : "กำลังหาเจ้าของ";

  const categoryLabels = {
    electronics: "อุปกรณ์อิเล็กทรอนิกส์",
    document: "เอกสาร",
    accessory: "เครื่องประดับ / ของใช้",
    other: "อื่น ๆ",
  };

  const openChat = async () => {
    if (!isLoggedIn) return navigate("/login");
    try {
      const { id } = await api("/chat/conversations", {
        method: "POST",
        body: { postId: selectedItem.id },
      });
      navigate("/chat", { state: { conversationId: id } });
    } catch (err) {
      alert(err.message);
    }
  };

  const openSendClue = () => {
    if (!isLoggedIn) return navigate("/login");
    navigate("/sendclue", { state: { post: selectedItem } });
  };

  const isOwnPost = (p) => !!currentUser && p.ownerId === currentUser.id;

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <GlowCircles />
      {isLoggedIn ? (
        <div className="navbar">
          <div className="green-logo">
            <h1>เจอมั้ย.com</h1>
          </div>
          <div>
            <Navbaruser />
          </div>
        </div>
      ) : (
        <Navbar />
      )}
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setAppliedSearch(search.trim())}
          />

          <button className="search-button" onClick={() => setAppliedSearch(search.trim())}>
            <span>⌕</span> ค้นหา
          </button>

          <select
            className="announcement-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">ประเภท</option>
            <option value="electronics">อุปกรณ์อิเล็กทรอนิกส์</option>
            <option value="document">เอกสาร</option>
            <option value="accessory">เครื่องประดับ / ของใช้</option>
            <option value="other">อื่น ๆ</option>
          </select>


          <select
            className="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">สถานะ</option>
            <option value="open">ยังไม่พบ</option>
            <option value="closed">พบแล้ว</option>
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
              {loadError && <p style={{ color: "#d33" }}>{loadError}</p>}
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
                      {statusLabel(item)}
                    </span>
                  </div>

                  <img
                    src={imageUrl(item.image)}
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
                    src={imageUrl(item.image)}
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
                  src={imageUrl(selectedItem.image)}
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
                  <p>{categoryLabels[selectedItem.category] || "ไม่ได้ระบุ"}</p>
                </div>

                <div className="detail-info-item">
                  <span>สถานะ</span>
                  <p>{statusLabel(selectedItem)}</p>
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
                {isOwnPost(selectedItem) ? (
                  <p>นี่คือประกาศของคุณ</p>
                ) : (
                  <>
                    <button className="detail-chat-button" onClick={openChat}>
                      Chat
                    </button>

                    <button className="detail-clue-button" onClick={openSendClue}>
                      ส่งเบาะแส
                    </button>
                  </>
                )}
              </div>

            </div>
          </div>
        )}

      </section>

    </>
  );
}

function RequireAuth({ children }) {
  return hasToken() ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/createpost" element={<RequireAuth><CreatePost /></RequireAuth>} />
        <Route path="/createfoundpost" element={<RequireAuth><CreateFoundPost /></RequireAuth>} />
        <Route path="/sendclue" element={<RequireAuth><SendClue /></RequireAuth>} />
        <Route path="/myposts" element={<RequireAuth><MyPosts /></RequireAuth>} />
        <Route path="/chat" element={<RequireAuth><ChatPage /></RequireAuth>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;